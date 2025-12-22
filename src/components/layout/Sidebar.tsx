import React from 'react';
import { Home, Trophy, Target, ShoppingBag, User } from 'lucide-react';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 ${isActive
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-lg font-bold uppercase tracking-wide">{label}</span>
    </button>
);

export const Sidebar: React.FC = () => {
    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/10 p-4 bg-slate-900/50 backdrop-blur-xl z-50">
            <div className="px-4 py-8 mb-4">
                <h1 className="text-3xl font-black tracking-tighter text-white">YouDrive</h1>
            </div>

            <nav className="flex-grow space-y-2">
                <SidebarItem icon={Home} label="ΜΑΘΗΣΗ" isActive />
                <SidebarItem icon={Trophy} label="ΚΑΤΑΤΑΞΗ" />
                <SidebarItem icon={Target} label="ΑΠΟΣΤΟΛΕΣ" />
                <SidebarItem icon={ShoppingBag} label="ΚΑΤΑΣΤΗΜΑ" />
                <SidebarItem icon={User} label="ΠΡΟΦΙΛ" />
            </nav>
        </aside>
    );
};
