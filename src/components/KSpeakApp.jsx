import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Heart, 
  MessageSquare, 
  Compass, 
  User, 
  ChevronRight,
  Mic,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

/**
 * ============================================================================
 * [K-Speak: AI Travel Korean] 메인 모바일 앱 컴포넌트
 * 작성자: AI 디자인실장 영자 🎨
 * 
 * 💡 대표님을 위한 친절 가이드:
 * 1. 이 컴포넌트는 Stitch의 K-Speak 디자인 가이드라인(DESIGN.md)을 100% 반영했습니다.
 * 2. 여행자들을 위한 핵심 한국어 회화 카드, AI 음성 연습 모드, 카테고리 칩 등을 포함하고 있습니다.
 * ============================================================================
 */
export default function KSpeakApp() {
  // [상태 관리 1] 현재 선택된 카테고리 칩 (기본값: '전체')
  const [activeCategory, setActiveCategory] = useState('전체');

  // [상태 관리 2] 학습 카드 좋아요 클릭 여부
  const [likedCards, setLikedCards] = useState({ 1: true, 2: false });

  // [상태 관리 3] AI 음성 녹음 시뮬레이션 버튼 상태
  const [isRecording, setIsRecording] = useState(false);

  // [상태 관리 4] 하단 탭 바 선택 (기본값: 'learn')
  const [currentTab, setCurrentTab] = useState('learn');

  // 카테고리 목록 데이터
  const categories = [
    { id: 'all', label: '전체 🌟', sub: 'All' },
    { id: 'food', label: '식당 🍲', sub: 'Dining' },
    { id: 'shop', label: '쇼핑 🛍️', sub: 'Shopping' },
    { id: 'transit', label: '교통 🚕', sub: 'Taxi/Subway' },
  ];

  // 회화 카드 데이터 (이중 언어 Bilingual Stack 반영)
  const flashcards = [
    {
      id: 1,
      category: '식당 🍲',
      korean: "이거 하나 주세요!",
      romaja: "I-geo ha-na ju-se-yo!",
      japanese: "これを1つください。",
      english: "One of this, please.",
      level: "필수 회화",
      tagColor: "var(--color-primary-container)",
      tagTextColor: "var(--color-on-primary-container)"
    },
    {
      id: 2,
      category: '쇼핑 🛍️',
      korean: "얼마예요? 조금 깎아주세요~",
      romaja: "Eol-ma-ye-yo? Jo-geum kkak-a-ju-se-yo~",
      japanese: "いくらですか？少しまけてください〜",
      english: "How much is it? Discount please~",
      level: "실전 응용",
      tagColor: "var(--color-secondary-container)",
      tagTextColor: "var(--color-on-secondary-container)"
    },
    {
      id: 3,
      category: '교통 🚕',
      korean: "홍대입구역으로 가주세요.",
      romaja: "Hong-dae-ip-gu-yeok-eu-ro ga-ju-se-yo.",
      japanese: "弘大入口駅まで行ってください。",
      english: "Please take me to Hongdae Station.",
      level: "이동 회화",
      tagColor: "var(--color-tertiary-container)",
      tagTextColor: "var(--color-on-tertiary-container)"
    }
  ];

  // 좋아요 토글 함수
  const toggleLike = (cardId) => {
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // 음성 녹음 시뮬레이션
  const handleMicClick = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      alert("🎉 참 잘했어요! 발음 정확도 98% (A+ 등급)");
    }, 1500);
  };

  return (
    <div className="mobile-container">
      {/* ---------------------------------------------------------------------- */}
      {/* [1. 상단 앱 헤더 영역] */}
      {/* ---------------------------------------------------------------------- */}
      <header style={{
        padding: '24px 20px 16px 20px',
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(188, 201, 196, 0.2)'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-primary)',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'var(--font-headline)',
            letterSpacing: '0.05em',
            marginBottom: '2px'
          }}>
            <Sparkles size={14} /> AI LOCAL FRIEND
          </div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '800',
            fontFamily: 'var(--font-headline)',
            color: 'var(--color-on-surface)'
          }}>
            K-Speak <span style={{ color: 'var(--color-primary)', fontSize: '14px', fontWeight: '600' }}>Travel</span>
          </h1>
        </div>

        {/* 상단 스포트라이트 배지 */}
        <div style={{
          backgroundColor: 'var(--color-secondary-container)',
          color: 'var(--color-on-secondary-container)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '12px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          🔥 연속 3일 달성!
        </div>
      </header>

      {/* ---------------------------------------------------------------------- */}
      {/* [2. 중앙 스크롤 메인 콘텐츠] */}
      {/* ---------------------------------------------------------------------- */}
      <main className="content-scroll" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>

        {/* AI 안내 메시지 배너 (Soft-Pop 스타일) */}
        <div style={{
          backgroundColor: 'var(--color-primary-container)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'content',
              fontSize: '20px',
              boxShadow: 'var(--shadow-card)',
              justifyContent: 'center'
            }}>
              🤖
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-primary-container)' }}>
                "오늘의 서울 여행 표현을 배워봐요!"
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(0, 56, 46, 0.8)', marginTop: '2px' }}>
                Let's practice Korean for your trip today.
              </p>
            </div>
          </div>
          <ChevronRight size={18} color="var(--color-on-primary-container)" />
        </div>

        {/* 카테고리 필터 알약 칩 (Category Chips) */}
        <section>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.label;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.label)}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-card)',
                    color: isSelected ? '#FFFFFF' : 'var(--color-on-surface)',
                    border: isSelected ? 'none' : '1px solid var(--color-outline)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? 'var(--shadow-button)' : 'none'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 여행 회화 플래시 카드 섹션 (Bilingual Stack 적용) */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
              추천 여행 회화 💡
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-sub)' }}>
              총 {flashcards.length}개 카드
            </span>
          </div>

          {flashcards.map((card) => (
            <div
              key={card.id}
              style={{
                backgroundColor: 'var(--color-surface-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid rgba(188, 201, 196, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative'
              }}
            >
              {/* 카테고리 태그 및 좋아요 아이콘 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  backgroundColor: card.tagColor,
                  color: card.tagTextColor,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {card.category} • {card.level}
                </span>

                <button
                  onClick={() => toggleLike(card.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: likedCards[card.id] ? '#FF4B4B' : '#BCC9C4'
                  }}
                >
                  <Heart size={20} fill={likedCards[card.id] ? '#FF4B4B' : 'none'} />
                </button>
              </div>

              {/* [이중 언어 구조 - Bilingual Stack] */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)',
                  marginBottom: '4px'
                }}>
                  "{card.korean}"
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-primary)',
                  fontWeight: '600',
                  marginBottom: '6px'
                }}>
                  [{card.romaja}]
                </p>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-on-surface-sub)',
                  fontWeight: '500'
                }}>
                  🇯🇵 {card.japanese}
                </p>
              </div>

              {/* 하단 발음 재생 & AI 발음 연습 버튼 */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '4px',
                paddingTop: '12px',
                borderTop: '1px dashed #E5E6FF'
              }}>
                <button
                  onClick={() => alert(`🔊 음성 재생: "${card.korean}"`)}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-outline)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'var(--color-on-surface)',
                    cursor: 'pointer'
                  }}
                >
                  <Volume2 size={16} color="var(--color-primary)" /> 듣기
                </button>

                <button
                  onClick={handleMicClick}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--color-primary-container)',
                    border: 'none',
                    borderRadius: 'var(--radius-pill)',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--color-on-primary-container)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-button)'
                  }}
                >
                  <Mic size={16} /> {isRecording ? "녹음 중..." : "말해보기"}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* ---------------------------------------------------------------------- */}
      {/* [3. 하단 네비게이션 탭바 (Bottom Navigation)] */}
      {/* ---------------------------------------------------------------------- */}
      <nav style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(188, 201, 196, 0.3)',
        padding: '8px 24px 12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setCurrentTab('learn')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: currentTab === 'learn' ? 'var(--color-primary)' : 'var(--color-on-surface-sub)',
            fontWeight: currentTab === 'learn' ? '700' : '500',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          <BookOpen size={20} />
          학습하기
        </button>

        <button
          onClick={() => setCurrentTab('ai')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: currentTab === 'ai' ? 'var(--color-primary)' : 'var(--color-on-surface-sub)',
            fontWeight: currentTab === 'ai' ? '700' : '500',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          <MessageSquare size={20} />
          AI 튜터
        </button>

        <button
          onClick={() => setCurrentTab('explore')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: currentTab === 'explore' ? 'var(--color-primary)' : 'var(--color-on-surface-sub)',
            fontWeight: currentTab === 'explore' ? '700' : '500',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          <Compass size={20} />
          서울 탐방
        </button>

        <button
          onClick={() => setCurrentTab('profile')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: currentTab === 'profile' ? 'var(--color-primary)' : 'var(--color-on-surface-sub)',
            fontWeight: currentTab === 'profile' ? '700' : '500',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          <User size={20} />
          내 정보
        </button>
      </nav>
    </div>
  );
}
