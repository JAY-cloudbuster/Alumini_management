'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Home,
    Users,
    Briefcase,
    BookOpen,
    User,
    Menu,
    X,
    GraduationCap,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
    { label: 'Experiences', href: '/experiences', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Alumni Directory', href: '/directory', icon: <Users className="h-5 w-5" /> },
    { label: 'Placements', href: '/placements', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
];

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-slate-200"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-slate-700" />
                ) : (
                    <Menu className="h-6 w-6 text-slate-700" />
                )}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out',
                    'lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Logo */}
                <div className="p-6 border-b border-slate-100">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Peer2Peer</h1>
                            <p className="text-xs text-slate-500">Campus Network</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                )}
                            >
                                <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                                    {item.icon}
                                </span>
                                {item.label}
                                {isActive && (
                                    <ChevronRight className="h-4 w-4 ml-auto text-indigo-400" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                                Priya Sharma
                            </p>
                            <p className="text-xs text-slate-500">Student</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
