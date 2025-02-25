# 🏛️ EUM Law API - Node.js Express 기반 프로젝트

## 1. Install Packages (패키지 설치)
프로젝트를 설정하려면 아래 명령어를 순서대로 실행하세요.
# 1️⃣ 프로젝트 폴더 생성 및 이동
mkdir eum_law
cd eum_law
# 2️⃣ Node.js 초기화
npm init -y
# 3️⃣ 필요한 패키지 설치
npm install axios express request
# 4️⃣ 개발용 TypeScript 패키지 설치
npm install --save-dev @types/node

## 2. Test Link (테스트 링크)
https://eum-law-rbbf.vercel.app/https://api.eum.go.kr/web/Rest/OP/searchZone&


## 3. GitHub 연동하기
# 1️⃣ Git 초기화
git init
# 2️⃣ 파일 추가
git add .
# 3️⃣ 첫 번째 커밋
git commit -m "커밋 첫 프로젝트"
# 4️⃣ 원격 저장소 연결
git remote add origin https://github.com/사용자명/eum_law.git
# 5️⃣ GitHub로 코드 푸시
git push -u origin main


## 4. Vercel 배포하기 (Deploy)
# 1️⃣ Vercel CLI 설치 (한 번만 실행)
npm install -g vercel
# 2️⃣ Vercel 로그인
vercel login
# 3️⃣ Vercel 프로젝트 배포
vercel --prod
