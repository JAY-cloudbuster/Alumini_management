# Peer2Peer — Institutional Placement Networking Platform

> From Campus to Career — Peer2Peer makes placements personal

---

## 1. Project Overview

Peer2Peer is an institutional-grade, placement-focused professional networking platform built for colleges.  
It connects verified students, placed alumni, faculty, and placement administrators inside a **closed, college-controlled ecosystem**.

The platform eliminates placement anxiety by enabling:
- Verified alumni mentorship
- Authentic placement experience sharing
- Campus-specific discussions and resources
- Admin-controlled moderation and analytics

Peer2Peer is **not a social network**.  
It is a **placement infrastructure product**.

---

## 2. Technology Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- NextAuth.js
- Socket.IO Client
- React Hook Form + Zod

### Backend
- Node.js
- Express.js
- JWT Authentication (Access + Refresh)
- bcrypt (password hashing)
- Socket.IO (real-time)
- BullMQ / Agenda (background jobs)
- Winston / Pino (logging)

### Database & Storage
- PostgreSQL (primary relational database)
- Redis (caching, sessions)
- AWS S3 (media & document storage)
- CloudFront CDN

### DevOps & Monitoring
- Docker
- GitHub Actions (CI/CD)
- AWS EC2 + RDS
- Sentry
- AWS CloudWatch

---

## 3. Database Schema (High-Level)

### Core Identity
- users  
  - id, email, password_hash, full_name, role, is_verified, timestamps

### Role Extensions
- student_profiles (1:1 with users)
- faculty_profiles (1:1 with users)
- placement_details (alumni-only extension)

### Content & Interaction
- experience_shares
- admin_posts
- forum_threads
- forum_comments

### Networking & Messaging
- connections
- messages

**Design Notes**
- `users` is the single source of truth
- Role-specific data lives in extension tables
- Schema is normalized (3NF)
- Messaging is user-to-user, DB-backed, real-time capable

---

## 4. Architectural Principles

- DB-first design
- Clear separation of concerns
- Controller → Service → Repository pattern
- Role-based access control enforced at backend and frontend
- College-first, SaaS-ready mindset
- No cross-role or cross-college data leakage

---

## 5. Backend Architecture Plan

### Folder Structure
# src/
# ├── controllers/
# ├── services/
# ├── repositories/
# ├── routes/
# ├── middlewares/
# ├── sockets/
# ├── jobs/
# ├── utils/
# └── app.ts

### Core Backend Modules
- Authentication & Authorization
- User & Profile Management
- Experience Sharing & Moderation
- Forums & Discussions
- Messaging & Notifications
- Connections & Networking
- Admin Operations & Analytics

---

## 6. Frontend Architecture Plan

### App Router Structure
# app/
# ├── auth/
# ├── dashboard/
# ├── profile/
# ├── feed/
# ├── forums/
# ├── messages/
# ├── admin/
# └── layout.tsx

### Rendering Strategy
- Server Components: feeds, dashboards, analytics
- Client Components: chat, forms, editors
- Route Guards: role-based UI access

---

## 7. Authentication & RBAC

### Supported Roles
- Student
- Alumni
- Faculty
- College Admin
- Super Admin

### Enforcement Layers
- API middleware
- Service-layer validation
- Frontend route guards

### Core Rules
- Only alumni can create placement experiences
- Only admins can approve content
- Students cannot modify placement data
- Faculty access is read-only (analytics + posts)

---

## 8. Real-Time Messaging Plan

### Socket.IO Responsibilities
- Message delivery
- Read receipts
- Online presence
- Notifications

### Flow
# Client → Socket → Server
# Server → Persist to PostgreSQL → Emit to Receiver

Messaging is DB-first to ensure durability and auditability.

---

## 9. Media & File Handling

- Upload via signed S3 URLs
- Metadata stored in PostgreSQL
- Delivery via CloudFront CDN
- Role-based access enforcement

Mapped Fields:
- profile_image_url
- resume_url
- offer_letter_url
- image_url
- attachment_url

---

## 10. Moderation & Safety

- Experience shares require admin approval
- Moderation queue for admins
- Audit logs for admin actions
- Rate limiting on posts and messages
- Reporting hooks for abuse (future phase)

---

## 11. Implementation Roadmap

### Phase 0 — Foundation (Week 0–1)
- Repository setup
- Environment configuration
- Database migrations
- CI/CD pipeline
- Role & permission matrix

---

### Phase 1 — Core MVP (Weeks 1–4)

Backend:
- Auth & JWT
- User and profile CRUD
- Experience shares
- Connections
- Messaging (database-first)

Frontend:
- Auth flows
- Profile setup
- Feed rendering
- Basic chat UI

Outcome:
> Usable internal MVP

---

### Phase 2 — Placement Engine (Weeks 5–7)

- Placement details enforcement
- Advanced search & filters
- Forums & discussions
- Admin moderation UI
- Basic engagement analytics

Outcome:
> Clear differentiation from generic platforms

---

### Phase 3 — Engagement & Real-Time (Weeks 8–10)

- Socket.IO scaling
- Notifications
- Reputation scoring
- Admin announcements

Outcome:
> Retention & engagement layer activated

---

### Phase 4 — SaaS Hardening (Weeks 11–14)

- Multi-college isolation (college_id)
- Audit logs
- Rate limiting
- Performance tuning
- Backup & recovery

Outcome:
> Institution-ready SaaS product

---

## 12. Success Criteria

- Clean RBAC enforcement
- Stable real-time messaging
- Admin usability prioritized
- Zero data leakage
- Horizontally scalable architecture

---

## 13. Explicit Non-Goals

- No public social feed
- No open registration
- No cross-college networking (initially)
- No algorithmic ranking in MVP

---

## 14. Guiding Principle

Peer2Peer is not built for virality.  
It is built for **trust, verification, and placement outcomes**.

Every technical decision must reinforce:
- Institutional control
- Student confidence
- Alumni authenticity
- Scalable governance

---

**Project Status:** Execution Ready  
**Last Updated:** February 03, 2026
