import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { Flame, Star, Heart } from 'lucide-react';

interface StatItemProps {
    icon: React.ElementType;
    value: number;
    color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, color }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 glass-card">
        <Icon size={18} className={color} strokeWidth={3} />
        <span className={`text-base font-black ${color}`}>{value}</span>
    </div>
);

export const TopBar: React.FC = () => {
    const { streak, gems, hearts } = useUser();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 lg:left-64 flex items-center justify-end px-6 gap-3 z-40 bg-slate-900/10 backdrop-blur-md lg:backdrop-blur-none border-b border-white/5 lg:border-none">
            <StatItem icon={Flame} value={streak} color="text-orange-500" />
            <StatItem icon={Star} value={gems} color="text-blue-400" />
            <StatItem icon={Heart} value={hearts} color="text-red-500" />
        </header>
    );
};
