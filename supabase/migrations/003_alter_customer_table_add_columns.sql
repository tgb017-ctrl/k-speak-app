-- ============================================================================
-- [CUSTOMER 테이블 컬럼 추가 SQL 마이그레이션 - 003_alter_customer_table_add_columns.sql]
-- 작성자: AI 디자인실장 영자 🎨
-- 
-- 주요 기능:
-- 1. CUSTOMER 테이블에 이메일(email), 전화번호(phone), 이름(name), 메모(notes) 컬럼을 추가합니다.
-- ============================================================================

-- 1. 이메일 (email) 컬럼 추가
ALTER TABLE public."CUSTOMER" 
ADD COLUMN IF NOT EXISTS email text;

-- 2. 전화번호 (phone) 컬럼 추가
ALTER TABLE public."CUSTOMER" 
ADD COLUMN IF NOT EXISTS phone text;

-- 3. 이름 (name) 컬럼 추가 (customer_name과 함께 호환되도록 설정)
ALTER TABLE public."CUSTOMER" 
ADD COLUMN IF NOT EXISTS name text;

-- 4. 상세 메모 (notes) 컬럼 추가
ALTER TABLE public."CUSTOMER" 
ADD COLUMN IF NOT EXISTS notes text;
