

import type { Lesson } from '../types';
import { chapter1 } from './chapters/chapter_1';
import { chapter2 } from './chapters/chapter_2';
import { chapter3 } from './chapters/chapter_3';
import { chapter4 } from './chapters/chapter_4';
import { chapter5 } from './chapters/chapter_5';
import { chapter6 } from './chapters/chapter_6';
import { chapter7 } from './chapters/chapter_7';
import { chapter9 } from './chapters/chapter_9';
import { chapterSignsDanger } from './chapters/chapter_signs_danger';
import { chapterSignsRegulatory } from './chapters/chapter_signs_regulatory';
import { chapterSignsInfo } from './chapters/chapter_signs_info';

export const initialLessons: Lesson[] = [
    {
        id: 'signs-1',
        title: 'Βασικά Σήματα',
        status: 'available',
        image: '/src/assets/signs/R-2.svg',
        questions: [
            {
                id: 'basic-q1',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει αυτό το σήμα;',
                signId: 'R-2',
                options: [
                    'Υποχρεωτική διακοπή πορείας',
                    'Απαγορεύεται η είσοδος',
                    'Παραχώρηση προτεραιότητας',
                    'Τέλος απαγόρευσης'
                ],
                correctAnswer: 'Υποχρεωτική διακοπή πορείας'
            },
            {
                id: 'basic-q2',
                type: 'multiple-choice',
                prompt: 'Ποιο σήμα σας ζητά να δώσετε προτεραιότητα;',
                signId: 'R-1',
                options: [
                    'STOP',
                    'Παραχώρηση προτεραιότητας',
                    'Απαγορεύεται η είσοδος',
                    'Μονόδρομος'
                ],
                correctAnswer: 'Παραχώρηση προτεραιότητας'
            },
            {
                id: 'basic-q3',
                type: 'multiple-choice',
                prompt: 'Ποιο είναι το όριο ταχύτητας σε αυτό το σήμα (εάν αναγράφει 30);',
                signId: 'R-32',
                options: [
                    '20 χλμ/ώρα',
                    '30 χλμ/ώρα',
                    '40 χλμ/ώρα',
                    '50 χλμ/ώρα'
                ],
                correctAnswer: '30 χλμ/ώρα'
            }
        ]
    },
    {
        id: 'prohibitions-1',
        title: 'Απαγορεύσεις',
        status: 'locked',
        image: '/src/assets/signs/R-4.svg',
        questions: [
            {
                id: 'prohib-q1',
                type: 'multiple-choice',
                prompt: 'Τι απαγορεύει αυτό το σήμα;',
                signId: 'R-4',
                options: [
                    'Τη στάθμευση',
                    'Την είσοδο σε όλα τα οχήματα',
                    'Την αναστροφή',
                    'Την προσπέραση'
                ],
                correctAnswer: 'Την είσοδο σε όλα τα οχήματα'
            },
            {
                id: 'prohib-q2',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει αυτό το σήμα με την κόκκινη διαγώνιο;',
                signId: 'R-41',
                options: [
                    'Απαγορεύεται η στάθμευση',
                    'Απαγορεύεται η στάση',
                    'Επιτρέπεται η στάθμευση',
                    'Χώρος στάθμευσης'
                ],
                correctAnswer: 'Απαγορεύεται η στάθμευση'
            },
            {
                id: 'prohib-q3',
                type: 'multiple-choice',
                prompt: 'Τι απαγορεύεται όταν βλέπετε δύο αυτοκίνητα δίπλα-δίπλα σε κόκκινο κύκλο;',
                signId: 'R-27',
                options: [
                    'Η οδήγηση με δύο αυτοκίνητα',
                    'Το προσπέρασμα',
                    'Η στάθμευση',
                    'Η στροφή δεξιά'
                ],
                correctAnswer: 'Το προσπέρασμα'
            },
            {
                id: 'prohib-q4',
                type: 'multiple-choice',
                prompt: 'Ποιο είναι το ανώτατο όριο ταχύτητας εδώ;',
                signId: 'R-32',
                options: [
                    '30 χλμ/ώρα',
                    '50 χλμ/ώρα',
                    '80 χλμ/ώρα',
                    '100 χλμ/ώρα'
                ],
                correctAnswer: '50 χλμ/ώρα'
            }
        ]
    },
    {
        id: 'warnings-1',
        title: 'Προειδοποιήσεις',
        status: 'locked',
        image: '/src/assets/signs/K-1.svg',
        questions: [
            {
                id: 'warn-q1',
                type: 'multiple-choice',
                prompt: 'Ποιον κίνδυνο υποδεικνύει αυτό το τρίγωνο;',
                signId: 'K-16',
                options: [
                    'Κίνδυνος λόγω έργων',
                    'Κίνδυνος λόγω διέλευσης πεζών',
                    'Παιδική χαρά',
                    'Σχολείο'
                ],
                correctAnswer: 'Κίνδυνος λόγω διέλευσης πεζών'
            },
            {
                id: 'warn-q2',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει το γενικό προειδοποιητικό σήμα με το θαυμαστικό;',
                signId: 'K-26',
                options: [
                    'Τέλος κινδύνου',
                    'Άλλοι κίνδυνοι (προσοχή)',
                    'Υποχρεωτική πορεία',
                    'Απαγορεύεται η διέλευση'
                ],
                correctAnswer: 'Άλλοι κίνδυνοι (προσοχή)'
            },
            {
                id: 'warn-q3',
                type: 'multiple-choice',
                prompt: 'Γιατί πρέπει να προσέχετε όταν βλέπετε αυτό το σήμα;',
                signId: 'K-13',
                options: [
                    'Ο δρόμος είναι στενός',
                    'Ο δρόμος μπορεί να είναι ολισθηρός',
                    'Υπάρχουν στροφές',
                    'Υπάρχει ανηφόρα'
                ],
                correctAnswer: 'Ο δρόμος μπορεί να είναι ολισθηρός'
            }
        ]
    },
    {
        id: 'mandatory-1',
        title: 'Υποχρεωτικά Σήματα',
        status: 'locked',
        image: '/src/assets/signs/R-52.svg',
        questions: [
            {
                id: 'mand-q1',
                type: 'multiple-choice',
                prompt: 'Τι σας υποχρεώνει να κάνετε αυτό το μπλε σήμα;',
                signId: 'R-52',
                options: [
                    'Να στρίψετε αριστερά',
                    'Να κινηθείτε σε κυκλική πορεία',
                    'Να κάνετε αναστροφή',
                    'Να σταματήσετε'
                ],
                correctAnswer: 'Να κινηθείτε σε κυκλική πορεία'
            },
            {
                id: 'mand-q2',
                type: 'multiple-choice',
                prompt: 'Ποιο είναι το όριο ταχύτητας σε αυτή την περιοχή;',
                signId: 'R-32',
                options: [
                    '50 χλμ/ώρα',
                    '80 χλμ/ώρα',
                    '100 χλμ/ώρα',
                    '120 χλμ/ώρα'
                ],
                correctAnswer: '80 χλμ/ώρα'
            }
        ]
    },
    {
        id: 'info-1',
        title: 'Πληροφορίες',
        status: 'locked',
        image: '/src/assets/signs/P-21.svg',
        questions: [
            {
                id: 'info-q1',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει αυτό το μπλε τετράγωνο σήμα;',
                signId: 'P-21',
                options: [
                    'Δρόμος δύο κατευθύνσεων',
                    'Μονόδρομος',
                    'Απαγορεύεται η είσοδος',
                    'Αδιέξοδο'
                ],
                correctAnswer: 'Μονόδρομος'
            },
            {
                id: 'info-q2',
                type: 'multiple-choice',
                prompt: 'Σε τι είδους δρόμο εισέρχεστε με αυτό το σήμα;',
                signId: 'P-27',
                options: [
                    'Επαρχιακό δρόμο',
                    'Αυτοκινητόδρομο',
                    'Κατοικημένη περιοχή',
                    'Χωματόδρομο'
                ],
                correctAnswer: 'Αυτοκινητόδρομο'
            },
            {
                id: 'info-q3',
                type: 'multiple-choice',
                prompt: 'Τι δηλώνει αυτό το σήμα με τα κτίρια;',
                signId: 'P-58',
                options: [
                    'Είσοδος σε κατοικημένη περιοχή',
                    'Έξοδος από την πόλη',
                    'Βιομηχανική ζώνη',
                    'Κέντρο πόλης'
                ],
                correctAnswer: 'Είσοδος σε κατοικημένη περιοχή'
            }
        ]
    },
    {
        id: 'review-1',
        title: 'Επανάληψη',
        status: 'locked',
        image: '/src/assets/signs/stop.svg',
        questions: [
            {
                id: 'rev-q1',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει αυτό το σήμα;',
                signId: 'stop',
                options: [
                    'Υποχρεωτική διακοπή πορείας',
                    'Απαγορεύεται η είσοδος',
                    'Κίνδυνος',
                    'Μονόδρομος'
                ],
                correctAnswer: 'Υποχρεωτική διακοπή πορείας'
            },
            {
                id: 'rev-q2',
                type: 'multiple-choice',
                prompt: 'Ποιο είναι το ανώτατο όριο ταχύτητας;',
                signId: 'speed-50',
                options: [
                    '30',
                    '50',
                    '80',
                    '100'
                ],
                correctAnswer: '50'
            },
            {
                id: 'rev-q3',
                type: 'multiple-choice',
                prompt: 'Τι σημαίνει το μπλε βέλος;',
                signId: 'one-way',
                options: [
                    'Μονόδρομος',
                    'Αδιέξοδο',
                    'Υποχρεωτική πορεία',
                    'Αυτοκινητόδρομος'
                ],
                correctAnswer: 'Μονόδρομος'
            }
        ]
    },
    {
        id: 'eco-driving-1',
        title: 'Οικονομική Οδήγηση',
        status: 'locked',
        image: '/src/assets/signs/eco.svg',
        questions: [
            {
                id: 'eco-q1',
                type: 'multiple-choice',
                prompt: 'Οδηγώντας το αυτοκίνητό σας με σχάρα στην οροφή (ακόμα και χωρίς φορτίο):',
                signId: 'eco',
                options: [
                    'Αυξάνεται η κατανάλωση καυσίμου',
                    'Μειώνεται η κατανάλωση καυσίμου',
                    'Δεν επηρεάζεται η κατανάλωση'
                ],
                correctAnswer: 'Αυξάνεται η κατανάλωση καυσίμου'
            },
            {
                id: 'eco-q2',
                type: 'multiple-choice',
                prompt: 'Πότε έχετε αυξημένη κατανάλωση καυσίμου;',
                signId: 'eco',
                options: [
                    'Με ανοικτά παράθυρα',
                    'Με κλειστά παράθυρα',
                    'Με κλειστή ηλιοροφή'
                ],
                correctAnswer: 'Με ανοικτά παράθυρα'
            },
            {
                id: 'eco-q3',
                type: 'multiple-choice',
                prompt: 'Για οικονομικότερη οδήγηση σε δρόμο χωρίς κλίση:',
                signId: 'eco',
                options: [
                    'Αυξομειώνετε συνεχώς ταχύτητα',
                    'Αλλάζετε συνεχώς ταχύτητες',
                    'Χρησιμοποιείτε την κατά περίπτωση μεγαλύτερη σχέση μετάδοσης'
                ],
                correctAnswer: 'Χρησιμοποιείτε την κατά περίπτωση μεγαλύτερη σχέση μετάδοσης'
            },
            {
                id: 'eco-q4',
                type: 'multiple-choice',
                prompt: 'Οικονομική οδήγηση επιτυγχάνεται:',
                signId: 'eco',
                options: [
                    'Με μειωμένη πίεση ελαστικών',
                    'Με οδήγηση σε αυξημένες στροφές',
                    'Με τη σωστή πίεση των ελαστικών'
                ],
                correctAnswer: 'Με τη σωστή πίεση των ελαστικών'
            },
            {
                id: 'eco-q5',
                type: 'multiple-choice',
                prompt: 'Η χρήση του κλιματιστικού στο όχημά σας:',
                signId: 'eco',
                options: [
                    'Αυξάνει την κατανάλωση καυσίμου',
                    'Μειώνει την κατανάλωση καυσίμου',
                    'Δεν επηρεάζει την κατανάλωση'
                ],
                correctAnswer: 'Αυξάνει την κατανάλωση καυσίμου'
            }
        ]
    },
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter9,
    chapterSignsDanger,
    chapterSignsRegulatory,
    chapterSignsInfo
];
