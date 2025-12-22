import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// pdf-parse v2 exports PDFParse class
const { PDFParse } = require('pdf-parse');

async function extract() {
    try {
        const dataBuffer = fs.readFileSync('DRIVEL.pdf');

        // PDFParse is a class in v2
        const pdfParser = new PDFParse(dataBuffer);
        const data = await pdfParser.getText();

        console.log('--- START PDF DUMP ---');
        console.log('Text length:', data.length);
        console.log('First 2000 chars:', data.substring(0, 2000));

        fs.writeFileSync('pdf_dump.txt', data);
        console.log('Full text saved to pdf_dump.txt');
        console.log('--- END PDF DUMP ---');
    } catch (err) {
        console.error('Extraction Error:', err);
    }
}

extract();
