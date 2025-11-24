from PyPDF2 import PdfReader, PdfWriter
import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
import shutil
import time
from typing import Optional

app = FastAPI()

UPLOAD_DIR = "uploads"  # Define your upload directory
OUTPUT_DIR = "outputs"  # Define your output directory

def split_pdf_all_pages(pdf_path: str, output_dir: str):
    """
    Split PDF into individual pages
    Returns list of output file paths
    """
    try:
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        output_files = []
        
        for page_num in range(total_pages):
            writer = PdfWriter()
            writer.add_page(reader.pages[page_num])
            
            output_filename = f"page_{page_num + 1}.pdf"
            output_path = os.path.join(output_dir, output_filename)
            
            with open(output_path, 'wb') as output_file:
                writer.write(output_file)
            
            output_files.append(output_path)
        
        print(f"Successfully split PDF into {total_pages} pages")
        return output_files
        
    except Exception as e:
        raise Exception(f"Failed to split PDF: {str(e)}")


def split_pdf_range(pdf_path: str, output_path: str, start_page: int, end_page: int):
    """
    Extract a range of pages from PDF using PyPDF2
    Page numbers are 1-indexed (start_page=1 means first page)
    """
    try:
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        
        print(f"PDF has {total_pages} pages. Extracting pages {start_page} to {end_page}")
        
        # Validate page range
        if start_page < 1 or end_page > total_pages or start_page > end_page:
            raise ValueError(f"Invalid page range. PDF has {total_pages} pages. Requested: {start_page}-{end_page}")
        
        writer = PdfWriter()
        
        # Add pages (convert to 0-indexed for PyPDF2)
        for page_num in range(start_page - 1, end_page):
            writer.add_page(reader.pages[page_num])
            print(f"Added page {page_num + 1}")
        
        # Save the output PDF
        with open(output_path, 'wb') as output_file:
            writer.write(output_file)
        
        pages_extracted = end_page - start_page + 1
        print(f"Successfully extracted pages {start_page}-{end_page} ({pages_extracted} pages)")
        return output_path
        
    except Exception as e:
        print(f"Error in split_pdf_range: {str(e)}")
        raise Exception(f"Failed to extract page range: {str(e)}")


def split_pdf_custom(pdf_path: str, output_path: str, page_numbers: list):
    """
    Extract specific pages from PDF using PyPDF2
    page_numbers: list of page numbers (1-indexed)
    Example: [1, 3, 5, 7] extracts pages 1, 3, 5, and 7
    """
    try:
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        
        print(f"PDF has {total_pages} pages. Extracting pages: {page_numbers}")
        
        # Validate page numbers
        for page_num in page_numbers:
            if page_num < 1 or page_num > total_pages:
                raise ValueError(f"Invalid page number {page_num}. PDF has {total_pages} pages.")
        
        writer = PdfWriter()
        
        # Add specified pages (convert to 0-indexed)
        for page_num in sorted(set(page_numbers)):  # Remove duplicates and sort
            writer.add_page(reader.pages[page_num - 1])
            print(f"Added page {page_num}")
        
        # Save the output PDF
        with open(output_path, 'wb') as output_file:
            writer.write(output_file)
        
        unique_pages = len(set(page_numbers))
        print(f"Successfully extracted {unique_pages} unique pages")
        return output_path
        
    except Exception as e:
        print(f"Error in split_pdf_custom: {str(e)}")
        raise Exception(f"Failed to extract custom pages: {str(e)}")


def parse_page_string(page_string: str):
    """
    Parse page string like "1,3,5-7,10" into list of page numbers
    Returns: [1, 3, 5, 6, 7, 10]
    """
    try:
        page_numbers = []
        
        # Remove all whitespace
        page_string = page_string.replace(" ", "")
        
        # Split by comma
        parts = page_string.split(",")
        
        for part in parts:
            if "-" in part:
                # Handle range (e.g., "5-7")
                range_parts = part.split("-")
                if len(range_parts) == 2:
                    start = int(range_parts[0])
                    end = int(range_parts[1])
                    page_numbers.extend(range(start, end + 1))
            else:
                # Handle single page
                page_numbers.append(int(part))
        
        print(f"Parsed '{page_string}' into pages: {page_numbers}")
        return page_numbers
        
    except Exception as e:
        raise ValueError(f"Invalid page string format: {page_string}. Use format like '1,3,5-7,10'")


@app.post("/api/split-pdf")
async def split_pdf(
    pdf: UploadFile = File(...),
    split_mode: str = Form(...),
    start_page: Optional[int] = Form(None),
    end_page: Optional[int] = Form(None),
    custom_pages: Optional[str] = Form(None)
):
    """Split PDF based on mode"""
    upload_path = None
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
            
            # If end_page not provided or empty, use total pages
            if end_page is None or end_page == "" or end_page == "null":
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
        upload_path.unlink()
        
        # Return the file
        return FileResponse(
            path=output_path,
            filename=output_filename,
            media_type="application/pdf",
            background=lambda: output_path.unlink() if output_path.exists() else None
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