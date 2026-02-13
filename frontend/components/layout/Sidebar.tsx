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
    Settings,
    LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Experiences', href: '/experiences', icon: BookOpen },
    { label: 'Alumni Directory', href: '/directory', icon: Users },
    { label: 'Placements', href: '/placements', icon: Briefcase },
    { label: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Menu Button - visible only on mobile */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-panel rounded-xl shadow-sm hover:bg-white/80 transition-colors"
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6 text-slate-700" />
            </button>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed top-0 left-0 z-50 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 flex items-center justify-between border-b border-slate-100/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-slate-900">Peer2Peer</h1>
                                        <p className="text-xs text-slate-500">Campus Network</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="h-6 w-6 text-slate-500" />
                                </button>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                'flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200',
                                                isActive
                                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "h-5 w-5",
                                                isActive ? "text-indigo-600" : "text-slate-400"
                                            )} />
                                            {item.label}
                                            {isActive && (
                                                <ChevronRight className="h-4 w-4 ml-auto text-indigo-400" />
                                            )}
                                        </Link>
                                    );
                                })}

                                <div className="my-4 border-t border-slate-100/50" />

                                <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                    <Settings className="h-5 w-5 text-slate-400" />
                                    Settings
                                </button>
                                <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                                    <LogOut className="h-5 w-5 text-red-400" />
                                    Logout
                                </button>
                            </nav>

                            {/* Footer */}
                            <div className="p-4 border-t border-slate-100/50 bg-slate-50/50">
                                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <User className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate">
                                            Priya Sharma
                                        </p>
                                        <p className="text-xs text-slate-500">Student</p>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
