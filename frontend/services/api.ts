import {
    User,
    StudentProfile,
    PlacementDetail,
    ExperienceShare,
    ExperienceShareWithAuthor,
    UserWithProfile,
} from '@/types/database';
import {
    mockUsers,
    mockStudentProfiles,
    mockPlacementDetails,
    mockExperienceShares,
    getUserById,
    getProfileByUserId,
    getPlacementByUserId,
} from '@/constants/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const API_DELAY = 500;

// ==================== USERS ====================

export async function fetchUsers(): Promise<User[]> {
    await delay(API_DELAY);
    return mockUsers;
}

export async function fetchUserById(id: string): Promise<User | null> {
    await delay(API_DELAY);
    return getUserById(id) || null;
}

export async function fetchUserWithProfile(id: string): Promise<UserWithProfile | null> {
    await delay(API_DELAY);
    const user = getUserById(id);
    if (!user) return null;

    const profile = getProfileByUserId(id);
    const placement = getPlacementByUserId(id);

    return {
        ...user,
        profile,
        placement,
    };
}

// ==================== STUDENT PROFILES ====================

export async function fetchStudentProfiles(): Promise<StudentProfile[]> {
    await delay(API_DELAY);
    return mockStudentProfiles;
}

export async function fetchProfileByUserId(userId: string): Promise<StudentProfile | null> {
    await delay(API_DELAY);
    return getProfileByUserId(userId) || null;
}

// ==================== ALUMNI (with placements) ====================

export async function fetchAlumniWithPlacements(): Promise<UserWithProfile[]> {
    await delay(API_DELAY);

    const alumni = mockUsers.filter((u) => u.role === 'alumni');

    return alumni.map((user) => ({
        ...user,
        profile: getProfileByUserId(user.id),
        placement: getPlacementByUserId(user.id),
    }));
}

export async function fetchMentors(): Promise<UserWithProfile[]> {
    await delay(API_DELAY);

    const mentorProfiles = mockStudentProfiles.filter(
        (p) => p.is_alumni && p.is_open_to_mentorship
    );

    return mentorProfiles
        .map((profile): UserWithProfile | null => {
            const user = getUserById(profile.user_id);
            if (!user) return null;
            return {
                ...user,
                profile: profile,
                placement: getPlacementByUserId(profile.user_id),
            };
        })
        .filter((u): u is UserWithProfile => u !== null);
}

// ==================== PLACEMENT DETAILS ====================

export async function fetchPlacementDetails(): Promise<PlacementDetail[]> {
    await delay(API_DELAY);
    return mockPlacementDetails;
}

export async function fetchPlacementByUserId(userId: string): Promise<PlacementDetail | null> {
    await delay(API_DELAY);
    return getPlacementByUserId(userId) || null;
}

// ==================== EXPERIENCE SHARES ====================

export async function fetchExperienceShares(
    approvedOnly: boolean = true
): Promise<ExperienceShareWithAuthor[]> {
    await delay(API_DELAY);

    const experiences = approvedOnly
        ? mockExperienceShares.filter((e) => e.is_approved)
        : mockExperienceShares;

    return experiences.map((exp) => ({
        ...exp,
        author: getUserById(exp.author_id)!,
    }));
}

export async function fetchExperienceShareById(
    id: string
): Promise<ExperienceShareWithAuthor | null> {
    await delay(API_DELAY);
    const exp = mockExperienceShares.find((e) => e.id === id);
    if (!exp) return null;

    return {
        ...exp,
        author: getUserById(exp.author_id)!,
    };
}

export async function fetchExperiencesByAuthor(
    authorId: string
): Promise<ExperienceShare[]> {
    await delay(API_DELAY);
    return mockExperienceShares.filter((e) => e.author_id === authorId);
}

// ==================== SEARCH ====================

export async function searchAlumni(query: string): Promise<UserWithProfile[]> {
    await delay(API_DELAY);

    const lowerQuery = query.toLowerCase();
    const alumni = mockUsers.filter((u) => u.role === 'alumni');

    return alumni
        .filter((user) => {
            const placement = getPlacementByUserId(user.id);
            const profile = getProfileByUserId(user.id);

            return (
                user.full_name.toLowerCase().includes(lowerQuery) ||
                placement?.company_name.toLowerCase().includes(lowerQuery) ||
                placement?.job_role.toLowerCase().includes(lowerQuery) ||
                profile?.department.toLowerCase().includes(lowerQuery)
            );
        })
        .map((user) => ({
            ...user,
            profile: getProfileByUserId(user.id),
            placement: getPlacementByUserId(user.id),
        }));
}

// ==================== MENTORSHIP TOGGLE (simulated) ====================

export async function updateMentorshipStatus(
    userId: string,
    isOpen: boolean
): Promise<{ success: boolean }> {
    await delay(API_DELAY);

    const profile = mockStudentProfiles.find((p) => p.user_id === userId);
    if (profile && profile.is_alumni) {
        profile.is_open_to_mentorship = isOpen;
        return { success: true };
    }
    return { success: false };
}
