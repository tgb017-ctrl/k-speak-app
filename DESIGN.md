# 🎨 K-Speak: AI Travel Korean - Design System Guide

> **AI 디자인실장 영자의 디자이너 노트** 💖  
> 본 문서는 Stitch MCP의 K-Speak 디자인 시스템을 바탕으로 작성된 공식 디자인 가이드라인입니다.  
> 따뜻하고 친근한 "현지인 친구" 같은 브랜드 경험과 일본/글로벌 여행자를 위한 K-컬처 감성의 Soft-Minimalism UI를 지향합니다.

---

## 🌟 1. Brand Identity & Style (브랜드 정체성 & 스타일)

- **Brand Concept**: *A helpful local Korean friend* (도움이 되는 친근한 한국인 친구)
- **Design Concept**: **Soft-Minimalism (소프트 미니멀리즘)**
- **Emotional Goal**: 학습의 부담감(Anxiety)을 줄이고, 한국 여행의 설렘(Excitement)을 극대화!
- **Key Visual Elements**:
  - 넓은 여백과 부드러운 파스텔 톤 컬러 (Soft-Pop)
  - 둥글둥글하고 감각적인 라운드 코너 (High-Radius Geometry)
  - 은은하고 따뜻한 입체감 (Tonal Layering & Soft Mint Ambient Shadow)

---

## 🎨 2. Color Palette (색상 시스템)

| 분류 (Category) | 토큰명 (Token) | Hex Code | 설명 및 사용 용도 (Usage) |
| :--- | :--- | :--- | :--- |
| **Primary** | `primary` | `#006B59` | 메인 브랜드 컬러 (신뢰감 있는 딥 민트) |
| **Primary Container** | `primary-container` | `#64D2B7` | 주요 버튼, 핵심 카드 강조 (상큼한 라이트 민트) |
| **Secondary** | `secondary` | `#884F41` | 포근한 아치 톤 포인트 컬러 |
| **Secondary Container**| `secondary-container` | `#FFB4A2` | 상호작용 요소, 배지, 리워드 (따뜻한 피치) |
| **Tertiary** | `tertiary` | `#246293` | 차분한 정보 알림 |
| **Tertiary Container** | `tertiary-container` | `#8DC4FB` | 서브 강조 및 배경 하이라이트 (스카이 블루) |
| **Background / Surface**| `surface` / `background`| `#FBF8FF` | 눈이 편안한 은은한 연보라/아이보리 톤 백그라운드 |
| **Text Primary** | `on-surface` / `on-background`| `#161A32` | 짙은 슬레이트 텍스트 (순수 블랙 대신 사용) |
| **Outline Variant** | `outline-variant` | `#BCC9C4` | 연한 구분선 및 카드 테두리 |

---

## ✍️ 3. Typography (타이포그래피 규칙)

다국어(한국어, 영어, 일본어) 지원을 위해 **이중 폰트 시스템(Dual-Font Strategy)**을 적용합니다.

1. **Plus Jakarta Sans** (헤더, 영문 타이틀, 라벨)
   - `headline-lg`: 32px / Bold / Line Height 40px
   - `headline-md`: 24px / SemiBold / Line Height 30px
   - `label-caps`: 12px / Bold / Line Height 16px / Letter Spacing +0.05em
2. **Noto Sans** (본문, 한국어/일본어 이중 언어 카드)
   - `body-lg`: 18px / Regular / Line Height 28px
   - `body-md`: 16px / Regular / Line Height 24px
   - `bilingual-sub`: 14px / Medium / Line Height 20px (서브 텍스트 / 일본어 번역용)

> [!TIP]
> **이중 언어(Bilingual Stack) UI 가이드**:
> 한국어 주요 표현(예: "안녕하세요")을 위에 크게 배치하고, 아래에 일본어/영어 서브 텍스트(예: "こんにちは")를 2~4px 작고 60% 투명도로 배치하여 시각적 비중을 다듬습니다.

---

## 📐 4. Layout, Spacing & Radius (레이아웃 및 여백)

- **Grid System**: Mobile 기준 4-Column Grid, 좌우 Margin `20px`, Gutter `16px`
- **Spacing Rhythm**: 4px 기반 리듬
  - `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 40px
- **Border Radius (모서리 곡률)**:
  - 기본 컨테이너: `rounded-md` (`0.75rem` / `12px`)
  - 학습 카드 & 서브 박스: `rounded-xl` (`1.5rem` / `24px`)
  - 버튼 & 칩(Chip): `rounded-full` (알약 모양 Pill-shape)

---

## 🧩 5. Core Components (핵심 컴포넌트 디자인)

1. **Primary Button (주요 CTA)**
   - 알약 모양(Pill-shaped), `primary-container` (#64D2B7) 배경, 딥 민트 (#005849) 텍스트
   - 클릭하고 싶게 만드는 상큼한 소프톤 입체 그림자
2. **Learning Flashcard (여행 회화 플래시카드)**
   - 화이트 순백색 배경(#FFFFFF) + `rounded-xl`
   - 카드 하단에 피치(#FFB4A2) 또는 민트(#64D2B7) 카테고리 칩 배치
3. **Category Chips (카테고리 필터)**
   - "음식 🍜", "쇼핑 🛍️", "길찾기 🗺️" 등 라운드 칩
   - 파스텔 배경에 동일 계열 다크 텍스트 조합
