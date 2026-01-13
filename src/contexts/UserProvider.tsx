import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import type { UserProgress } from '../types';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>(() => {
        try {
            const saved = localStorage.getItem('youdrive_progress');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate structure
                if (Array.isArray(parsed.completedLessonIds)) {
                    return {
                        completedLessonIds: parsed.completedLessonIds,
                        currentLessonId: parsed.currentLessonId || null,
                        totalScore: typeof parsed.totalScore === 'number' ? parsed.totalScore : 0
                    };
                }
            }
        } catch (e) {
            console.error("Failed to load progress", e);
        }

        return {
            completedLessonIds: [],
            currentLessonId: null,
            totalScore: 0
        };
    });

    const [hearts, setHearts] = useState(5);
    const [xp, setXp] = useState(0);
    const [gems, setGems] = useState(100);
    const [streak] = useState(1);

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
