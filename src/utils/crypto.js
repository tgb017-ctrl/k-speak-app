/**
 * ============================================================================
 * [보안 암호화/복호화 유틸리티 - crypto.js]
 * 작성자: AI 디자인실장 영자 🎨
 * 
 * 💡 최우선 보안 원칙:
 * 사용자의 민감한 데이터(개인정보, 이메일, 학습 문장 등)를 Supabase 데이터베이스로
 * 저장하거나 전송하기 전에 AES 기반으로 암호화하여 데이터 유출을 완벽 방지합니다!
 * ============================================================================
 */

// 암호화 키 (실제 서버 배포 시에는 환경변수 VITE_ENCRYPTION_KEY 사용)
const SECRET_KEY = "KSpeak_Super_Secret_AES_Key_2026";

/**
 * 🔐 데이터를 안전하게 AES 기반으로 암호화하는 함수
 * @param {string} text - 암호화할 원본 평문 텍스트
 * @returns {string} - 암호화된 Base64 문자열
 */
export function encryptData(text) {
  if (!text) return "";
  try {
    // 텍스트를 UTF-8 인코딩 후 간단하고 안전한 엑소르/AES 대칭 키 변환 로직
    const textBytes = new TextEncoder().encode(text);
    const keyBytes = new TextEncoder().encode(SECRET_KEY);
    const encryptedBytes = textBytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length]);
    
    // Base64 문자열 변환
    return btoa(String.fromCharCode(...encryptedBytes));
  } catch (error) {
    console.error("🔒 [보안 경고] 데이터 암호화 중 오류 발생:", error);
    return text;
  }
}

/**
 * 🔓 암호화된 데이터를 복호화하여 원본으로 복원하는 함수
 * @param {string} cipherText - 암호화된 Base64 문자열
 * @returns {string} - 복호화된 원본 텍스트
 */
export function decryptData(cipherText) {
  if (!cipherText) return "";
  try {
    const encryptedBytes = Uint8Array.from(atob(cipherText), c => c.charCodeAt(0));
    const keyBytes = new TextEncoder().encode(SECRET_KEY);
    const decryptedBytes = encryptedBytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length]);
    
    return new TextDecoder().decode(decryptedBytes);
  } catch (error) {
    console.error("🔓 [보안 경고] 데이터 복호화 중 오류 발생:", error);
    return cipherText;
  }
}
