import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProgress } from '../types';

interface UserContextType {
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

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>(() => {
        const saved = localStorage.getItem('youdrive_progress');
        return saved ? JSON.parse(saved) : {
            completedLessonIds: [],
            currentLessonId: null,
            totalScore: 0
        };
    });

    const [hearts, setHearts] = useState(5);
    const [xp, setXp] = useState(0);
    const [gems, setGems] = useState(100);
    const [streak, setStreak] = useState(1);

    useEffect(() => {
        localStorage.setItem('youdrive_progress', JSON.stringify(progress));
    }, [progress]);

    const addXp = (amount: number) => setXp(prev => prev + amount);
    const addGems = (amount: number) => setGems(prev => prev + amount);
    const loseHeart = () => setHearts(prev => Math.max(0, prev - 1));

    const completeLesson = (lessonId: string) => {
        setProgress(prev => ({
            ...prev,
            completedLessonIds: prev.completedLessonIds.includes(lessonId)
                ? prev.completedLessonIds
                : [...prev.completedLessonIds, lessonId]
        }));
        addXp(10); // Standard lesson XP
    };

    return (
        <UserContext.Provider value={{
            progress, hearts, xp, gems, streak,
            addXp, addGems, loseHeart, completeLesson
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
