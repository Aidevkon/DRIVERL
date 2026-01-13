import { regulatorySigns } from '../signs_data';
import { generateSignQuestions } from '../../utils/quizUtils';
import type { Lesson } from '../../types';

export const chapterSignsRegulatory: Lesson = {
    id: 'chapter-signs-regulatory',
    title: 'Ρυθμιστικές Πινακίδες (Ρ)',
    status: 'locked',
    image: '/src/assets/signs/R-2.svg',
    questions: generateSignQuestions(regulatorySigns, 'regulatory')
};
