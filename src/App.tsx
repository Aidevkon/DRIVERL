import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LessonScreen } from './components/LessonScreen'
import { LessonPath } from './components/LessonPath'
import { initialLessons } from './data/lessons'
import type { UserProgress } from './types'

type Screen = 'home' | 'lesson' | 'summary'

function App() {
    const [screen, setScreen] = useState<Screen>('home')
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
    const [progress, setProgress] = useState<UserProgress>(() => {
        const saved = localStorage.getItem('youdrive_progress');
        return saved ? JSON.parse(saved) : {
            completedLessonIds: [],
            currentLessonId: null,
            totalScore: 0
        };
    });

    // Sync progress to localStorage
    useEffect(() => {
        localStorage.setItem('youdrive_progress', JSON.stringify(progress));
    }, [progress]);

    // Derive lesson statuses from progress (no setState in effect)
    const lessons = useMemo(() => {
        return initialLessons.map((lesson, index) => {
            if (progress.completedLessonIds.includes(lesson.id)) {
                return { ...lesson, status: 'completed' as const };
            }
            if (index === 0 || progress.completedLessonIds.includes(initialLessons[index - 1].id)) {
                return { ...lesson, status: 'available' as const };
            }
            return { ...lesson, status: 'locked' as const };
        });
    }, [progress.completedLessonIds]);

    const startLesson = (lessonId: string) => {
        setActiveLessonId(lessonId);
        setScreen('lesson');
    }

    const handleLessonComplete = () => {
        if (activeLessonId) {
            setProgress(prev => ({
                ...prev,
                completedLessonIds: prev.completedLessonIds.includes(activeLessonId)
                    ? prev.completedLessonIds
                    : [...prev.completedLessonIds, activeLessonId]
            }));
        }
        setScreen('summary');
    }

    const goHome = () => {
        setActiveLessonId(null);
        setScreen('home');
    }

    const activeLesson = lessons.find(l => l.id === activeLessonId);

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden">
            <div className="liquid-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center min-h-screen">
                {screen === 'home' && (
                    <div className="w-full flex flex-col items-center">
                        <header className="w-full py-12 px-6 flex flex-col items-center">
                            <div className="w-20 h-20 bg-blue-500/20 rounded-3xl mb-6 flex items-center justify-center transform rotate-12 shadow-2xl glass-card">
                                <span className="text-4xl text-blue-400">🚗</span>
                            </div>
                            <h1 className="text-6xl font-black mb-2 tracking-tighter text-white drop-shadow-2xl">YouDrive</h1>
                            <p className="text-slate-400 font-light italic text-lg">Ετοιμάσου για το δίπλωμα οδήγησης</p>
                        </header>

                        <div className="w-full max-w-2xl px-4">
                            <LessonPath
                                lessons={lessons}
                                onLessonSelect={startLesson}
                            />
                        </div>
                    </div>
                )}

                {screen === 'lesson' && activeLesson && (
                    <LessonScreen
                        lesson={activeLesson}
                        onComplete={handleLessonComplete}
                        onExit={goHome}
                    />
                )}

                {screen === 'summary' && (
                    <div className="flex-grow flex items-center justify-center p-6 w-full">
                        <div className="glass-card p-12 w-full max-w-md text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-8xl mb-6"
                            >
                                🏆
                            </motion.div>
                            <h2 className="text-5xl font-black mb-4 text-white">ΜΠΡΑΒΟ!</h2>
                            <p className="text-2xl text-slate-400 mb-10 italic">Ολοκλήρωσες το μάθημα</p>
                            <button onClick={goHome} className="btn-primary w-full text-xl py-5 shadow-2xl">
                                ΣΥΝΕΧΕΙΑ ΣΤΗΝ ΠΟΡΕΙΑ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;


