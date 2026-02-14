// Database TypeScript Interfaces for Peer2Peer
// Strict adherence to PostgreSQL schema

export type UserRole = 'student' | 'alumni' | 'faculty' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_verified: boolean;
}

export interface StudentProfile {
  user_id: string;
  roll_number: string;
  department: string;
  batch_year: number;
  is_alumni: boolean;
  placement_status: 'not_placed' | 'placed' | 'not_interested';
  is_open_to_mentorship?: boolean; // For alumni
}

export interface PlacementDetail {
  user_id: string;
  company_name: string;
  job_role: string;
  salary_package: number; // LPA
  offer_letter_url: string | null;
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface ExperienceShare {
  id: string;
  author_id: string;
  company_name: string;
  job_role: string;
  rounds_description: string;
  preparation_tips: string;
  difficulty_level: DifficultyLevel;
  is_approved: boolean;
  created_at: string;
}

// Extended types for UI convenience
export interface UserWithProfile extends User {
  profile?: StudentProfile;
  placement?: PlacementDetail;
}

export interface ExperienceShareWithAuthor extends ExperienceShare {
  author: User;
}

// Messaging Types
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
}

export interface ConversationWithUser extends Conversation {
  otherUser: User;
  messages: Message[];
}
