# 현재 상태 (2026-03-23)

## 최신 작업

### Context API 공개 접근 구축 완료 (2026-03-23)
- **SYSTEM_RULES.md 통합**: CLAUDE.md/GEMINI.md/CODEX.md → 심볼릭 링크
- **DuckDNS 도메인**: sunsu-board.duckdns.org (cron 자동갱신)
- **OCI 포트 7000 개방**: 외부 직접 접근 가능
- **Vercel Edge 프록시**: https://sunsu-board-context.vercel.app/
- **Gist 동기화**: gist_sync.py → GitHub Gist 자동 업데이트

### Workspace Board 엔터프라이즈 업그레이드 완료 (2026-03-21)
| Phase | 내용 |
|-------|------|
| 1-2 | JSON → SQLite(WAL) 마이그레이션 |
| 3 | Google Drive 마크다운 자동 동기화 |
| 3.5 | driveFileId 캐시 + SyncQueue 도입 |
| 4 | SQLite 영속 큐 + 지수 백오프 + FAILED 보존 |
| 5 | Worker 프로세스 분리 |
| 6 | Atomic UPDATE-RETURNING 동시성 제어 |
| 7 | Sync Metrics API + 7가지 에러 타입 자동 분류 |

GitHub: https://github.com/hadiux0295/Purity_Nexus

## 삼각편대 Phase 2 개선 방향 (Lumi 분석)
### P0 (즉시 실행)
- Relay Gateway 멱등성(Idempotency) 확보: request_id 유니크 키 + Redis SET 기반 중복 필터링

## 진행 중 이슈
- zeroclaw Gemini 할당량 소진 시 500 에러 (zeroclaw 자체 문제)
