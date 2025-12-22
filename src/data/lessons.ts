import type { Lesson } from '../types';

export const initialLessons: Lesson[] = [
    {
        id: 'signs-1',
        title: 'Βασικά Σήματα - Μέρος 1',
        status: 'available',
        questions: [
            {
                id: 'q1',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει αυτό το σήμα (STOP);',
                options: [
                    'Υποχρεωτική διακοπή πορείας',
                    'Απαγορεύεται η είσοδος',
                    'Παραχώρηση προτεραιότητας',
                    'Τέλος απαγόρευσης'
                ],
                correctAnswer: 'Υποχρεωτική διακοπή πορείας'
            },
            {
                id: 'q2',
                type: 'multiple-choice',
                prompt: 'Σε ποια πλευρά του δρόμου οδηγούμε στην Ελλάδα;',
                options: [
                    'Αριστερά',
                    'Δεξιά',
                    'Στη μέση',
                    'Όπου θέλουμε'
                ],
                correctAnswer: 'Δεξιά'
            }
        ]
    }
];
