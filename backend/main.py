from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from pathlib import Path
import time
from contextlib import asynccontextmanager
from typing import List

# Import conversion modules
from converters.pdf_to_word import convert_pdf_to_word
from converters.word_to_pdf import convert_word_to_pdf
from converters.split_pdf import split_pdf_range, split_pdf_custom, parse_page_string
from converters.merge_pdf import merge_pdfs

# Create directories
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("output")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# Cleanup old files (older than 1 hour)
def cleanup_old_files():
    current_time = time.time()
    for directory in [UPLOAD_DIR, OUTPUT_DIR]:
        for file_path in directory.glob("*"):
            if file_path.is_file():
                file_age = current_time - file_path.stat().st_mtime
                if file_age > 3600:  # 1 hour
                    file_path.unlink()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    cleanup_old_files()
    yield
    # Shutdown (if needed)

app = FastAPI(title="I Hate PDF API", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "I Hate PDF API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "OK", "message": "Server is running"}

@app.post("/api/pdf-to-word")
async def pdf_to_word(pdf: UploadFile = File(...)):
    """Convert PDF to Word document"""
    try:
        # Validate file type
        if not pdf.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Save uploaded file
        timestamp = int(time.time() * 1000)
        upload_path = UPLOAD_DIR / f"{timestamp}_{pdf.filename}"
        
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)
        
        print(f"PDF received: {pdf.filename}")
        
        # Convert PDF to Word
        output_filename = f"converted_{timestamp}.docx"
        output_path = OUTPUT_DIR / output_filename
        
        convert_pdf_to_word(str(upload_path), str(output_path))
        
        print(f"Conversion successful: {output_filename}")
        
        # Cleanup uploaded file
        upload_path.unlink()
        
        # Return the file
        return FileResponse(
            path=output_path,
            filename=output_filename,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            background=lambda: output_path.unlink() if output_path.exists() else None
        )
        
    except Exception as e:
        print(f"Error during PDF to Word conversion: {str(e)}")
        # Cleanup on error
        if upload_path.exists():
            upload_path.unlink()
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/api/word-to-pdf")
async def word_to_pdf(word: UploadFile = File(...)):
    """Convert Word document to PDF"""
    try:
        # Validate file type
        if not (word.filename.endswith('.docx') or word.filename.endswith('.doc')):
            raise HTTPException(status_code=400, detail="Only Word files (.doc, .docx) are allowed")
        
        # Save uploaded file
        timestamp = int(time.time() * 1000)
        upload_path = UPLOAD_DIR / f"{timestamp}_{word.filename}"
        
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(word.file, buffer)
        
        print(f"Word file received: {word.filename}")
        
        # Convert Word to PDF
        output_filename = f"converted_{timestamp}.pdf"
        output_path = OUTPUT_DIR / output_filename
        
        convert_word_to_pdf(str(upload_path), str(output_path))
        
        print(f"Conversion successful: {output_filename}")
        
        # Cleanup uploaded file
        upload_path.unlink()
        
        # Return the file
        return FileResponse(
            path=output_path,
            filename=output_filename,
            media_type="application/pdf",
            background=lambda: output_path.unlink() if output_path.exists() else None
        )
        
    except Exception as e:
        print(f"Error during Word to PDF conversion: {str(e)}")
        # Cleanup on error
        if upload_path.exists():
            upload_path.unlink()
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/api/split-pdf")
async def split_pdf_endpoint(
    pdf: UploadFile = File(...),
    split_mode: str = Form(...),
    start_page: int = Form(None),
    end_page: int = Form(None),
    custom_pages: str = Form(None)
):
    """Split PDF based on mode"""
    upload_path = None
    output_path = None
    
    try:
        print("\n" + "="*50)
        print("SPLIT PDF REQUEST RECEIVED")
        print("="*50)
        
        # Validate file type
        if not pdf.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Save uploaded file
        timestamp = int(time.time() * 1000)
        upload_path = UPLOAD_DIR / f"{timestamp}_{pdf.filename}"
        
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)
        
        print(f"✓ PDF File: {pdf.filename}")
        print(f"✓ Saved to: {upload_path}")
        print(f"✓ Split Mode: {split_mode}")
        print(f"✓ Start Page: {start_page} (type: {type(start_page)})")
        print(f"✓ End Page: {end_page} (type: {type(end_page)})")
        print(f"✓ Custom Pages: '{custom_pages}' (type: {type(custom_pages)})")
        
        # Get PDF info
        from PyPDF2 import PdfReader
        reader = PdfReader(str(upload_path))
        total_pages = len(reader.pages)
        print(f"✓ Total Pages in PDF: {total_pages}")
        
        # Output file
        output_filename = f"split_{timestamp}.pdf"
        output_path = OUTPUT_DIR / output_filename
        
        print("\nProcessing split...")
        
        # Split based on mode
        if split_mode == "range":
            # Convert start_page to int if it's a string
            if isinstance(start_page, str):
                start_page = int(start_page)
            elif start_page is None:
                start_page = 1
            
            # If end_page not provided or empty, use total pages
            if end_page is None or end_page == "" or str(end_page).lower() == "null":
                end_page = total_pages
                print(f"No end page specified, using total pages: {end_page}")
            elif isinstance(end_page, str):
                end_page = int(end_page)
            
            print(f"\n🔪 SPLITTING RANGE: Pages {start_page} to {end_page}")
            
            # Validate range
            if start_page < 1:
                start_page = 1
            if end_page > total_pages:
                end_page = total_pages
            if start_page > end_page:
                raise ValueError(f"Start page ({start_page}) cannot be greater than end page ({end_page})")
            
            print(f"Validated range: {start_page} to {end_page}")
            
            split_pdf_range(str(upload_path), str(output_path), start_page, end_page)
            
        elif split_mode == "custom":
            if not custom_pages or custom_pages.strip() == "":
                raise ValueError("Custom pages string is empty")
            
            print(f"\n🔪 SPLITTING CUSTOM: '{custom_pages}'")
            
            # Parse custom page string
            page_numbers = parse_page_string(custom_pages)
            print(f"Parsed pages: {page_numbers}")
            
            split_pdf_custom(str(upload_path), str(output_path), page_numbers)
        
        else:
            raise HTTPException(status_code=400, detail=f"Invalid split mode: {split_mode}")
        
        # Verify output file was created
        if not output_path.exists():
            raise Exception("Output PDF was not created")
        
        output_size = output_path.stat().st_size
        print(f"\n✓ Split successful!")
        print(f"✓ Output file: {output_filename}")
        print(f"✓ Output size: {output_size} bytes")
        print("="*50 + "\n")
        
        # Cleanup uploaded file
        if upload_path and upload_path.exists():
            upload_path.unlink()
        
        # Return the file and schedule cleanup
        def cleanup():
            try:
                if output_path and output_path.exists():
                    output_path.unlink()
            except:
                pass
        
        return FileResponse(
            path=str(output_path),
            filename=output_filename,
            media_type="application/pdf",
            background=cleanup
        )
        
    except ValueError as ve:
        print(f"\n❌ VALIDATION ERROR: {str(ve)}\n")
        if upload_path and upload_path.exists():
            upload_path.unlink()
        raise HTTPException(status_code=400, detail=str(ve))
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        print("="*50 + "\n")
        if upload_path and upload_path.exists():
            upload_path.unlink()
        raise HTTPException(status_code=500, detail=f"Split failed: {str(e)}")

@app.post("/api/merge-pdf")
async def merge_pdf_endpoint(
    files: List[UploadFile] = File(...)
):
    """Merge multiple PDF files into one"""
    uploaded_paths = []
    output_path = None
    
    try:
        print("\n" + "="*50)
        print("MERGE PDF REQUEST RECEIVED")
        print("="*50)
        
        # Validate number of files
        if len(files) < 2:
            raise HTTPException(status_code=400, detail="Please upload at least 2 PDF files")
        
        if len(files) > 10:
            raise HTTPException(status_code=400, detail="Maximum 10 PDF files allowed")
        
        print(f"✓ Number of files: {len(files)}")
        
        # Validate and save all uploaded files
        timestamp = int(time.time() * 1000)
        
        for idx, file in enumerate(files, 1):
            # Validate file type
            if not file.filename.endswith('.pdf'):
                raise HTTPException(
                    status_code=400, 
                    detail=f"File '{file.filename}' is not a PDF"
                )
            
            # Save uploaded file
            upload_path = UPLOAD_DIR / f"{timestamp}_{idx}_{file.filename}"
            
            with open(upload_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            uploaded_paths.append(upload_path)
            print(f"✓ Saved file {idx}: {file.filename}")
        
        # Create output filename
        output_filename = f"merged_{timestamp}.pdf"
        output_path = OUTPUT_DIR / output_filename
        
        # Merge PDFs
        merge_pdfs([str(path) for path in uploaded_paths], str(output_path))
        
        # Verify output file was created
        if not output_path.exists():
            raise Exception("Merged PDF was not created")
        
        output_size = output_path.stat().st_size
        print(f"\n✓ Merge complete!")
        print(f"✓ Output file: {output_filename}")
        print(f"✓ Output size: {output_size:,} bytes")
        print("="*50 + "\n")
        
        # Cleanup uploaded files
        for upload_path in uploaded_paths:
            if upload_path.exists():
                upload_path.unlink()
        
        # Return the merged file
        def cleanup():
            try:
                if output_path and output_path.exists():
                    output_path.unlink()
            except:
                pass
        
        return FileResponse(
            path=str(output_path),
            filename=output_filename,
            media_type="application/pdf",
            background=cleanup
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        # Cleanup uploaded files
        for upload_path in uploaded_paths:
            if upload_path.exists():
                upload_path.unlink()
        raise
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        print("="*50 + "\n")
        
        # Cleanup uploaded files
        for upload_path in uploaded_paths:
            if upload_path.exists():
                upload_path.unlink()
        
        raise HTTPException(status_code=500, detail=f"Merge failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)