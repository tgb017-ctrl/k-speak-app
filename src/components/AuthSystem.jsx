import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * ============================================================================
 * [Supabase Auth 이메일 인증 링크 지원 시스템 - AuthSystem.jsx]
 * 작성자: AI 디자인실장 영자 🎨
 * 
 * 주요 기능:
 * 1. 이메일/비밀번호 기반 회원가입시 인증 링크 메일 자동 발송 (signUp)
 * 2. 이메일 인증 대기 안내 카드 표시
 * 3. 메일함의 [Confirm Email] 링크 클릭 후 돌아왔을 때 자동 세션 연결
 * 4. 이메일 미인증 시 친절한 에러 핸들링 및 가이드
 * ============================================================================
 */
export default function AuthSystem() {
  // 1. 현재 탭 상태 ('login' 또는 'signup')
  const [authMode, setAuthMode] = useState('login');

  // 2. 입력 폼 상태 (이름, 이메일, 비밀번호)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 3. 현재 로그인된 사용자 정보 상태 (세션)
  const [user, setUser] = useState(null);
  
  // 4. 로딩 및 알림 메시지 상태
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // 5. 회원가입 후 이메일 인증 대기 안내 상태
  const [pendingEmail, setPendingEmail] = useState(null);

  // 컴포넌트 마운트 시 세션 및 이메일 인증 링크 리다이렉트 감지
  useEffect(() => {
    // 1) 초기 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2) 로그인/로그아웃/이메일 인증 링크 클릭 후 돌아옴 실시간 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        showToast('🎉 이메일 인증이 완료되어 성공적으로 로그인되었습니다!', 'success');
        setPendingEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * [1] 입력창 변화 감지 핸들러
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * [2] 이메일 인증 링크 전송을 포함한 회원가입 (signUp)
   */
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      showToast('⚠️ 모든 입력 필드를 채워주세요!', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('⚠️ 비밀번호는 최소 6자리 이상이어야 합니다!', 'error');
      return;
    }

    setLoading(true);

    try {
      // 인증 완료 후 다시 우리 사이트로 돌아오도록 emailRedirectTo 설정!
      const currentOrigin = window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: currentOrigin,
          data: {
            full_name: formData.name
          }
        }
      });

      if (error) {
        console.error('회원가입 실패:', error);
        showToast(`❌ 회원가입 실패: ${error.message}`, 'error');
      } else {
        setPendingEmail(formData.email);
        showToast('📩 입력하신 이메일로 인증 메일이 발송되었습니다!', 'success');
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      console.error('회원가입 예외 발생:', err);
      showToast('❌ 회원가입 처리 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * [3] 이메일 로그인 및 미인증 상태 체크 (signInWithPassword)
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast('⚠️ 이메일과 비밀번호를 입력해주세요!', 'error');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error('로그인 실패:', error);
        if (error.message.includes('Email not confirmed')) {
          setPendingEmail(formData.email);
          showToast('📩 이메일 인증이 아직 완료되지 않았습니다! 메일함을 확인해주세요.', 'error');
        } else {
          showToast(`❌ 로그인 실패: ${error.message}`, 'error');
        }
      } else {
        showToast(`🎉 환영합니다, ${data.user?.user_metadata?.full_name || data.user?.email}님!`, 'success');
        setFormData({ name: '', email: '', password: '' });
        setPendingEmail(null);
      }
    } catch (err) {
      console.error('로그인 예외 발생:', err);
      showToast('❌ 로그인 처리 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * [4] 안전한 로그아웃 (signOut)
   */
  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        showToast(`❌ 로그아웃 실패: ${error.message}`, 'error');
      } else {
        showToast('👋 안전하게 로그아웃 되었습니다.', 'info');
        setUser(null);
        setPendingEmail(null);
      }
    } catch (err) {
      console.error('로그아웃 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * [5] 알림 메시지(Toast) 표시
   */
  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <div style={styles.container}>
      {/* 알림 토스트 UI */}
      {toastMessage && (
        <div style={{
          ...styles.toast,
          backgroundColor: toastMessage.type === 'error' ? '#ef4444' : toastMessage.type === 'success' ? '#10b981' : '#6366f1'
        }}>
          {toastMessage.text}
        </div>
      )}

      {/* 헤더 섹션 */}
      <div style={styles.header}>
        <span style={styles.badge}>Supabase Email Verification 시스템</span>
        <h2 style={styles.title}>📩 이메일 인증 기반 회원가입 & 로그인</h2>
        <p style={styles.subtitle}>
          진짜 이메일 소유자인지 확인 메일을 통해 검증하는 안전한 회원 시스템입니다.
        </p>
      </div>

      {/* 이메일 인증 대기 안내 박스 */}
      {pendingEmail && !user && (
        <div style={styles.pendingCard}>
          <div style={styles.pendingIcon}>📬</div>
          <h3 style={styles.pendingTitle}>이메일 인증 링크를 확인해 주세요!</h3>
          <p style={styles.pendingText}>
            <strong>{pendingEmail}</strong> (으)로 인증 확인 메일을 발송했습니다.<br />
            메일함으로 이동하신 후 <strong>[Confirm Email]</strong> 링크를 누르시면 자동으로 인증이 완료됩니다!
          </p>
          <button
            onClick={() => setPendingEmail(null)}
            style={styles.pendingCloseBtn}
          >
            닫기 / 로그인 화면으로 이동
          </button>
        </div>
      )}

      {/* 이미 로그인되어 있을 경우: 내 프로필 카드 표시 */}
      {user ? (
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
          </div>
          <h3 style={styles.profileName}>
            {user.user_metadata?.full_name || '인증 완료 회원'} 님
          </h3>
          <p style={styles.profileEmail}>📧 {user.email}</p>
          <div style={styles.sessionBadge}>
            🟢 이메일 인증이 완료되어 로그인된 상태입니다.
          </div>

          <div style={styles.metaBox}>
            <div style={styles.metaItem}>
              <span style={styles.metaKey}>회원 고유 ID</span>
              <span style={styles.metaVal}>{user.id.substring(0, 18)}...</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaKey}>인증된 이메일</span>
              <span style={styles.metaVal}>{user.email}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaKey}>이메일 인증 확인일</span>
              <span style={styles.metaVal}>
                {user.email_confirmed_at
                  ? new Date(user.email_confirmed_at).toLocaleString('ko-KR')
                  : '인증 완료'}
              </span>
            </div>
          </div>

          <button onClick={handleLogout} disabled={loading} style={styles.logoutButton}>
            {loading ? '로그아웃 중...' : '🚪 안전하게 로그아웃하기'}
          </button>
        </div>
      ) : (
        /* 로그인되지 않은 경우: 탭 전환 로그인 / 회원가입 폼 표시 */
        <div style={styles.card}>
          <div style={styles.tabSwitcher}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                ...styles.tabBtn,
                backgroundColor: authMode === 'login' ? '#ffffff' : 'transparent',
                color: authMode === 'login' ? '#4f46e5' : '#64748b',
                boxShadow: authMode === 'login' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              🔑 로그인
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              style={{
                ...styles.tabBtn,
                backgroundColor: authMode === 'signup' ? '#ffffff' : 'transparent',
                color: authMode === 'signup' ? '#4f46e5' : '#64748b',
                boxShadow: authMode === 'signup' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              ✨ 회원가입 (메일 인증)
            </button>
          </div>

          <form onSubmit={authMode === 'login' ? handleLogin : handleSignUp} style={styles.form}>
            {authMode === 'signup' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>성함 (이름)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="예: 홍길동"
                  style={styles.input}
                  required
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>이메일 주소 (실제 메일함 수신이 가능한 메일)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your-email@gmail.com"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>비밀번호 (6자리 이상)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading
                ? '⚡ 처리 중...'
                : authMode === 'login'
                ? '🔑 Supabase로 로그인하기'
                : '📩 가입 신청 및 인증 메일 받기'}
            </button>
          </form>

          <div style={styles.footerNote}>
            {authMode === 'login' ? (
              <span>아직 계정이 없으신가요? 상단 **[회원가입]** 탭을 클릭해 보세요!</span>
            ) : (
              <span>가입 신청 시 등록한 이메일로 인증 확인 링크가 발송됩니다.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 🎨 영자 실장의 감각적인 모던 디자인 스타일
const styles = {
  container: {
    maxWidth: '540px',
    margin: '0 auto',
    padding: '32px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
  },
  toast: {
    position: 'fixed',
    top: '24px',
    right: '24px',
    padding: '14px 24px',
    borderRadius: '12px',
    color: '#ffffff',
    fontWeight: '600',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '20px',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  title: { fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' },
  pendingCard: {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    marginBottom: '24px',
  },
  pendingIcon: { fontSize: '36px', marginBottom: '8px' },
  pendingTitle: { fontSize: '18px', fontWeight: '800', color: '#1e40af', margin: '0 0 8px 0' },
  pendingText: { fontSize: '14px', color: '#1e3a8a', lineHeight: '1.6', margin: '0 0 16px 0' },
  pendingCloseBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
  },
  tabSwitcher: {
    display: 'flex',
    padding: '4px',
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  tabBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#334155' },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
  },
  submitButton: {
    marginTop: '10px',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
    cursor: 'pointer',
  },
  footerNote: { marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
    textAlign: 'center',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
  },
  profileName: { fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' },
  profileEmail: { fontSize: '14px', color: '#64748b', margin: '0 0 16px 0' },
  sessionBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: '#ecfdf5',
    color: '#059669',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '24px',
  },
  metaBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'left',
  },
  metaItem: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' },
  metaKey: { color: '#64748b', fontWeight: '600' },
  metaVal: { color: '#1e293b', fontWeight: '700' },
  logoutButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#ef4444',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
};
