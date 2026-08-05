-- ============================================================================
-- [CUSTOMER 테이블 RLS 보안 정책 허용 SQL 마이그레이션 - 004_add_rls_policy_for_customer_table.sql]
-- 작성자: AI 디자인실장 영자 🎨
-- 
-- 주요 기능:
-- 1. CUSTOMER 테이블의 RLS(행 수준 보안) 정책을 설정하여 누구나 데이터 조회(SELECT) 및 입력(INSERT)이 가능하도록 허용합니다.
-- ============================================================================

-- 1. 기존 동일 이름의 정책이 있다면 정리 (오류 방지)
DROP POLICY IF EXISTS "Enable insert for anon and authenticated users" ON public."CUSTOMER";
DROP POLICY IF EXISTS "Enable read for anon and authenticated users" ON public."CUSTOMER";
DROP POLICY IF EXISTS "Allow public read and insert" ON public."CUSTOMER";

-- 2. 누구나 데이터를 조회(SELECT)할 수 있는 RLS 정책 추가
CREATE POLICY "Enable read for anon and authenticated users"
ON public."CUSTOMER"
FOR SELECT
TO public
USING (true);

-- 3. 누구나 신규 데이터를 입력(INSERT)할 수 있는 RLS 정책 추가
CREATE POLICY "Enable insert for anon and authenticated users"
ON public."CUSTOMER"
FOR INSERT
TO public
WITH CHECK (true);
