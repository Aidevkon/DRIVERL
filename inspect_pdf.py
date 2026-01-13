import fitz

doc = fitz.open("DRIVEL.pdf")
print(f"Total Pages: {len(doc)}")

for i in range(min(3, len(doc))):
    page = doc[i]
    text = page.get_text()
    images = page.get_images()
    print(f"--- Page {i+1} ---")
    print(f"Text Length: {len(text)}")
    print(f"Images: {len(images)}")
    if len(text) > 0:
        print(f"Text Snippet: {text[:200]}")
