import type { SignDefinition } from '../data/signs_data';
import type { Question } from '../types';

export function generateSignQuestions(signs: SignDefinition[], prefix: string): Question[] {
    return signs.map((sign) => {
        // Pick 2 random wrong answers
        const otherSigns = signs.filter(s => s.id !== sign.id);
        const wrong1 = otherSigns[Math.floor(Math.random() * otherSigns.length)].description;
        let wrong2 = otherSigns[Math.floor(Math.random() * otherSigns.length)].description;

        // Ensure unique options
        let attempts = 0;
        while ((wrong2 === wrong1 || wrong2 === sign.description) && attempts < 10) {
            wrong2 = otherSigns[Math.floor(Math.random() * otherSigns.length)].description;
            attempts++;
        }

        const options = [sign.description, wrong1, wrong2].sort(() => Math.random() - 0.5);

        return {
            id: `${prefix}-q-${sign.id}`,
            type: 'multiple-choice',
            prompt: `Τι σημαίνει αυτό το σήμα (${sign.code});`,
            image: sign.image,
            options: options,
            correctAnswer: sign.description
        };
    });
}
