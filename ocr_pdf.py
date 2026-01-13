import fitz
import pytesseract
from PIL import Image
import io
import os

# Set Tesseract path (standard location on Windows)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

PDF_PATH = "DRIVEL.pdf"
OUTPUT_FILE = "pdf_extracted_content.txt"

def extract_content():
    if not os.path.exists(PDF_PATH):
        print(f"Error: {PDF_PATH} not found.")
        return

    doc = fitz.open(PDF_PATH)
    print(f"Opened PDF with {len(doc)} pages.")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        # Process all pages
        for i in range(len(doc)):
            page = doc[i]
            print(f"Processing Page {i+1}/{len(doc)}...")
            
            # Try getting text directly first
            text = page.get_text()
            if text.strip():
                f.write(f"--- Page {i+1} (Text) ---\n")
                f.write(text)
                f.write("\n\n")
            
            # Get images and OCR them
            images = page.get_images()
            for img_index, img in enumerate(images):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                
                try:
                    image = Image.open(io.BytesIO(image_bytes))
                    ocr_text = pytesseract.image_to_string(image, lang='eng+ell') # Try English and Greek
                    
                    if ocr_text.strip():
                        f.write(f"--- Page {i+1} Image {img_index+1} (OCR) ---\n")
                        f.write(ocr_text)
                        f.write("\n\n")
                except Exception as e:
                    print(f"Error OCRing image on page {i+1}: {e}")

    print(f"Extraction complete. Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    extract_content()
