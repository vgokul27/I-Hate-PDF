from docx2pdf import convert
import os

def convert_word_to_pdf(docx_path: str, output_path: str):
    """
    Convert Word document to PDF with exact formatting preservation
    Uses Microsoft Word COM automation for perfect conversion
    """
    try:
        # Convert using docx2pdf (uses MS Word)
        convert(docx_path, output_path)
        
        # Verify the file was created
        if os.path.exists(output_path):
            print(f"Word document converted to PDF successfully with exact formatting")
        else:
            raise Exception("PDF file was not created")
            
    except Exception as e:
        print(f"Error details: {str(e)}")
        raise Exception(f"Word to PDF conversion failed: {str(e)}")