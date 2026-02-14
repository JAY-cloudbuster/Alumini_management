import { Suspense } from 'react';
import { fetchUserWithProfile, fetchExperienceShares } from '@/services/api';
import { SocialLayout } from '@/components/layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { ExperienceFeed } from '@/components/features/ExperienceFeed';
import { MessagesWidget } from '@/components/features/MessagesWidget';
import { ExperienceFeedSkeleton } from '@/components/ui/Skeleton';

// Simulate current logged-in user (would come from auth in production)
const CURRENT_USER_ID = 'usr_002'; // Rahul Verma - Alumni

// Main Content
async function DashboardContent() {
  const [user, experiences] = await Promise.all([
    fetchUserWithProfile(CURRENT_USER_ID),
    fetchExperienceShares(true),
  ]);

  if (!user) return <div className="text-center py-12">User not found</div>;

  return (
    <SocialLayout
      rightSidebar={
        <MessagesWidget />
      }
    >
      <SubHeader />
      <ExperienceFeed experiences={experiences} />
    </SocialLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
            <ExperienceFeedSkeleton />
          </div>
          <div className="hidden lg:block lg:col-span-4">
            <div className="h-80 bg-slate-100 rounded-xl animate-pulse" />
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
