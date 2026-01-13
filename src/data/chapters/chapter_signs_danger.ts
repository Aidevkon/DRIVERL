import { dangerSigns } from '../signs_data';
import { generateSignQuestions } from '../../utils/quizUtils';
import type { Lesson } from '../../types';

export const chapterSignsDanger: Lesson = {
    id: 'chapter-signs-danger',
    title: 'Σήματα Κινδύνου (Κ)',
    status: 'locked',
    image: '/src/assets/signs/K-1.svg',
    questions: generateSignQuestions(dangerSigns, 'danger')
};
