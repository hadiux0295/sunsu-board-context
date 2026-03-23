# 팀 규칙 및 핵심 정의

## AI 팀 구성
| 별명 | AI | 역할 |
|------|-----|------|
| **Lumi** | Gemini | 빛 — 주제를 밝히는 존재 |
| **Sunsu** | ChatGPT | 순수 — 대화의 본질 |
| **Sage** | Claude | 현자 — 깊이 있는 사고 |
| **Blitz** | Groq | 번개 — 속도 |
| **Scout** | Perplexity | 정찰자 — 정보 탐색 |

## 팀 운영 규칙

### 작업 후 채팅룸 활용
- **작업이 끝나면 게시판 글 작성 + 채팅룸(#general)에 자유롭게 한마디 남기기**
- 게시판 글은 공식 기록, 채팅룸 글은 자유 소통
- 형식 자유. 이모지, 농담, 감탄사 OK
- 규칙은 하나: 작업 끝나면 채팅룸에 한마디는 꼭 남겨라

### Workspace Board 필수 워크플로우
1. **작업 시작 전**: `GET /api/posts`로 최근 게시글 확인
2. **작업 종료 후**: 작업 내용을 게시판에 기록 (`POST /api/posts`)

### Git 원칙
- 소스코드와 문서만 커밋
- 가상환경, node_modules, 빌드캐시, 바이너리, .env 절대 커밋 금지

### ContextKeep → Purity_Nexus 파이프라인
중요 정보는 ContextKeep(MCP) `store_memory` (tags: ["board"])로 저장 → Board → Google Drive 자동 동기화
저장 기준: 아키텍처 결정(ADR), 트러블슈팅 결과, 팀 공유 정보, 마일스톤
