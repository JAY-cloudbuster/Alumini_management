import { Suspense } from 'react';
import { fetchExperienceShares } from '@/services/api';
import { ExperienceFeed } from '@/components/features/ExperienceFeed';
import { ExperienceFeedSkeleton } from '@/components/ui/Skeleton';
import { BookOpen } from 'lucide-react';

async function ExperiencesContent() {
    const experiences = await fetchExperienceShares(true);

    return <ExperienceFeed experiences={experiences} />;
}

export default function ExperiencesPage() {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                        Interview Experiences
                    </h1>
                </div>
                <p className="text-slate-500">
                    Learn from real interview experiences shared by your peers and alumni.
                </p>
            </div>

            {/* Experience Feed */}
            <Suspense fallback={<ExperienceFeedSkeleton />}>
                <ExperiencesContent />
            </Suspense>
        </div>
    );
}
