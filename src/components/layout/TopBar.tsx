import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Flame, Star, Heart } from 'lucide-react';

interface StatItemProps {
    icon: React.ElementType;
    value: number;
    color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, color }) => (
    <div className="stat-item">
        <Icon size={18} className={color} strokeWidth={3} />
        <span className={`text-base font-black ${color}`}>{value}</span>
    </div>
);

export const TopBar: React.FC = () => {
    const { streak, gems, hearts } = useUser();

    return (
        <header className="fixed top-0 left-0 right-0 h-20 lg:left-72 flex items-center justify-end px-8 gap-4 z-40 bg-white/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-b-2 border-[#E5E5E5] lg:border-none">
            <StatItem icon={Flame} value={streak} color="text-orange-500" />
            <StatItem icon={Star} value={gems} color="text-[#1CB0F6]" />
            <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#E5E5E5] rounded-2xl bg-white shadow-[0_4px_0_0_#E5E5E5]">
                <Heart size={26} className="text-[#FF4B4B] fill-[#FF4B4B]" strokeWidth={2.5} />
                <span className="text-xl font-black text-[#FF4B4B]">{hearts}</span>
            </div>
        </header>
    );
};
