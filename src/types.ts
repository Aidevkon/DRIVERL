export type QuestionType = 'multiple-choice' | 'matching' | 'fill-in-blank';

export interface Question {
    id: string;
    type: QuestionType;
    prompt: string;
    options?: string[];
    correctAnswer: string | string[];
    image?: string;
}

export type LessonStatus = 'locked' | 'available' | 'completed';

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
    status: LessonStatus;
}

export interface UserProgress {
    completedLessonIds: string[];
    currentLessonId: string | null;
    totalScore: number;
}
