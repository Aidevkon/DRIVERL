import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionFooterProps {
    status: 'none' | 'correct' | 'wrong';
    correctAnswer?: string;
    onCheck: () => void;
    onNext: () => void;
    disabled?: boolean;
}

export const QuestionFooter: React.FC<QuestionFooterProps> = ({
    status,
    correctAnswer,
    onCheck,
    onNext,
    disabled
}) => {
    return (
        <footer className={`fixed bottom-0 left-0 right-0 p-6 lg:p-10 transition-colors duration-300 border-t-2 ${status === 'correct' ? 'bg-[#D7FFB8] border-[#58CC02]/30' :
            status === 'wrong' ? 'bg-[#FFDFE0] border-[#FF4B4B]/30' :
                'bg-white border-[#E5E5E5]'
            }`}>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-grow">
                    {status === 'correct' && (
                        <>
                            <div className="bg-[#58CC02] p-3 rounded-2xl text-white shadow-[0_4px_0_0_#46A302]">
                                <CheckCircle2 size={32} strokeWidth={3} />
                            </div>
                            <div className="text-2xl font-black text-[#58CC02] uppercase tracking-tight">Σωστά! 🎉</div>
                        </>
                    )}
                    {status === 'wrong' && (
                        <>
                            <div className="bg-[#FF4B4B] p-3 rounded-2xl text-white shadow-[0_4px_0_0_#D33131]">
                                <XCircle size={32} strokeWidth={3} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-[#FF4B4B] uppercase tracking-tight">Λάθος... 😕</div>
                                <div className="text-[#FF4B4B] font-bold">Η σωστή απάντηση: {correctAnswer}</div>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full md:w-auto">
                    {status === 'none' ? (
                        <button
                            disabled={disabled}
                            onClick={onCheck}
                            className={`w-full md:w-48 py-4 btn-flat ${disabled
                                ? 'bg-[#E5E5E5] text-[#AFAFAF] border-b-[#C0C0C0] cursor-not-allowed'
                                : 'btn-flat-success text-white'
                                }`}
                        >
                            ΕΛΕΓΧΟΣ
                        </button>
                    ) : (
                        <button
                            onClick={onNext}
                            className={`w-full md:w-48 py-4 btn-flat text-white ${status === 'correct' ? 'btn-flat-success' : 'btn-flat-error'
                                }`}
                        >
                            ΣΥΝΕΧΕΙΑ
                        </button>
                    )}
                </div>
            </div>
        </footer>
    );
};
