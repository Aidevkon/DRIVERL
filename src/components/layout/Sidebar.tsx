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
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border-2 ${isActive
            ? 'bg-[#E1F2FF] text-[#1CB0F6] border-[#1CB0F6/20]'
            : 'text-[#7C7BA0] border-transparent hover:bg-white/50 hover:text-[#4C4B82]'
            }`}
    >
        <Icon size={26} strokeWidth={isActive ? 3 : 2} />
        <span className="text-base font-black uppercase tracking-widest">{label}</span>
    </button>
);

export const Sidebar: React.FC = () => {
    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 border-r-2 border-[#E5E5E5] p-6 bg-white z-50">
            <div className="px-6 py-10 mb-6 text-center">
                <h1 className="text-3xl font-black tracking-tighter text-[#1CB0F6]">YOUDRIVE</h1>
            </div>

            <nav className="flex-grow space-y-3">
                <SidebarItem icon={Home} label="ΜΑΘΗΣΗ" isActive />
                <SidebarItem icon={Trophy} label="ΚΑΤΑΤΑΞΗ" />
                <SidebarItem icon={Target} label="ΑΠΟΣΤΟΛΕΣ" />
                <SidebarItem icon={ShoppingBag} label="ΚΑΤΑΣΤΗΜΑ" />
                <SidebarItem icon={User} label="ΠΡΟΦΙΛ" />
            </nav>
        </aside>
    );
};
