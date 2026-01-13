import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { Lesson } from '../types';
import { SignRenderer } from './SignRenderer';

interface StudyScreenProps {
    lesson: Lesson;
    onStartQuiz: () => void;
    onBack: () => void;
}

export function StudyScreen({ lesson, onStartQuiz, onBack }: StudyScreenProps) {
    const facts = useMemo(() => {
        return lesson.questions.map((q, index) => ({
            id: q.id,
            index: index + 1,
            prompt: q.prompt,
            answer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer,
            signId: q.signId, // For sign questions (chapter 1)
            image: q.image // For chapter 2+, SVG assets
        }));
    }, [lesson]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center p-6 text-white pb-32">
            <header className="w-full max-w-2xl flex items-center justify-between mb-8">
                <button onClick={onBack} aria-label="Επιστροφή" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-slate-400">ΜΕΛΕΤΗ</h2>
                    <h1 className="text-2xl font-black text-center max-w-md leading-tight">{lesson.title}</h1>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <div className="w-full max-w-2xl space-y-6">
                {facts.map((fact, i) => (
                    <motion.div
                        key={fact.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-6 flex gap-6 items-start"
                    >
                        {/* Image/Sign Column */}
                        {(fact.signId || fact.image) && (
                            <div className="flex-shrink-0 w-24 h-24 bg-white/5 rounded-xl flex items-center justify-center p-2">
                                {fact.signId ? (
                                    <SignRenderer signId={fact.signId} className="w-full h-full" />
                                ) : (
                                    <img src={fact.image} alt="Σήμα" className="w-full h-full object-contain" />
                                )}
                            </div>
                        )}

                        {/* Text Column */}
                        <div className="flex-1">
                            <h3 className="text-slate-300 font-medium mb-2 text-lg">{fact.prompt}</h3>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                                <p className="text-emerald-400 font-bold">{fact.answer}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent">
                <button
                    onClick={onStartQuiz}
                    className="btn-primary w-full max-w-md py-4 text-xl font-bold uppercase tracking-widest shadow-2xl animate-pulse-slow"
                >
                    Είμαι έτοιμος! Τεστ
                </button>
            </div>
        </div>
    );
}
