import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Lesson } from '../types';

interface LessonNodeProps {
    lesson: Lesson;
    index: number;
    onClick: () => void;
}

interface LessonPathProps {
    lessons: Lesson[];
    onLessonSelect: (lessonId: string) => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

const LessonNode: React.FC<LessonNodeProps> = ({ lesson, index, onClick }) => {
    const isLocked = lesson.status === 'locked';
    const isCompleted = lesson.status === 'completed';
    const isActive = !isLocked && !isCompleted;

    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col items-center mb-24 relative"
        >
            <motion.button
                whileHover={!isLocked ? { scale: 1.05 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={onClick}
                disabled={isLocked}
                className={`w-32 h-24 btn-flat text-3xl transition-all relative z-10
                    ${isLocked ? 'bg-[#E5E5E5] text-[#AFAFAF] border-b-[#C0C0C0]' : (isCompleted ? 'btn-flat-success' : 'btn-flat-primary')}
                    ${index % 2 === 0 ? 'lesson-node-left' : 'lesson-node-right'}
                `}
            >
                {isActive && (
                    <motion.div
                        layoutId="active-shadow"
                        className="absolute inset-0 bg-[#FFDE33]/40 rounded-2xl blur-xl -z-10"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
                {isCompleted ? (
                    <div className="bg-white/30 p-2 rounded-full shadow-inner">
                        <Trophy size={32} className="text-white fill-white/20" />
                    </div>
                ) : (index + 1)}
            </motion.button>
            <div className={`mt-6 text-center px-6 py-2 text-sm font-black uppercase tracking-widest w-56 ${isLocked ? 'text-[#7C7BA0]/50' : 'text-[#4C4B82]'
                } ${index % 2 === 0 ? 'lesson-node-left' : 'lesson-node-right'}`}>
                {lesson.title}
            </div>
        </motion.div>
    );
};

export const LessonPath: React.FC<LessonPathProps> = ({ lessons, onLessonSelect }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center py-20 pb-40 max-w-lg mx-auto relative bg-[#FDFCF0] min-h-screen rounded-[60px] mt-10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)]"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-[#E5E5E5]/40 -z-0 rounded-full" />

            {lessons.map((lesson, index) => (
                <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    onClick={() => onLessonSelect(lesson.id)}
                />
            ))}
        </motion.div>
    );
};
