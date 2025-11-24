from PyPDF2 import PdfReader, PdfWriter
import os

def merge_pdfs(pdf_paths: list, output_path: str):
    """
    Merge multiple PDF files into one
    pdf_paths: list of PDF file paths in desired order
    output_path: path for the merged PDF file
    """
    try:
        print(f"\n{'='*50}")
        print(f"MERGING {len(pdf_paths)} PDF FILES")
        print(f"{'='*50}")
        
        writer = PdfWriter()
        total_pages = 0
        
        # Process each PDF file
        for idx, pdf_path in enumerate(pdf_paths, 1):
            print(f"\nProcessing file {idx}: {os.path.basename(pdf_path)}")
            
            try:
                reader = PdfReader(pdf_path)
                page_count = len(reader.pages)
                print(f"  ✓ Pages: {page_count}")
                
                # Add all pages from this PDF
                for page_num in range(page_count):
                    writer.add_page(reader.pages[page_num])
                    total_pages += 1
                
                print(f"  ✓ Added {page_count} pages to merged PDF")
                
            except Exception as e:
                raise Exception(f"Error reading {os.path.basename(pdf_path)}: {str(e)}")
        
        # Write the merged PDF
        print(f"\nWriting merged PDF to: {output_path}")
        with open(output_path, 'wb') as output_file:
            writer.write(output_file)
        
        # Verify file was created
        if os.path.exists(output_path):
            file_size = os.path.getsize(output_path)
            print(f"\n{'='*50}")
            print(f"✓ MERGE SUCCESSFUL!")
            print(f"✓ Total pages: {total_pages}")
            print(f"✓ Output size: {file_size:,} bytes")
            print(f"{'='*50}\n")
        else:
            raise Exception("Merged PDF was not created")
        
        return output_path
        
    except Exception as e:
        print(f"\n❌ MERGE FAILED: {str(e)}\n")
        raise Exception(f"Failed to merge PDFs: {str(e)}")