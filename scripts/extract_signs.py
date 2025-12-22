#!/usr/bin/env python3

"""extract_signs.py
Extract traffic‑sign images from DRIVEL.pdf using PyMuPDF (fitz).

Steps:
1. Open the PDF.
2. Iterate over each page and extract all images.
3. Save each image as PNG into `src/assets/signs/` with a deterministic name
   `sign_<page>_<index>.png`.
4. Build a JSON map that links lesson IDs (taken from `src/data/lessons.ts`) to the
   corresponding image filename.  The mapping is written to `src/data/signsMap.json`.

Usage:
    python scripts/extract_signs.py

Make sure `pip install pymupdf` is available.
"""

import os
import json
import fitz  # PyMuPDF

# Paths (relative to project root)
PDF_PATH = "DRIVEL.pdf"
ASSETS_DIR = os.path.join("src", "assets", "signs")
MAP_PATH = os.path.join("src", "data", "signsMap.json")
LESSONS_PATH = os.path.join("src", "data", "lessons.ts")

# Ensure assets directory exists
os.makedirs(ASSETS_DIR, exist_ok=True)

# Load lesson IDs from the TypeScript file (very simple regex)
lesson_ids = []
with open(LESSONS_PATH, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("id:"):
            # line looks like: id: 'signs-1',
            parts = line.split("'")
            if len(parts) >= 2:
                lesson_ids.append(parts[1])

# Open PDF
pdf_doc = fitz.open(PDF_PATH)

signs_map = {}
image_counter = 0

for page_number in range(len(pdf_doc)):
    page = pdf_doc[page_number]
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = pdf_doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]  # usually 'png' or 'jpeg'
        filename = f"sign_{page_number+1}_{img_index}.{image_ext}"
        image_path = os.path.join(ASSETS_DIR, filename)
        # Write image file
        with open(image_path, "wb") as img_file:
            img_file.write(image_bytes)
        # Associate with a lesson if we have one left
        if image_counter < len(lesson_ids):
            lesson_id = lesson_ids[image_counter]
            signs_map[lesson_id] = os.path.join("/src/assets/signs", filename).replace("\\", "/")
        image_counter += 1

# Write mapping JSON
with open(MAP_PATH, "w", encoding="utf-8") as map_file:
    json.dump(signs_map, map_file, indent=2, ensure_ascii=False)

print(f"Extracted {image_counter} images, created mapping for {len(signs_map)} lessons.")
