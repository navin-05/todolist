# TaskMaster - Todo Task Management Application

A modern, responsive task management application built with React, TypeScript, and Supabase.

## Features

- Social authentication with Google, GitHub, and Facebook
- Complete CRUD operations for tasks
- Real-time updates
- Responsive design for all devices
- Task filtering and organization
- Secure data handling with Row Level Security

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Supabase for backend and authentication
- React Router for navigation
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Supabase Setup

1. Create a new Supabase project
2. Set up authentication providers:
   - Enable Google, GitHub, and Facebook auth in the Supabase dashboard
3. Run the migration script from `supabase/migrations/create_tasks_table.sql` to create the tasks table and set up RLS policies

## Project Structure

- `src/components`: React components
- `src/context`: Context providers
- `src/hooks`: Custom hooks
- `src/lib`: Utility functions and configurations
- `src/pages`: Page components
- `src/services`: API and service functions
- `src/types`: TypeScript type definitions

## Deployment

Build the application for production:

```bash
npm run build
```

Then deploy the `dist` directory to your preferred hosting service.