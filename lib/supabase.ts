import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 서버 사이드에서 사용할 Supabase 클라이언트
export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

// 연사 신청 데이터 타입 정의
export interface SpeakerApplication {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  experience?: string;
  topic: string;
  description: string;
  duration: string;
  format: string;
  skills: string[];
  has_experience: boolean;
  previous_talks?: string;
  motivation: string;
  additional_info?: string;
  agreements: {
    privacy: boolean;
    recording: boolean;
    materials: boolean;
  };
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}
