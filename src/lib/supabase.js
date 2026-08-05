import { createClient } from '@supabase/supabase-js';

/**
 * ============================================================================
 * [Supabase 데이터베이스 연동 클라이언트 - supabase.js]
 * 작성자: AI 디자인실장 영자 🎨
 * ============================================================================
 */

// Supabase 접속 정보 (Vite 환경 변수 사용: ANON_KEY 또는 PUBLISHABLE_KEY 사용)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdoohladfpvhqvsoxjer.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'demo-anon-key-123456789';


// Supabase 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
