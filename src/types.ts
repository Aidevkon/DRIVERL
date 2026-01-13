export type QuestionType = 'multiple-choice' | 'matching' | 'fill-in-blank';

export interface Question {
    id: string;
    type: QuestionType;
    prompt: string;
    options?: string[];
    correctAnswer: string | string[];
    image?: string;
    signId?: string;
}

export type LessonStatus = 'locked' | 'available' | 'completed';

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
    status: LessonStatus;
    image?: string;
}

export interface UserProgress {
    completedLessonIds: string[];
    currentLessonId: string | null;
    totalScore: number;
}

export interface UserContextType {
    progress: UserProgress;
    hearts: number;
    xp: number;
    gems: number;
    streak: number;
    addXp: (amount: number) => void;
    addGems: (amount: number) => void;
    loseHeart: () => void;
    completeLesson: (lessonId: string) => void;
}
