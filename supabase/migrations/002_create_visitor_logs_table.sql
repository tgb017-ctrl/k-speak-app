-- ============================================================================
-- 002_create_visitor_logs_table.sql
-- K-Speak: AI Travel Korean - Visitor Location & Time Log Schema Migration
-- 작성자: AI 디자인실장 영자 🎨
-- ============================================================================

-- 고객 접속 지역 및 오픈 시간 기록 테이블 (visitor_logs)
CREATE TABLE IF NOT EXISTS public.visitor_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_encrypted TEXT NOT NULL,          -- AES 암호화된 고객 접속 지역 (예: Asia/Seoul, America/New_York)
    open_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL, -- 오픈 접속 시간
    user_agent_encrypted TEXT,               -- AES 암호화된 브라우저/기기 메타 정보
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 인덱스 생성 (접속 시간 기준 조회 최적화)
CREATE INDEX IF NOT EXISTS idx_visitor_logs_open_time ON public.visitor_logs(open_time DESC);

-- RLS (Row Level Security) 설정 및 접근 허용 정책
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to visitor_logs" ON public.visitor_logs FOR ALL USING (true) WITH CHECK (true);
