import React from 'react';
import { X, Heart } from 'lucide-react';
import { ProgressBar } from '../ProgressBar';
import { useUser } from '../../contexts/UserContext';

interface QuestionHeaderProps {
    progress: number;
    onExit: () => void;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({ progress, onExit }) => {
    const { hearts } = useUser();

    return (
        <header className="w-full flex items-center gap-6 px-4 py-8 mb-4 max-w-4xl mx-auto">
            <button
                onClick={onExit}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Exit Lesson"
            >
                <X size={32} strokeWidth={2.5} />
            </button>

            <div className="flex-grow">
                <ProgressBar progress={progress} />
            </div>

            <div className="flex items-center gap-2">
                <Heart size={28} className="text-red-500 fill-red-500" strokeWidth={2} />
                <span className="text-xl font-black text-red-500">{hearts}</span>
            </div>
        </header>
    );
};
