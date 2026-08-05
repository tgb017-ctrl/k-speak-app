import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * ============================================================================
 * [고객 데이터 입력 및 DB 저장 테스트 컴포넌트 - CustomerRegistration.jsx]
 * 작성자: AI 디자인실장 영자 🎨
 * 
 * 입력 및 저장 항목 (4종 완벽 지원):
 * 1. 고객 이름 (name / customer_name)
 * 2. 이메일 (email)
 * 3. 전화번호 (phone)
 * 4. 메모/상담 내용 (notes / memo)
 * ============================================================================
 */
export default function CustomerRegistration() {
  // 1. 입력 폼 상태 관리 (이름, 이메일, 전화번호, 메모 4종)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  /**
   * [1] Supabase CUSTOMER 테이블에서 전체 데이터 조회
   */
  const fetchCustomers = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('CUSTOMER')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('고객 목록 조회 오류:', error.message);
      } else {
        setCustomers(data || []);
      }
    } catch (err) {
      console.error('예상치 못한 오류 발생:', err);
    } finally {
      setFetching(false);
    }
  };

  /**
   * [2] 입력창 변화 감지 핸들러
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * [3] 폼 제출 시 Supabase DB에 4종 데이터 저장
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('⚠️ 고객 이름을 입력해주세요!', 'error');
      return;
    }

    setLoading(true);

    try {
      // name과 customer_name, notes와 memo를 함께 전송하여 DB 스키마 완벽 호환!
      const insertData = {
        name: formData.name,
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
        memo: formData.notes
      };

      const { data, error } = await supabase
        .from('CUSTOMER')
        .insert([insertData])
        .select();

      if (error) {
        console.error('Supabase DB 저장 실패:', error);
        showToast(`❌ 저장 실패: ${error.message}`, 'error');
      } else {
        showToast('🎉 Supabase DB에 고객 정보가 성공적으로 저장되었습니다!', 'success');
        setFormData({ name: '', email: '', phone: '', notes: '' });
        fetchCustomers();
      }
    } catch (err) {
      console.error('저장 중 에러 발생:', err);
      showToast('❌ 저장 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * [4] 알림 메시지(Toast) 표시
   */
  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div style={styles.container}>
      {/* 알림 토스트 UI */}
      {toastMessage && (
        <div style={{
          ...styles.toast,
          backgroundColor: toastMessage.type === 'error' ? '#ef4444' : '#10b981'
        }}>
          {toastMessage.text}
        </div>
      )}

      {/* 헤더 섹션 */}
      <div style={styles.header}>
        <span style={styles.badge}>Project_Name_1 CUSTOMER 4종 정보 연동</span>
        <h2 style={styles.title}>📝 신규 고객 정보 등록 & DB 저장</h2>
        <p style={styles.subtitle}>
          고객 이름, 이메일, 전화번호, 메모가 실시간으로 Supabase DB에 안전하게 저장됩니다.
        </p>
      </div>

      {/* 입력 폼 카드 */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>고객 이름 *</label>
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

          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>이메일 주소</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="gildong@example.com"
                style={styles.input}
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>전화번호</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-1234-5678"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>메모 / 상담 내용</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="특이사항이나 메모할 내용을 적어주세요."
              rows={3}
              style={{ ...styles.input, resize: 'vertical' }}
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
            {loading ? '⚡ Supabase DB로 저장 중...' : '🚀 Supabase DB에 저장하기'}
          </button>
        </form>
      </div>

      {/* DB 저장된 고객 목록 카드 */}
      <div style={styles.listSection}>
        <div style={styles.listHeader}>
          <h3 style={styles.listTitle}>📋 DB에 저장된 CUSTOMER 목록 ({customers.length}건)</h3>
          <button onClick={fetchCustomers} style={styles.refreshButton} disabled={fetching}>
            {fetching ? '🔄 조회 중...' : '🔄 새로고침'}
          </button>
        </div>

        {fetching ? (
          <div style={styles.emptyState}>데이터를 불러오는 중입니다...</div>
        ) : customers.length === 0 ? (
          <div style={styles.emptyState}>
            아직 저장된 고객 정보가 없습니다. 위 입력 폼에서 데이터 등록을 시도해보세요!
          </div>
        ) : (
          <div style={styles.grid}>
            {customers.map((item, idx) => (
              <div key={item.id || idx} style={styles.customerCard}>
                <div style={styles.cardTop}>
                  <span style={styles.cardName}>{item.name || item.customer_name || '이름 없음'}</span>
                  <span style={styles.cardBadge}>ID: {item.id || idx + 1}</span>
                </div>
                {item.email && <div style={styles.cardDetail}>📧 {item.email}</div>}
                {item.phone && <div style={styles.cardDetail}>📞 {item.phone}</div>}
                {(item.notes || item.memo) && (
                  <div style={styles.cardNotes}>💬 {item.notes || item.memo}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🎨 영자 실장의 럭셔리 감성 스타일 시트
const styles = {
  container: {
    maxWidth: '800px',
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
  header: { textAlign: 'center', marginBottom: '32px' },
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
  title: { fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' },
  subtitle: { fontSize: '15px', color: '#64748b', margin: 0 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
    marginBottom: '40px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  row: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
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
    marginTop: '12px',
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
  listSection: { marginTop: '20px' },
  listHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  listTitle: { fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 },
  refreshButton: {
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#475569',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  emptyState: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    color: '#94a3b8',
    fontSize: '15px',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' },
  customerCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: '17px', fontWeight: '700', color: '#0f172a' },
  cardBadge: { fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#64748b' },
  cardDetail: { fontSize: '13px', color: '#475569' },
  cardNotes: { fontSize: '13px', color: '#334155', backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', marginTop: '4px' },
};
