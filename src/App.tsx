import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LessonScreen } from './components/LessonScreen'
import { LessonPath } from './components/LessonPath'
import { MainLayout } from './components/layout/MainLayout'
import { initialLessons } from './data/lessons'
import { useUser } from './hooks/useUser';
import type { Lesson } from './types'

import { StudyScreen } from './components/StudyScreen'

type Screen = 'home' | 'lesson' | 'study' | 'summary'

function App() {
    const [screen, setScreen] = useState<Screen>('home')
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
    const { progress, completeLesson } = useUser();

    // Derive lesson statuses from progress
    const lessons = useMemo(() => {
        return initialLessons.map((lesson, index) => {
            const lessonWithStatus: Lesson = { ...lesson };

            if (progress.completedLessonIds.includes(lesson.id)) {
                lessonWithStatus.status = 'completed';
            } else if (index === 0 || progress.completedLessonIds.includes(initialLessons[index - 1].id)) {
                lessonWithStatus.status = 'available';
            } else {
                lessonWithStatus.status = 'locked';
            }

            return lessonWithStatus;
        });
    }, [progress.completedLessonIds]);

    const startStudy = (lessonId: string) => {
        setActiveLessonId(lessonId);
        setScreen('study');
    }

    const handleLessonComplete = () => {
        if (activeLessonId) {
            completeLesson(activeLessonId);
        }
        setScreen('summary');
    }

    const goHome = () => {
        setActiveLessonId(null);
        setScreen('home');
    }

    const activeLesson = lessons.find(l => l.id === activeLessonId);

    // Lessons and Path are wrapped in MainLayout
    // LessonScreen (the drill) is a full-screen experience
    if (screen === 'lesson' && activeLesson) {
        return (
            <div className="min-h-screen w-full relative overflow-x-hidden bg-slate-900">
                <LessonScreen
                    lesson={activeLesson}
                    onComplete={handleLessonComplete}
                    onExit={goHome}
                />
            </div>
        );
    }

    if (screen === 'study' && activeLesson) {
        return (
            <div className="min-h-screen w-full relative overflow-x-hidden bg-slate-900">
                <StudyScreen
                    lesson={activeLesson}
                    onStartQuiz={() => setScreen('lesson')}
                    onBack={goHome}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden">
            <div className="liquid-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <MainLayout>
                {screen === 'home' && (
                    <div className="w-full flex flex-col items-center">
                        <header className="w-full py-8 flex flex-col items-center">
                            <h1 className="text-4xl font-black mb-1 tracking-tighter text-white drop-shadow-2xl">ΜΑΘΗΣΗ</h1>
                            <div className="h-1 w-20 bg-blue-500 rounded-full mb-8"></div>
                        </header>

                        <div className="w-full max-w-2xl px-4">
                            <LessonPath
                                lessons={lessons}
                                onLessonSelect={startStudy}
                            />
                        </div>
                    </div>
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
                            <h2 className="text-5xl font-black mb-4 text-white uppercase italic">Μπραβο!</h2>
                            <p className="text-xl text-slate-400 mb-10">Ολοκλήρωσες το μάθημα και κέρδισες 10 XP</p>
                            <button onClick={goHome} className="btn-primary w-full text-xl py-5 shadow-2xl uppercase font-black">
                                Συνεχεια
                            </button>
                        </div>
                    </div>
                )}
            </MainLayout>
        </div>
    )
}

export default App;


