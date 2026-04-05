# Counter API

NestJS 기반의 간단한 인메모리 카운터 API입니다. Swagger UI가 포함되어 있습니다.

## API 개요

- `GET /counter/:name` — 카운터 값 조회 (없으면 0)
- `POST /counter/:name/increment` — 1 증가
- `POST /counter/:name/decrement` — 1 감소
- `POST /counter/:name/reset` — 0으로 초기화
- `GET /api` — Swagger UI

---

# Windows 환경에서 실행하기 (Node.js가 없는 상태부터)

이 문서는 **Node.js가 전혀 설치되어 있지 않은 Windows PC**에서 이 프로젝트를 처음부터 실행하는 방법을 단계별로 설명합니다.

## 1. Node.js 설치

이 프로젝트는 NestJS 11을 사용하며, **Node.js 20 LTS 이상**이 필요합니다.

### 방법 A. 공식 인스톨러 사용 (초보자 권장)

1. 웹 브라우저에서 <https://nodejs.org/> 에 접속합니다.
2. **LTS (Long Term Support)** 버튼을 클릭하여 Windows Installer(`.msi`)를 다운로드합니다. (예: `node-v20.x.x-x64.msi`)
3. 다운로드한 `.msi` 파일을 더블클릭합니다.
4. 설치 마법사에서 다음과 같이 진행합니다:
   - License → **I accept** 체크 → Next
   - 설치 경로는 기본값(`C:\Program Files\nodejs\`) 그대로 Next
   - **Automatically install the necessary tools...** 체크박스는 선택 해제 가능 (이 프로젝트는 네이티브 빌드 도구가 필요 없음)
   - Install 클릭 → 관리자 권한 확인 창에서 **예**
   - Finish
5. 설치가 끝나면 **새 PowerShell 창**을 엽니다. (기존에 열려 있던 창은 PATH가 반영되지 않으므로 반드시 새로 열어야 합니다.)
6. 설치 확인:
   ```powershell
   node -v
   npm -v
   ```
   각각 `v20.x.x`, `10.x.x` 같은 버전이 출력되면 성공입니다.

### 방법 B. winget 사용 (Windows 10 1809 이상)

PowerShell(일반 권한으로 충분)에서 다음 명령을 실행합니다:

```powershell
winget install OpenJS.NodeJS.LTS
```

설치 후 **PowerShell 창을 닫고 새로 연 뒤** 위의 `node -v`로 확인합니다.

### 방법 C. nvm-windows 사용 (여러 Node 버전을 관리하고 싶을 때)

1. <https://github.com/coreybutler/nvm-windows/releases> 에서 `nvm-setup.exe` 다운로드 및 실행
2. 설치 후 새 PowerShell에서:
   ```powershell
   nvm install 20
   nvm use 20
   node -v
   ```

## 2. 프로젝트 소스 받기

### Git이 이미 설치되어 있다면

```powershell
cd C:\Users\<본인계정>\Documents
git clone <이-저장소-URL> counter
cd counter
```

### Git이 없다면

- 옵션 1: <https://git-scm.com/download/win> 에서 Git for Windows 설치 후 위 명령 실행
- 옵션 2: 저장소 페이지에서 **Code → Download ZIP** 을 눌러 zip 파일을 받은 뒤, `C:\Users\<본인계정>\Documents\counter` 같은 경로에 압축 해제
- 옵션 3: 소스가 이미 로컬에 있다면 해당 폴더로 이동

이후 작업은 모두 프로젝트 루트(`package.json`이 있는 폴더)에서 수행합니다.

## 3. 의존성 설치

프로젝트 루트에서:

```powershell
npm install
```

처음 실행하면 네트워크 상태에 따라 1~3분 정도 걸립니다. 완료되면 `node_modules` 폴더가 생성됩니다.

> **참고**: 이 프로젝트는 원래 pnpm으로 작성되었지만 npm으로도 동일하게 동작합니다. `package.json`의 `dependencies`와 `devDependencies`가 모두 설치됩니다.

### 설치 중 문제가 생긴다면

- **`npm : 이 시스템에서 스크립트를 실행할 수 없으므로...`** 오류:
  PowerShell에서 스크립트 실행이 막혀 있습니다. 관리자 PowerShell에서 한 번만 실행:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
- **프록시/사내망 환경**:
  ```powershell
  npm config set proxy http://<proxy-host>:<port>
  npm config set https-proxy http://<proxy-host>:<port>
  ```
- **캐시 꼬임**: `npm cache clean --force` 후 다시 `npm install`

## 4. 개발 서버 실행

```powershell
npm run start:dev
```

- 기본 포트는 **3000**입니다.
- 소스 코드를 수정하면 자동으로 재시작됩니다 (watch 모드).
- 콘솔에 `Nest application successfully started` 메시지가 나오면 준비 완료입니다.

### 다른 포트로 실행하고 싶다면

PowerShell에서 환경 변수와 함께 실행:

```powershell
$env:PORT=4000; npm run start:dev
```

## 5. 동작 확인

### 브라우저에서 Swagger UI 열기

<http://localhost:3000/api> 로 접속하면 모든 엔드포인트를 UI에서 바로 테스트할 수 있습니다.

### PowerShell에서 직접 호출

PowerShell의 `Invoke-RestMethod`(별칭 `irm`)를 사용합니다:

```powershell
# 현재 값 조회 (없으면 0)
irm http://localhost:3000/counter/visits

# 1 증가
irm -Method Post http://localhost:3000/counter/visits/increment

# 1 감소
irm -Method Post http://localhost:3000/counter/visits/decrement

# 초기화
irm -Method Post http://localhost:3000/counter/visits/reset
```

> **주의**: Windows PowerShell의 `curl`은 실제 curl이 아니라 `Invoke-WebRequest`의 별칭입니다. 위처럼 `irm`을 쓰거나, 진짜 curl이 필요하면 `curl.exe` 로 명시적으로 호출하세요.

## 6. 프로덕션 모드로 실행

빌드 후 컴파일된 JS로 실행합니다:

```powershell
npm run build
npm run start:prod
```

`dist\main.js`가 실행됩니다. watch 모드가 꺼져 있어 자원 사용이 적습니다.

## 7. 서버 종료

실행 중인 PowerShell 창에서 **Ctrl + C** 를 누릅니다. 종료 확인 메시지가 나오면 **Y** 입력.

## 8. 테스트 실행 (선택)

```powershell
npm test           # 단위 테스트
npm run test:e2e   # e2e 테스트
npm run test:cov   # 커버리지
```

---

## 폴더 구조

```
counter/
├─ src/
│  ├─ counter/
│  │  ├─ dto/counter.dto.ts     # Swagger 응답 DTO
│  │  ├─ counter.controller.ts  # REST 엔드포인트
│  │  ├─ counter.service.ts     # 인메모리 저장소 (Map)
│  │  └─ counter.module.ts
│  ├─ app.module.ts
│  └─ main.ts                   # Swagger 설정 포함
├─ package.json
└─ README.md
```

## 데이터 보존 주의

카운터 값은 프로세스 메모리(`Map`)에 저장됩니다. **서버를 재시작하면 모든 값이 사라집니다.** 영구 저장이 필요하면 파일/DB 저장소로 교체해야 합니다.
