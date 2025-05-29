# Task Manager

A modern task management application built with React, TypeScript, Tailwind CSS, and Supabase.

**Deployed link** : https://waytodolist.netlify.app/
## Features

- Social authentication with Google and GitHub
- Add, edit, delete, and filter tasks
- Set due dates for tasks
- Responsive
- Secure data handling with Supabase

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Supabase (Database & Auth)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Supabase Setup

1. Create a new Supabase project.
2. In the Table Editor, create a `tasks` table with these columns:
   - `id` (uuid, primary key)
   - `title` (text)
   - `description` (text)
   - `status` (text)
   - `created_at` (timestamp, default: now())
   - `user_id` (uuid or text)
   - `due_date` (date, nullable)
3. Enable Google and GitHub authentication in the Supabase dashboard.
4. Set up Row Level Security (RLS) as needed.

## Deployment

To build for production:

```bash
npm run build
# or
yarn build
```

Deploy the `dist` directory to your preferred hosting service.

This project is a part of a hackathon run by https://www.katomaran.com
