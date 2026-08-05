import React, { useState } from 'react';
import KSpeakApp from './components/KSpeakApp';
import CustomerRegistration from './components/CustomerRegistration';
import AuthSystem from './components/AuthSystem';

/**
 * App 메인 진입 컴포넌트 (탭 전환 기능 포함)
 */
function App() {
  const [activeTab, setActiveTab] = useState('authTest');

  return (
    <div className="app-root" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* 상단 탭 네비게이션 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('authTest')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'authTest' ? '#4f46e5' : '#f1f5f9',
            color: activeTab === 'authTest' ? '#ffffff' : '#64748b',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          🔑 회원가입 & 로그인 (Auth)
        </button>
        <button
          onClick={() => setActiveTab('dbTest')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'dbTest' ? '#4f46e5' : '#f1f5f9',
            color: activeTab === 'dbTest' ? '#ffffff' : '#64748b',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          🚀 Supabase DB 입력 테스트
        </button>
        <button
          onClick={() => setActiveTab('mainApp')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'mainApp' ? '#4f46e5' : '#f1f5f9',
            color: activeTab === 'mainApp' ? '#ffffff' : '#64748b',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          🎨 K-Speak 앱 메인 화면
        </button>
      </div>

      {/* 탭 내용 */}
      {activeTab === 'authTest' ? (
        <AuthSystem />
      ) : activeTab === 'dbTest' ? (
        <CustomerRegistration />
      ) : (
        <KSpeakApp />
      )}
    </div>
  );
}

export default App;


