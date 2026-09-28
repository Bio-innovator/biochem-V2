# Biochem-niche V2

A bilingual AP Biology learning platform built with Next.js, TypeScript, Prisma, and PostgreSQL. The project is designed to support students and teachers with structured biology knowledge, self-assessment quizzes, terminology learning, classroom management, and exam preparation.

This repository includes a full learning-management experience for AP Biology content, including:

- 8 course units with 53 knowledge topics
- interactive quiz and exam workflows
- bilingual explanations in English and Chinese
- glossary and concept review tools
- major and career exploration pages
- classroom, dashboard, and admin modules
- authentication and role-based access for students, teachers, and administrators

## Project Highlights

- Built with Next.js 14 and React 18
- TypeScript for a scalable frontend and backend structure
- Prisma ORM with PostgreSQL database
- Tailwind CSS for responsive UI design
- JWT-based authentication with bcrypt password hashing
- Support for bilingual content and localized user experience

## Technology Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Next.js App Router API routes
- Database: PostgreSQL via Prisma ORM
- Authentication: JWT + bcryptjs
- Deployment-ready: Vercel-friendly setup

## Core Features

### 1. Knowledge Learning
The learning platform organizes AP Biology content by unit and topic, covering major themes such as:

- Chemistry of Life
- Cell Structure
- Cellular Energetics
- Cell Communication
- Heredity
- Gene Expression
- Natural Selection
- Ecology

### 2. Quiz System
Students can practice questions by unit, track performance, and review incorrect answers through an error book system. The data model includes quiz results, answer history, scoring, and time tracking.

### 3. Glossary and Vocabulary
The application includes professional biology vocabulary with meaning, unit association, and bilingual support.

### 4. Exam Preparation
The project supports AP-style exam workflows with question sets, timed tests, score records, and answer analysis.

### 5. Classroom and Admin Modules
The app includes interfaces for classroom management, student progress, teacher/admin access, and role-based workflows.

### 6. Major Exploration
The platform includes educational content about biology-related majors, skills, careers, and academic pathways.

## Repository Structure

```text
biochem-V2/
├── app/
│   ├── api/
│   ├── about/
│   ├── admin/
│   ├── classroom/
│   ├── dashboard/
│   ├── exams/
│   ├── glossary/
│   ├── knowledge/
│   ├── majors/
│   ├── quiz/
│   ├── story/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── data/
├── lib/
├── prisma/
│   └── schema.prisma
├── env.example
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── next-env.d.ts
├── README.md
└── ...
```

## Main Data Models

The Prisma schema includes models for:

- User
- Role and Status enums
- Quiz and QuizResult
- QuizAnswer
- ErrorBook
- KnowledgeProgress
- Exam and ExamQuestion
- ExamResult and ExamAnswer
- KnowledgeTopic
- Glossary
- Major

This provides a structured backend foundation for progress tracking, assessments, and academic records.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js 18 or later
- npm
- PostgreSQL database
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Bio-innovator/biochem-V2.git
cd biochem-V2
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the example file and update it with your local configuration:

```bash
cp env.example .env
```

Example values:

```env
DATABASE_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres"
JWT_SECRET="your-secret-key-here"
NEXT_PUBLIC_APP_URL="https://biochem-niche.com"
```

## Database Setup

This project uses Prisma with PostgreSQL.

Generate Prisma client and sync the schema:

```bash
npx prisma generate
npx prisma db push
```

If you want to initialize migrations instead:

```bash
npx prisma migrate dev --name init
```

## Run the Application

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Lint check:

```bash
npm run lint
```

## Scripts

From `package.json`:

- `npm run dev` — start the development server
- `npm run build` — generate Prisma client and build the Next.js app
- `npm run start` — run the production server
- `npm run lint` — run ESLint checks

## Authentication and Roles

The application supports role-based access with the following user roles:

- STUDENT
- TEACHER
- ADMIN

User account states include:

- PENDING
- APPROVED
- REJECTED

This makes the platform suitable for classroom management and controlled access to dashboards and admin functions.

## Deployment Notes

This project is designed to be easy to deploy on Vercel, with environment variables configured in the hosting platform. Since it uses Prisma and PostgreSQL, the production environment must provide a valid `DATABASE_URL` and a secure `JWT_SECRET`.

## Notes

- The project is currently focused on AP Biology learning and educational content delivery.
- The UI is bilingual and designed around a polished academic learning experience.
- Some app sections and API routes are organized by domain, such as `quiz`, `knowledge`, `glossary`, `exams`, `classroom`, and `admin`.

## Contributing

Contributions are welcome. If you want to improve the platform, you can:

1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit a pull request

## Project Status

This repository is an active educational web application built for AP Biology learning workflows. It is suitable for continued growth into a larger study platform, classroom system, or content-driven LMS.

## Disclaimer

This project is intended for educational and personal use. Please ensure you configure your own secure environment variables and database credentials before deployment.
