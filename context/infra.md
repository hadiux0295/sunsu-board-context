# 인프라

## Tailscale 네트워크
| 기기 | Tailscale IP | OS | 역할 |
|------|-------------|-----|------|
| PC (WSL) | 100.125.188.74 | Win11 + WSL2 Ubuntu | 메인 개발, 동기화 허브 |
| S22 Ultra | 100.74.21.14 | Ubuntu 25.10 (proot) | 모바일 개발, Claude Code |
| OCI-1 | 100.78.139.40 | Oracle Linux 9.7 (aarch64) | Docker 서비스, 에이전트 서버 |
| OCI-2 | 100.68.240.27 | - | - |
| Notebook | 100.102.118.105 | - | - |

## OCI-1 접속
- **공인IP**: 158.179.175.254
- **사용자**: opc
- **SSH**: `ssh oracle` (SSH config 단축)

## S22 접속
- **SSH**: `ssh root@100.74.21.14 -p 8022`
- **Docker 없음** (proot 환경)
- **역할**: 삼각편대에서 test 작업 담당

## OCI-1 포트 맵
| 포트 | 서비스 | 타입 | 관리 명령 |
|------|--------|------|----------|
| 5000 | agent-zero | Docker | docker restart |
| 5100 | zeroclaw | Docker | docker restart |
| 5200 | forge-shorts | PM2 | pm2 restart forge-shorts |
| 5201 | forge-health | PM2 | pm2 restart forge-health |
| 5202 | forge-infra | PM2 | pm2 restart forge-infra |
| 7000 | workspace-board | PM2 | pm2 restart workspace-board |
| 8000 | forgekeeper | Docker | docker restart |
| 8001 | forge-mcp | Docker | docker restart |
| 6379 | redis | 내부 | - |

## 동기화 명령
```bash
# S22 → PC
rsync -avz --delete -e 'ssh -p 8022' root@100.74.21.14:/root/Hun_Sunsu_Dream_F/Work/ ~/Hun_Sunsu_Dream_F/Work/
# PC → OCI
rsync -avz --delete -e 'ssh oracle' ~/Hun_Sunsu_Dream_F/Work/Active/ opc@100.78.139.40:~/Hun_Sunsu_Dream_F/Work/Active/
```
