'use client';

import { ExperienceShareWithAuthor, DifficultyLevel } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import {
    Building2,
    Briefcase,
    Clock,
    Star,
    User,
    CheckCircle2,
    AlertCircle,
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
                    className={`h-4 w-4 ${i < level ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                />
            ))}
            <span className={`ml-1 text-sm font-medium ${getDifficultyColor(level)}`}>
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
        <Card hover className="overflow-hidden">
            {/* Pending Approval Banner */}
            {!experience.is_approved && (
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">
                        Pending Approval
                    </span>
                </div>
            )}

            <CardContent className="pt-5">
                {/* Header: Author + Date */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900">
                                    {experience.author.full_name}
                                </span>
                                {experience.author.is_verified && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Clock className="h-3.5 w-3.5" />
                                {createdAt}
                            </div>
                        </div>
                    </div>
                    <DifficultyStars level={experience.difficulty_level} />
                </div>

                {/* Company & Role */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <span className="font-semibold text-slate-900">
                            {experience.company_name}
                        </span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-700">{experience.job_role}</span>
                    </div>
                </div>

                {/* Rounds Description */}
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">
                        Interview Rounds
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {experience.rounds_description}
                    </p>
                </div>

                {/* Preparation Tips */}
                <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-indigo-900 mb-2">
                        💡 Preparation Tips
                    </h4>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                        {experience.preparation_tips}
                    </p>
                </div>
            </CardContent>
        </Card>
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
            <Card>
                <CardContent className="py-12 text-center">
                    <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        No Experiences Yet
                    </h3>
                    <p className="text-slate-500">
                        Be the first to share your interview experience!
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {filteredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
            ))}
        </div>
    );
}
