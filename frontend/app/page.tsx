import { Suspense } from 'react';
import { fetchUserWithProfile, fetchExperienceShares } from '@/services/api';
import { ExperienceFeed } from '@/components/features/ExperienceFeed';
import { PlacementTracker } from '@/components/features/PlacementTracker';
import { MentorshipToggle } from '@/components/features/MentorshipToggle';
import { ExperienceFeedSkeleton, ProfileCardSkeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import {
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  Award,
  Clock,
} from 'lucide-react';

// Simulate current logged-in user (would come from auth in production)
const CURRENT_USER_ID = 'usr_002'; // Rahul Verma - Alumni

// Quick Stats Component
function QuickStats({ role }: { role: string }) {
  const stats = [
    { label: 'Active Students', value: '2,345', icon: Users, color: 'text-indigo-600 bg-indigo-100' },
    { label: 'Experience Posts', value: '156', icon: BookOpen, color: 'text-emerald-600 bg-emerald-100' },
    { label: 'Companies Hiring', value: '48', icon: Briefcase, color: 'text-amber-600 bg-amber-100' },
    { label: 'Placement Rate', value: '89%', icon: TrendingUp, color: 'text-purple-600 bg-purple-100' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Student Dashboard Widget
function StudentDashboard() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          Upcoming Events
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="font-medium text-slate-900">Google Info Session</p>
            <p className="text-sm text-slate-500">Tomorrow, 3:00 PM</p>
          </div>
          <Badge variant="info">Virtual</Badge>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="font-medium text-slate-900">Resume Workshop</p>
            <p className="text-sm text-slate-500">Feb 15, 10:00 AM</p>
          </div>
          <Badge variant="success">In-Person</Badge>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="font-medium text-slate-900">Mock Interview Day</p>
            <p className="text-sm text-slate-500">Feb 20, 9:00 AM</p>
          </div>
          <Badge variant="warning">Register Now</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Alumni Dashboard Widget
function AlumniDashboard() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-indigo-600" />
          Your Impact
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <p className="text-2xl font-bold text-indigo-700">12</p>
            <p className="text-sm text-indigo-600">Mentees Helped</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <p className="text-2xl font-bold text-emerald-700">3</p>
            <p className="text-sm text-emerald-600">Experience Posts</p>
          </div>
        </div>
        <p className="text-sm text-slate-500 text-center">
          Your contributions have helped students prepare for 45+ interviews!
        </p>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Content
async function DashboardContent() {
  const [user, experiences] = await Promise.all([
    fetchUserWithProfile(CURRENT_USER_ID),
    fetchExperienceShares(true), // Only approved
  ]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">User not found</p>
      </div>
    );
  }

  const isAlumni = user.role === 'alumni';
  const isStudent = user.role === 'student';
  const isFaculty = user.role === 'faculty';

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Welcome back, {user.full_name.split(' ')[0]}!
          </h1>
          <Badge variant={isAlumni ? 'success' : isStudent ? 'info' : 'default'}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Badge>
        </div>
        <p className="text-slate-500">
          {isAlumni
            ? "Help the next generation succeed. Share your experience and mentor students."
            : isStudent
              ? "Track your placement journey and learn from alumni experiences."
              : "Manage placements and support student success."}
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats role={user.role} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Role-specific widgets */}
        <div className="lg:col-span-1 space-y-6">
          {/* Placement Tracker (for students with profiles) */}
          {user.profile && (
            <PlacementTracker profile={user.profile} placement={user.placement} />
          )}

          {/* Mentorship Toggle (for alumni) */}
          {isAlumni && user.profile && (
            <MentorshipToggle profile={user.profile} />
          )}

          {/* Role-specific widget */}
          {isStudent && <StudentDashboard />}
          {isAlumni && <AlumniDashboard />}
        </div>

        {/* Right Column: Experience Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Latest Interview Experiences
            </h2>
            <Badge variant="default">{experiences.length} posts</Badge>
          </div>
          <ExperienceFeed experiences={experiences.slice(0, 4)} />
        </div>
      </div>
    </div>
  );
}

// Page with Suspense
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-slate-200 rounded mb-2" />
            <div className="h-5 w-96 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <ProfileCardSkeleton key={i} />
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProfileCardSkeleton />
            </div>
            <div className="lg:col-span-2">
              <ExperienceFeedSkeleton />
            </div>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
