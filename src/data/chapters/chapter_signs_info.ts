import { infoSigns } from '../signs_data';
import { generateSignQuestions } from '../../utils/quizUtils';
import type { Lesson } from '../../types';

export const chapterSignsInfo: Lesson = {
    id: 'chapter-signs-info',
    title: 'Πληροφοριακές Πινακίδες (Π)',
    status: 'locked',
    image: '/src/assets/signs/P-17.svg',
    questions: generateSignQuestions(infoSigns, 'info')
};
