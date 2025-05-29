export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    name?: string;
    email?: string;
    provider?: string;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  created_at: string;
  user_id: string;
  due_date?: string;
}

export type AuthProviderType = 'google' | 'github';