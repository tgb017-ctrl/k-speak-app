-- ============================================================================
-- 001_create_k_speak_tables.sql
-- K-Speak: AI Travel Korean - Supabase Database Schema Migration
-- 작성자: AI 디자인실장 영자 🎨
-- ============================================================================

-- 1. 사용자 프로필 및 개인 설정 테이블 (user_profiles)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email_encrypted TEXT NOT NULL,       -- 암호화된 사용자 이메일
    user_name_encrypted TEXT,                -- 암호화된 사용자 이름
    streak_count INT DEFAULT 1,              -- 연속 방문 일수
    current_level TEXT DEFAULT 'BEGINNER',   -- 현재 학습 레벨
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 사용자가 저장/좋아요 클릭한 학습 카드 테이블 (saved_cards)
CREATE TABLE IF NOT EXISTS public.saved_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    card_id INT NOT NULL,                    -- 학습 카드 ID (1, 2, 3...)
    category TEXT NOT NULL,                  -- 카테고리 (식당, 쇼핑, 교통)
    korean_phrase_encrypted TEXT NOT NULL,   -- 암호화된 한국어 표현 문장
    is_liked BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 사용자의 AI 발음 연습 점수 및 기록 테이블 (practice_logs)
CREATE TABLE IF NOT EXISTS public.practice_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    card_id INT NOT NULL,
    accuracy_score INT NOT NULL,             -- 발음 정확도 점수 (예: 98점)
    grade TEXT NOT NULL,                     -- 등급 (A+, A, B...)
    audio_log_encrypted TEXT,                -- 암호화된 음성 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 인덱스 생성 (조회 성능 최적화)
CREATE INDEX IF NOT EXISTS idx_saved_cards_user_id ON public.saved_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_logs_user_id ON public.practice_logs(user_id);

-- RLS (Row Level Security) 설정 및 접근 허용 정책
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to user_profiles" ON public.user_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to saved_cards" ON public.saved_cards FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to practice_logs" ON public.practice_logs FOR ALL USING (true) WITH CHECK (true);
