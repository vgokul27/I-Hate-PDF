from pdf2docx import Converter
from docx import Document
import PyPDF2

def convert_pdf_to_word(pdf_path: str, output_path: str):
    """
    Convert PDF to Word document
    """
    try:
        # Method 1: Using pdf2docx (preserves formatting better)
        cv = Converter(pdf_path)
        cv.convert(output_path, start=0, end=None)
        cv.close()
        
        print(f"PDF converted to Word successfully using pdf2docx")
        
    except Exception as e:
        print(f"pdf2docx conversion failed: {str(e)}")
        print("Falling back to text extraction method...")
        
        # Fallback Method: Extract text and create Word document
        try:
            # Extract text from PDF
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text()
            
            # Create Word document
            doc = Document()
            
            # Add extracted text
            paragraphs = text.split('\n\n')
            for paragraph in paragraphs:
                if paragraph.strip():
                    doc.add_paragraph(paragraph.strip())
            
            doc.save(output_path)
            print(f"PDF converted to Word successfully using text extraction")
            
        except Exception as fallback_error:
            raise Exception(f"Both conversion methods failed: {str(fallback_error)}")