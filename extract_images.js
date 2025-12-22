import fs from 'fs';
import path from 'path';

// Use dynamic import for ESM module
async function run() {
    try {
        const { pdf } = await import('pdf-to-img');

        const PDF_PATH = 'DRIVEL.pdf';
        const OUTPUT_DIR = path.join('src', 'assets', 'signs');
        const MAP_PATH = path.join('src', 'data', 'signsMap.json');

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        console.log('Starting image extraction from PDF...');

        const document = await pdf(PDF_PATH, { scale: 3 });
        let pageCounter = 1;
        const signsMap = {};

        // We know from pdf_dump that the first few pages are likely what we need
        // For now, let's extract the first 10 pages and map them to signs-1, etc.
        // In a real scenario, we'd match the page content to the lesson.

        for await (const image of document) {
            const filename = `sign_${pageCounter}.png`;
            const filePath = path.join(OUTPUT_DIR, filename);

            fs.writeFileSync(filePath, image);
            console.log(`Saved: ${filePath}`);

            // Temporary mapping: page 1 -> signs-1, etc.
            // Adjust this logic if you have more lessons
            if (pageCounter === 1) {
                signsMap['signs-1'] = `/src/assets/signs/${filename}`;
            }

            pageCounter++;
            if (pageCounter > 20) break; // Limit for now to avoid too many files
        }

        fs.writeFileSync(MAP_PATH, JSON.stringify(signsMap, null, 2));
        console.log(`Updated mapping file: ${MAP_PATH}`);
        console.log('Extraction complete!');

    } catch (err) {
        console.error('Extraction Error:', err);
    }
}

run();
