-- 연사 신청 테이블 생성
CREATE TABLE IF NOT EXISTS speaker_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  experience VARCHAR(50),
  topic VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  duration VARCHAR(20) NOT NULL,
  format VARCHAR(50) NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  has_experience BOOLEAN DEFAULT false,
  previous_talks TEXT,
  motivation TEXT NOT NULL,
  additional_info TEXT,
  agreements JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_speaker_applications_email ON speaker_applications(email);
CREATE INDEX IF NOT EXISTS idx_speaker_applications_status ON speaker_applications(status);
CREATE INDEX IF NOT EXISTS idx_speaker_applications_created_at ON speaker_applications(created_at);

-- RLS (Row Level Security) 활성화
ALTER TABLE speaker_applications ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 신청서를 생성할 수 있도록 정책 설정
CREATE POLICY "Anyone can insert speaker applications" ON speaker_applications
  FOR INSERT WITH CHECK (true);

-- 관리자만 신청서를 조회할 수 있도록 정책 설정 (나중에 관리자 기능 구현 시 사용)
CREATE POLICY "Admins can view all applications" ON speaker_applications
  FOR SELECT USING (auth.role() = 'authenticated');
