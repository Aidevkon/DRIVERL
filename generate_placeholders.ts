import fs from 'fs';
import path from 'path';
import { dangerSigns, regulatorySigns, infoSigns } from './src/data/signs_data';

const signsDir = path.join(__dirname, 'src', 'assets', 'signs');

const allSigns = [...dangerSigns, ...regulatorySigns, ...infoSigns];

if (!fs.existsSync(signsDir)) {
    fs.mkdirSync(signsDir, { recursive: true });
}

allSigns.forEach(sign => {
    const filePath = path.join(__dirname, sign.image.replace(/^\//, '')); // Remove leading slash

    if (!fs.existsSync(filePath)) {
        console.log(`Generating placeholder for ${sign.id}`);

        let bgColor = '#cccccc';
        let textColor = '#000000';
        let borderColor = '#000000';
        let shape = 'rect'; // rect, triangle, circle

        if (sign.category === 'danger') {
            bgColor = '#ffffff';
            borderColor = '#ff0000';
            textColor = '#000000';
            shape = 'triangle';
        } else if (sign.category === 'regulatory') {
            // Most R signs are circles
            bgColor = '#ffffff';
            borderColor = '#ff0000';
            textColor = '#000000';
            shape = 'circle';
            if (sign.id === 'R-2') { // STOP
                shape = 'octagon';
                bgColor = '#ff0000';
                textColor = '#ffffff';
            }
        } else if (sign.category === 'info') {
            // Most P signs are Blue Rectangles
            bgColor = '#0055aa';
            borderColor = '#ffffff';
            textColor = '#ffffff';
            shape = 'rect';
        }

        let svgContent = '';
        if (shape === 'triangle') {
            svgContent = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5 L95 90 L5 90 Z" fill="${bgColor}" stroke="${borderColor}" stroke-width="5"/>
                <text x="50" y="60" font-family="Arial" font-size="20" font-weight="bold" fill="${textColor}" text-anchor="middle">${sign.code}</text>
            </svg>`;
        } else if (shape === 'circle') {
            svgContent = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="${bgColor}" stroke="${borderColor}" stroke-width="5"/>
                <text x="50" y="55" font-family="Arial" font-size="20" font-weight="bold" fill="${textColor}" text-anchor="middle">${sign.code}</text>
            </svg>`;
        } else if (shape === 'octagon') {
            // Crude octagon
            svgContent = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="${bgColor}" stroke="${borderColor}" stroke-width="5"/>
                <text x="50" y="55" font-family="Arial" font-size="20" font-weight="bold" fill="${textColor}" text-anchor="middle">STOP</text>
            </svg>`;
        } else {
            svgContent = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" fill="${bgColor}" stroke="${borderColor}" stroke-width="5"/>
                <text x="50" y="55" font-family="Arial" font-size="20" font-weight="bold" fill="${textColor}" text-anchor="middle">${sign.code}</text>
            </svg>`;
        }

        fs.writeFileSync(filePath, svgContent);
    }
});

console.log('Finished generating placeholders.');
