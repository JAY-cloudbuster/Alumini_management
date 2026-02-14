import {
    User,
    StudentProfile,
    PlacementDetail,
    ExperienceShare,
    Message,
    Conversation,
} from '@/types/database';

// ==================== USERS ====================
export const mockUsers: User[] = [
    {
        id: 'usr_001',
        email: 'priya.sharma@college.edu',
        full_name: 'Priya Sharma',
        role: 'student',
        is_verified: true,
    },
    {
        id: 'usr_002',
        email: 'rahul.verma@college.edu',
        full_name: 'Rahul Verma',
        role: 'alumni',
        is_verified: true,
    },
    {
        id: 'usr_003',
        email: 'ananya.patel@college.edu',
        full_name: 'Ananya Patel',
        role: 'student',
        is_verified: true,
    },
    {
        id: 'usr_004',
        email: 'vikram.singh@college.edu',
        full_name: 'Vikram Singh',
        role: 'alumni',
        is_verified: true,
    },
    {
        id: 'usr_005',
        email: 'neha.gupta@college.edu',
        full_name: 'Neha Gupta',
        role: 'faculty',
        is_verified: true,
    },
    {
        id: 'usr_006',
        email: 'arjun.reddy@college.edu',
        full_name: 'Arjun Reddy',
        role: 'student',
        is_verified: false,
    },
    {
        id: 'usr_007',
        email: 'kavya.nair@college.edu',
        full_name: 'Kavya Nair',
        role: 'alumni',
        is_verified: true,
    },
];

// ==================== STUDENT PROFILES ====================
export const mockStudentProfiles: StudentProfile[] = [
    {
        user_id: 'usr_001',
        roll_number: 'CS2021001',
        department: 'Computer Science',
        batch_year: 2025,
        is_alumni: false,
        placement_status: 'not_placed',
    },
    {
        user_id: 'usr_002',
        roll_number: 'CS2020015',
        department: 'Computer Science',
        batch_year: 2024,
        is_alumni: true,
        placement_status: 'placed',
        is_open_to_mentorship: true,
    },
    {
        user_id: 'usr_003',
        roll_number: 'EC2021042',
        department: 'Electronics',
        batch_year: 2025,
        is_alumni: false,
        placement_status: 'placed',
    },
    {
        user_id: 'usr_004',
        roll_number: 'ME2019088',
        department: 'Mechanical Engineering',
        batch_year: 2023,
        is_alumni: true,
        placement_status: 'placed',
        is_open_to_mentorship: false,
    },
    {
        user_id: 'usr_006',
        roll_number: 'IT2022033',
        department: 'Information Technology',
        batch_year: 2026,
        is_alumni: false,
        placement_status: 'not_placed',
    },
    {
        user_id: 'usr_007',
        roll_number: 'CS2019102',
        department: 'Computer Science',
        batch_year: 2023,
        is_alumni: true,
        placement_status: 'placed',
        is_open_to_mentorship: true,
    },
];

// ==================== PLACEMENT DETAILS ====================
export const mockPlacementDetails: PlacementDetail[] = [
    {
        user_id: 'usr_002',
        company_name: 'Google',
        job_role: 'Software Engineer',
        salary_package: 32,
        offer_letter_url: '/offers/rahul_google.pdf',
    },
    {
        user_id: 'usr_003',
        company_name: 'Intel',
        job_role: 'Hardware Design Engineer',
        salary_package: 18,
        offer_letter_url: '/offers/ananya_intel.pdf',
    },
    {
        user_id: 'usr_004',
        company_name: 'Tesla',
        job_role: 'Mechanical Engineer',
        salary_package: 24,
        offer_letter_url: null,
    },
    {
        user_id: 'usr_007',
        company_name: 'Microsoft',
        job_role: 'Product Manager',
        salary_package: 45,
        offer_letter_url: '/offers/kavya_microsoft.pdf',
    },
];

// ==================== EXPERIENCE SHARES ====================
export const mockExperienceShares: ExperienceShare[] = [
    {
        id: 'exp_001',
        author_id: 'usr_002',
        company_name: 'Google',
        job_role: 'Software Engineer',
        rounds_description:
            'Online Assessment (2 coding questions, 90 min) → Technical Phone Screen (45 min, DS/Algo) → Virtual Onsite (4 rounds: 2 Coding, 1 System Design, 1 Behavioral)',
        preparation_tips:
            'Focus heavily on LeetCode medium/hard. System design is crucial - study Designing Data-Intensive Applications. Practice explaining your thought process out loud.',
        difficulty_level: 5,
        is_approved: true,
        created_at: '2024-12-15T10:30:00Z',
    },
    {
        id: 'exp_002',
        author_id: 'usr_004',
        company_name: 'Tesla',
        job_role: 'Mechanical Engineer',
        rounds_description:
            'Resume Screen → Technical Assessment (CAD test + physics problems) → Panel Interview (3 engineers) → HR Round',
        preparation_tips:
            'Brush up on thermodynamics and materials science. Be ready to discuss your projects in extreme detail. Show passion for sustainable energy.',
        difficulty_level: 4,
        is_approved: true,
        created_at: '2024-11-20T14:15:00Z',
    },
    {
        id: 'exp_003',
        author_id: 'usr_007',
        company_name: 'Microsoft',
        job_role: 'Product Manager',
        rounds_description:
            'Phone Screen with Recruiter → Product Case Study (take-home, 48h) → Super Day (4 back-to-back interviews: Product Sense, Analytical, Cross-functional, Leadership)',
        preparation_tips:
            'Read "Cracking the PM Interview". Practice frameworks like CIRCLES. Have strong metrics-driven stories from past experiences.',
        difficulty_level: 4,
        is_approved: true,
        created_at: '2024-10-05T09:00:00Z',
    },
    {
        id: 'exp_004',
        author_id: 'usr_003',
        company_name: 'Intel',
        job_role: 'Hardware Design Engineer',
        rounds_description:
            'Aptitude Test → Technical Interview (Digital circuits, VLSI basics) → Manager Interview',
        preparation_tips:
            'Revise digital design fundamentals. Know your FPGA projects well. Be prepared for Verilog/VHDL questions.',
        difficulty_level: 3,
        is_approved: true,
        created_at: '2024-09-18T11:45:00Z',
    },
    {
        id: 'exp_005',
        author_id: 'usr_001',
        company_name: 'Startup XYZ',
        job_role: 'Full Stack Intern',
        rounds_description:
            'Take-home project (build a small web app in 3 days) → Technical discussion about the project → Founder chat',
        preparation_tips:
            'Be ready to justify every technical decision in your project. Show enthusiasm and willingness to learn.',
        difficulty_level: 2,
        is_approved: false, // Pending approval
        created_at: '2025-01-10T16:20:00Z',
    },
    {
        id: 'exp_006',
        author_id: 'usr_006',
        company_name: 'Infosys',
        job_role: 'Systems Engineer',
        rounds_description:
            'Online Test (Aptitude + Coding) → Technical Interview → HR Interview',
        preparation_tips:
            'Basic coding and aptitude. Focus on communication skills and be clear about your career goals.',
        difficulty_level: 2,
        is_approved: false, // Pending approval
        created_at: '2025-01-25T08:00:00Z',
    },
];

// ==================== HELPER: Get user by ID ====================
export function getUserById(id: string): User | undefined {
    return mockUsers.find((u) => u.id === id);
}

// ==================== HELPER: Get profile by user ID ====================
export function getProfileByUserId(userId: string): StudentProfile | undefined {
    return mockStudentProfiles.find((p) => p.user_id === userId);
}

// ==================== HELPER: Get placement by user ID ====================
export function getPlacementByUserId(userId: string): PlacementDetail | undefined {
    return mockPlacementDetails.find((p) => p.user_id === userId);
}
