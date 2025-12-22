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
        <footer className={`fixed bottom-0 left-0 right-0 p-6 lg:p-10 transition-colors duration-300 border-t ${status === 'correct' ? 'bg-green-500/20 border-green-500/30' :
                status === 'wrong' ? 'bg-red-500/20 border-red-500/30' :
                    'bg-slate-900 border-white/10'
            }`}>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-grow">
                    {status === 'correct' && (
                        <>
                            <div className="bg-green-500 p-2 rounded-full text-white">
                                <CheckCircle2 size={32} />
                            </div>
                            <div className="text-2xl font-black text-green-500 uppercase tracking-tight">Σωστα!</div>
                        </>
                    )}
                    {status === 'wrong' && (
                        <>
                            <div className="bg-red-500 p-2 rounded-full text-white">
                                <XCircle size={32} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-red-500 uppercase tracking-tight">Λαθος...</div>
                                <div className="text-red-400 font-bold">Η σωστή απάντηση: {correctAnswer}</div>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full md:w-auto">
                    {status === 'none' ? (
                        <button
                            disabled={disabled}
                            onClick={onCheck}
                            className={`w-full md:w-48 py-4 text-xl font-black rounded-2xl transition-all ${disabled
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-500 active:translate-y-1 shadow-[0_4px_0_0_rgba(22,101,52,1)]'
                                }`}
                        >
                            ΕΛΕΓΧΟΣ
                        </button>
                    ) : (
                        <button
                            onClick={onNext}
                            className={`w-full md:w-48 py-4 text-xl font-black rounded-2xl transition-all text-white shadow-[0_4px_0_0_rgba(0,0,0,0.2)] ${status === 'correct' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
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
