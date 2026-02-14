'use client';

import { Card } from "@/components/ui/Card";
import { Image, Calendar, FileText, Send } from "lucide-react";

export function CreatePostWidget() {
    return (
        <Card className="glass-panel border-none shadow-sm">
            <div className="p-4 space-y-4">
                <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold">You</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Share your experience or ask a question..."
                        className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-sm font-medium">
                            <Image className="h-4 w-4" />
                            <span className="hidden sm:inline">Media</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-amber-600 transition-colors text-sm font-medium">
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">Event</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-colors text-sm font-medium">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Article</span>
                        </button>
                    </div>

                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-md shadow-indigo-500/20">
                        <Send className="h-3.5 w-3.5" />
                        Post
                    </button>
                </div>
            </div>
        </Card>
    );
}
