-- 후원 신청 테이블 생성
CREATE TABLE IF NOT EXISTS sponsor_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_size VARCHAR(50),
  industry VARCHAR(100),
  website VARCHAR(255),
  contact_name VARCHAR(100) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  contact_position VARCHAR(100),
  sponsor_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  sponsor_amount VARCHAR(50),
  sponsor_period VARCHAR(50),
  motivation TEXT NOT NULL,
  additional_info TEXT,
  agreements JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_company_name ON sponsor_applications(company_name);
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_contact_email ON sponsor_applications(contact_email);
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_status ON sponsor_applications(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_created_at ON sponsor_applications(created_at);

-- RLS (Row Level Security) 활성화
ALTER TABLE sponsor_applications ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 후원 신청서를 생성할 수 있도록 정책 설정
CREATE POLICY "Anyone can insert sponsor applications" ON sponsor_applications
  FOR INSERT WITH CHECK (true);

-- 관리자만 후원 신청서를 조회할 수 있도록 정책 설정
CREATE POLICY "Admins can view all sponsor applications" ON sponsor_applications
  FOR SELECT USING (auth.role() = 'authenticated');
