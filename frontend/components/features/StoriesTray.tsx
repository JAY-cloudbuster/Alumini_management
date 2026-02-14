'use client';

import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface Story {
    id: string;
    user: {
        name: string;
        image?: string;
    };
    hasUnseen: boolean;
}

// Mock Data
const MOCK_STORIES: Story[] = [
    { id: '1', user: { name: 'You' }, hasUnseen: false },
    { id: '2', user: { name: 'Sarah M.' }, hasUnseen: true },
    { id: '3', user: { name: 'Tech Club' }, hasUnseen: true },
    { id: '4', user: { name: 'Google' }, hasUnseen: false },
    { id: '5', user: { name: 'Rahul V.' }, hasUnseen: true },
];

export function StoriesTray() {
    return (
        <div className="glass-panel p-4 rounded-2xl overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-4 min-w-max">
                {MOCK_STORIES.map((story, index) => (
                    <motion.div
                        key={story.id}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className={`
              relative w-16 h-16 rounded-full p-[3px]
              ${index === 0 ? '' : story.hasUnseen
                                ? 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-indigo-600'
                                : 'bg-slate-200'}
            `}>
                            <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden relative">
                                {index === 0 ? (
                                    <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                                        <Plus className="h-6 w-6 text-indigo-600" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                                        {story.user.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {index === 0 && (
                                <div className="absolute bottom-0 right-0 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
                                    <Plus className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium text-slate-600 max-w-[64px] truncate text-center">
                            {story.user.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
