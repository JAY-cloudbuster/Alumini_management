'use client';

import { ExperienceShareWithAuthor, DifficultyLevel } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import {
    Building2,
    Briefcase,
    Clock,
    Star,
    User,
    CheckCircle2,
    AlertCircle,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
} from 'lucide-react';

interface ExperienceCardProps {
    experience: ExperienceShareWithAuthor;
}

function getDifficultyLabel(level: DifficultyLevel): string {
    const labels: Record<DifficultyLevel, string> = {
        1: 'Easy',
        2: 'Moderate',
        3: 'Challenging',
        4: 'Hard',
        5: 'Very Hard',
    };
    return labels[level];
}

function getDifficultyColor(level: DifficultyLevel): string {
    if (level <= 2) return 'text-emerald-600';
    if (level <= 3) return 'text-amber-600';
    return 'text-red-600';
}

function DifficultyStars({ level }: { level: DifficultyLevel }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < level ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                />
            ))}
            <span className={`ml-1 text-xs font-medium ${getDifficultyColor(level)}`}>
                {getDifficultyLabel(level)}
            </span>
        </div>
    );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
    const createdAt = new Date(experience.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="relative">
            {/* Timeline connector: Author info row */}
            <div className="flex items-center gap-3 mb-3">
                {/* Avatar (blue circle like the image) */}
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-md flex-shrink-0 z-10">
                    <User className="h-5 w-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">
                            {experience.author.full_name}
                        </span>
                        {experience.author.is_verified && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        posted on {createdAt}
                    </div>
                </div>
            </div>

            {/* Post Card */}
            <div className="ml-5 border-l-2 border-slate-200 pl-8">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
                    {/* Pending Approval Banner */}
                    {!experience.is_approved && (
                        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-800">
                                Pending Approval
                            </span>
                        </div>
                    )}

                    <div className="p-5">
                        {/* Title line: "Congrats to X joined as Y in Z" */}
                        <h3 className="text-base font-bold text-slate-900 mb-3">
                            Congrats to {experience.author.full_name} joined as {experience.job_role} in {experience.company_name}
                        </h3>

                        {/* Content area (rounds description) */}
                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {experience.rounds_description}
                            </p>
                        </div>

                        {/* Preparation Tips */}
                        <div className="bg-indigo-50/60 rounded-lg p-4 mb-4 border border-indigo-100/50">
                            <h4 className="text-sm font-semibold text-indigo-900 mb-1">
                                💡 Preparation Tips
                            </h4>
                            <p className="text-sm text-indigo-800 leading-relaxed">
                                {experience.preparation_tips}
                            </p>
                        </div>

                        {/* Difficulty + Action Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <DifficultyStars level={experience.difficulty_level} />

                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors shadow-sm">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ExperienceFeedProps {
    experiences: ExperienceShareWithAuthor[];
    showPending?: boolean;
}

export function ExperienceFeed({
    experiences,
    showPending = false,
}: ExperienceFeedProps) {
    const filteredExperiences = showPending
        ? experiences
        : experiences.filter((e) => e.is_approved);

    if (filteredExperiences.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
                <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No Experiences Yet
                </h3>
                <p className="text-slate-500">
                    Be the first to share your interview experience!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {filteredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
            ))}
        </div>
    );
}
