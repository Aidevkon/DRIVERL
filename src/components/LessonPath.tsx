import React from 'react';
import { motion } from 'framer-motion';
import type { Lesson } from '../types';

interface LessonNodeProps {
    lesson: Lesson;
    index: number;
    onClick: () => void;
}

const LessonNode: React.FC<LessonNodeProps> = ({ lesson, index, onClick }) => {
    const isLocked = lesson.status === 'locked';
    const isCompleted = lesson.status === 'completed';

    return (
        <div className="flex flex-col items-center mb-12 relative">
            <motion.button
                whileHover={!isLocked ? { scale: 1.1 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={onClick}
                disabled={isLocked}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all relative z-10
                    ${isLocked ? 'bg-gray-700/50 grayscale' : 'btn-primary'}
                    ${isCompleted ? 'ring-4 ring-green-400' : ''}
                    ${index % 2 === 0 ? 'lesson-node-left' : 'lesson-node-right'}
                `}
            >
                {isCompleted ? '✅' : (index + 1)}
                {isCompleted && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-green-500 rounded-full w-8 h-8 border-2 border-white flex items-center justify-center text-sm"
                    >
                        🏆
                    </motion.div>
                )}
            </motion.button>
            <div className={`mt-4 text-center glass-card px-4 py-2 text-sm font-medium w-40 ${index % 2 === 0 ? 'lesson-node-left' : 'lesson-node-right'}`}>
                {lesson.title}
            </div>
        </div>
    );
};

interface LessonPathProps {
    lessons: Lesson[];
    onLessonSelect: (lessonId: string) => void;
}

export const LessonPath: React.FC<LessonPathProps> = ({ lessons, onLessonSelect }) => {
    return (
        <div className="flex flex-col items-center py-20 pb-40 max-w-md mx-auto relative">
            {/* SVG Connector would go here for a "curved" path */}
            {lessons.map((lesson, index) => (
                <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    onClick={() => onLessonSelect(lesson.id)}
                />
            ))}
        </div>
    );
};
