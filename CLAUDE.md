# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks (auto-runs on commit via husky)

### Package Management
This project uses **pnpm** as the package manager (version 10.10.0). Always use `pnpm` commands instead of `npm` or `yarn`.

## Architecture Overview

### Tech Stack
- **Next.js 15.2.4** with App Router and React 19
- **TypeScript** with strict mode
- **Supabase** for PostgreSQL database and authentication
- **Tailwind CSS** with shadcn/ui component system
- **React Hook Form + Zod** for form validation

### Key Directories

#### `/app/` - Next.js App Router
- `/actions/` - Server actions for form submissions (newsletter, speaker/sponsor applications)
- `/admin/` - Admin dashboard for managing applications
- `/apply/` and `/sponsor-apply/` - Application forms
- `/speakers/` - Speaker listing and individual pages

#### `/components/`
- `/ui/` - shadcn/ui reusable components
- Application-specific components for forms, speakers, community features

#### `/lib/`
- `supabase.ts` - Database client with TypeScript types for SpeakerApplication interface
- `utils.ts` - Utility functions

#### `/data/`
- `speakers.ts` - Static speaker data and profiles

#### `/scripts/`
- SQL database schema files for tables

### Database Architecture
Uses Supabase with pre-defined TypeScript interfaces:
- `SpeakerApplication` interface in `/lib/supabase.ts`
- Server and client-side Supabase clients
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### Component System
- Uses shadcn/ui with Radix UI primitives
- Path aliases configured: `@/components`, `@/lib`, `@/ui`, etc.
- Tailwind CSS with CSS variables for theming
- Lucide React for icons

### Korean Language Content
This is a Korean developer community website ("개취뽀" - Developer job preparation community). All user-facing text should be in Korean unless specified otherwise.

### Forms & Validation
- React Hook Form with Zod schemas
- Server actions handle form submissions
- Forms include: newsletter subscription, speaker applications, sponsor applications

### SEO & Analytics
- Comprehensive metadata in `app/layout.tsx`
- Google Analytics configured (G-3XSN32BG5T)
- Structured data for organization and events
- Korean locale (`ko_KR`) optimization