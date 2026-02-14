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

// ==================== CONVERSATIONS ====================
export const mockConversations: Conversation[] = [
    {
        id: 'conv_001',
        participants: ['usr_002', 'usr_001'],
        last_message: 'Thanks for the tips, Rahul! Really helpful 🙏',
        last_message_at: '2026-02-14T16:45:00Z',
        unread_count: 2,
    },
    {
        id: 'conv_002',
        participants: ['usr_002', 'usr_004'],
        last_message: 'The Tesla interview was intense!',
        last_message_at: '2026-02-14T14:20:00Z',
        unread_count: 0,
    },
    {
        id: 'conv_003',
        participants: ['usr_002', 'usr_007'],
        last_message: 'Product management is amazing at Microsoft',
        last_message_at: '2026-02-13T21:10:00Z',
        unread_count: 1,
    },
    {
        id: 'conv_004',
        participants: ['usr_002', 'usr_003'],
        last_message: 'Congrats on Intel! 🎉',
        last_message_at: '2026-02-13T10:05:00Z',
        unread_count: 0,
    },
];

// ==================== MESSAGES ====================
export const mockMessages: Message[] = [
    // conv_001: Rahul <-> Priya
    {
        id: 'msg_001',
        conversation_id: 'conv_001',
        sender_id: 'usr_001',
        content: 'Hi Rahul! I saw your Google interview experience. That was really insightful!',
        created_at: '2026-02-14T16:00:00Z',
        is_read: true,
    },
    {
        id: 'msg_002',
        conversation_id: 'conv_001',
        sender_id: 'usr_002',
        content: 'Hey Priya! Glad you found it useful. Let me know if you have any questions.',
        created_at: '2026-02-14T16:05:00Z',
        is_read: true,
    },
    {
        id: 'msg_003',
        conversation_id: 'conv_001',
        sender_id: 'usr_001',
        content: 'How long did you prepare for the system design round?',
        created_at: '2026-02-14T16:10:00Z',
        is_read: true,
    },
    {
        id: 'msg_004',
        conversation_id: 'conv_001',
        sender_id: 'usr_002',
        content: 'About 3 months. I used "Designing Data-Intensive Applications" and practiced on Excalidraw. Start with basic concepts and then move to distributed systems.',
        created_at: '2026-02-14T16:20:00Z',
        is_read: true,
    },
    {
        id: 'msg_005',
        conversation_id: 'conv_001',
        sender_id: 'usr_001',
        content: 'Thanks for the tips, Rahul! Really helpful 🙏',
        created_at: '2026-02-14T16:45:00Z',
        is_read: false,
    },

    // conv_002: Rahul <-> Vikram
    {
        id: 'msg_006',
        conversation_id: 'conv_002',
        sender_id: 'usr_002',
        content: 'Hey Vikram, how was your experience at Tesla?',
        created_at: '2026-02-14T13:00:00Z',
        is_read: true,
    },
    {
        id: 'msg_007',
        conversation_id: 'conv_002',
        sender_id: 'usr_004',
        content: 'It was great! The CAD test was challenging but the team was very welcoming.',
        created_at: '2026-02-14T13:30:00Z',
        is_read: true,
    },
    {
        id: 'msg_008',
        conversation_id: 'conv_002',
        sender_id: 'usr_004',
        content: 'The Tesla interview was intense!',
        created_at: '2026-02-14T14:20:00Z',
        is_read: true,
    },

    // conv_003: Rahul <-> Kavya
    {
        id: 'msg_009',
        conversation_id: 'conv_003',
        sender_id: 'usr_007',
        content: 'Hi Rahul! Just got promoted to Senior PM at Microsoft! 🎉',
        created_at: '2026-02-13T20:00:00Z',
        is_read: true,
    },
    {
        id: 'msg_010',
        conversation_id: 'conv_003',
        sender_id: 'usr_002',
        content: 'That\'s amazing Kavya! Congratulations! 🥳',
        created_at: '2026-02-13T20:30:00Z',
        is_read: true,
    },
    {
        id: 'msg_011',
        conversation_id: 'conv_003',
        sender_id: 'usr_007',
        content: 'Product management is amazing at Microsoft',
        created_at: '2026-02-13T21:10:00Z',
        is_read: false,
    },

    // conv_004: Rahul <-> Ananya
    {
        id: 'msg_012',
        conversation_id: 'conv_004',
        sender_id: 'usr_002',
        content: 'Congrats on Intel! 🎉',
        created_at: '2026-02-13T10:05:00Z',
        is_read: true,
    },
    {
        id: 'msg_013',
        conversation_id: 'conv_004',
        sender_id: 'usr_003',
        content: 'Thank you Rahul! Your mentorship really helped me prepare.',
        created_at: '2026-02-13T10:15:00Z',
        is_read: true,
    },
];

// ==================== HELPER: Get conversations for user ====================
export function getConversationsForUser(userId: string): Conversation[] {
    return mockConversations.filter((c) => c.participants.includes(userId));
}

// ==================== HELPER: Get messages for conversation ====================
export function getMessagesForConversation(conversationId: string): Message[] {
    return mockMessages.filter((m) => m.conversation_id === conversationId);
}
