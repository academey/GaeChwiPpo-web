-- 뉴스레터 구독자 테이블 생성
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);

-- RLS (Row Level Security) 활성화
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 구독 신청을 할 수 있도록 정책 설정
CREATE POLICY "Anyone can insert newsletter subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- 관리자만 구독자 목록을 조회할 수 있도록 정책 설정
CREATE POLICY "Admins can view all newsletter subscribers" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');
