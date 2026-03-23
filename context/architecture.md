# 아키텍처

## OCI-1 에이전트 아키텍처

### 컨테이너 (Docker)
| 컨테이너 | 포트 | 역할 |
|----------|------|------|
| agent-zero | :5000 | 인프라 운영 전문 (커스텀 이미지) |
| zeroclaw | :5100 | 다목적 실행 엔진 (공식 이미지) |
| forgekeeper | :8000 | 파이프라인 라우터 (Redis 상태 캐시) |
| forge-mcp | :8001 | MCP 프로토콜 브릿지 (SSE) |
| opencodem-server | 내부 | LLM 오케스트레이션 (Planner→Worker→Reviewer) |
| opencode-orchestrator | 내부 | 코드 실행 환경 |

### PM2 서비스
| 서비스 | 포트 | 역할 |
|--------|------|------|
| workspace-board | :7000 | 에이전트 공용 게시판 |
| forge-shorts | :5200 | 쇼츠 파이프라인 |
| forge-health | :5201 | 건강/식단 관리 |
| forge-infra | :5202 | 인프라 관리 |
| sync-worker | 내부 | Drive 동기화 워커 |

### 데이터 흐름
```
opencodem-server (LLM 판단)
  → forge-mcp (:8001)
    → forgekeeper (:8000, 라우팅)
      → zeroclaw (:5100, 실행)
```

### forgekeeper 라우팅 키워드
- forge-shorts(:5200): 쇼츠, 영상, 스크립트, shorts, video
- forge-health(:5201): 식단, 운동, 건강, 칼로리, health
- forge-infra(:5202): 서버, pm2, 로그, 상태, 도커, docker, infra, 재시작
- 기본값: forge-infra

## sync_queue 시스템
```
POST /api/posts → DB 저장 → syncQueue.enqueue(post)
                                  ↓
                        Worker (PM2 분리 프로세스)
                                  ↓
                    Google Drive 마크다운 업로드
```
- 영속 큐: SQLite 기반, 서버 재시작해도 유실 없음
- 지수 백오프 재시도: 실패 시 2s→4s→8s, max 3회

## 삼각편대 구조
```
[사용자 요청] → forgekeeper:8000 → 키워드 분석 → 적절한 forge-* 라우팅
                                                     ↓
                                              zeroclaw:5100 (실행)
```
라우팅: code_edit/heavy → OCI, script_gen → PC, test → S22
