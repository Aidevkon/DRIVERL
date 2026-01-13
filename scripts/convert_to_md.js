
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '..', 'data', 'yme_manuals.html');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'kok_knowledge_base.md');

function convertToMd() {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Input file not found: ${INPUT_FILE}`);
        return;
    }

    const html = fs.readFileSync(INPUT_FILE, 'utf-8');
    const $ = cheerio.load(html);

    let mdContent = "# Knowledge Base: Greek Road Traffic Code (ΚΟΚ)\n\n";
    mdContent += "> Source: Glavopoulos.com (Scraped)\n\n";

    $('.article-container').each((i, el) => {
        // Extract Header
        const header = $(el).find('h1, h2, h3').first().text().trim();

        // Extract paragraphs and lists
        let body = "";

        // Iterate over children to maintain order
        $(el).children().each((_, child) => {
            const tagName = $(child).prop('tagName').toLowerCase();
            const text = $(child).text().trim();

            if (!text) return;

            if (tagName.startsWith('h')) {
                // Already handled header? or subheader
                if (text !== header) {
                    body += `\n## ${text}\n\n`;
                }
            } else if (tagName === 'p') {
                body += `${text}\n\n`;
            } else if (tagName === 'ul') {
                $(child).find('li').each((_, li) => {
                    body += `- ${$(li).text().trim()}\n`;
                });
                body += "\n";
            } else if (tagName === 'ol') {
                $(child).find('li').each((j, li) => {
                    body += `${j + 1}. ${$(li).text().trim()}\n`;
                });
                body += "\n";
            } else if (tagName === 'div') {
                body += `${text}\n\n`;
            }
        });

        mdContent += `# ${header}\n\n${body}\n---\n\n`;
    });

    fs.writeFileSync(OUTPUT_FILE, mdContent, 'utf-8');
    console.log(`Converted to Markdown: ${OUTPUT_FILE}`);
}

convertToMd();
