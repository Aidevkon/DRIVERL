import React from 'react';
import { X, Heart } from 'lucide-react';
import { ProgressBar } from '../ProgressBar';
import { useUser } from '../../hooks/useUser';

interface QuestionHeaderProps {
    progress: number;
    onExit: () => void;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({ progress, onExit }) => {
    const { hearts } = useUser();

    return (
        <header className="w-full flex items-center gap-6 px-4 py-8 mb-4 max-w-4xl mx-auto bg-white border-b-2 border-[#E5E5E5] lg:border-none lg:bg-transparent">
            <button
                onClick={onExit}
                className="text-[#AFAFAF] hover:text-[#4B4B4B] transition-colors"
                aria-label="Exit Lesson"
            >
                <X size={32} strokeWidth={3} />
            </button>

            <div className="flex-grow">
                <ProgressBar progress={progress} />
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#E5E5E5] rounded-xl shadow-[0_2px_0_0_#E5E5E5]">
                <Heart size={28} className="text-[#FF4B4B] fill-[#FF4B4B]" strokeWidth={2} />
                <span className="text-xl font-black text-[#FF4B4B]">{hearts}</span>
            </div>
        </header>
    );
};
