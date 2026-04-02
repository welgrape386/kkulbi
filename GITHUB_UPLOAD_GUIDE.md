# GitHub 업로드 가이드

## 1. GitHub 레포지토리 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 `+` 버튼 클릭 → `New repository` 선택
3. Repository 정보 입력:
   - **Repository name**: `ggulbee-forest-wiki` (원하는 이름)
   - **Description**: `꿀비의 숲 마인크래프트 서버 위키`
   - **Public** 또는 **Private** 선택
   - ⚠️ **Add a README file 체크하지 않기** (이미 프로젝트에 파일이 있으므로)
4. `Create repository` 클릭

## 2. 로컬에서 Git 초기화 및 업로드

### 방법 1: 터미널 사용 (추천)

프로젝트 폴더에서 터미널을 열고 다음 명령어를 순서대로 실행:

```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋 생성
git commit -m "Initial commit: 꿀비의 숲 위키 프로젝트"

# GitHub 레포지토리 연결 (YOUR_USERNAME과 YOUR_REPO를 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# main 브랜치로 변경
git branch -M main

# GitHub에 업로드
git push -u origin main
```

### 방법 2: GitHub Desktop 사용 (초보자 추천)

1. [GitHub Desktop](https://desktop.github.com/) 다운로드 및 설치
2. GitHub Desktop 실행 → 로그인
3. `File` → `Add Local Repository` 클릭
4. 프로젝트 폴더 선택
5. `Publish repository` 클릭
6. Repository 이름 확인 후 `Publish Repository` 클릭

## 3. 코드 수정 후 업데이트하기

### 터미널 사용

```bash
# 변경된 파일 확인
git status

# 모든 변경사항 추가
git add .

# 커밋 메시지와 함께 저장
git commit -m "설명: 어떤 변경을 했는지 간단히 작성"

# GitHub에 업로드
git push
```

### GitHub Desktop 사용

1. GitHub Desktop에서 변경된 파일 확인
2. 좌측 하단에 커밋 메시지 입력
3. `Commit to main` 클릭
4. 상단의 `Push origin` 클릭

## 4. 커밋 메시지 예시

```bash
git commit -m "feat: 시세표 페이지 배경색 및 border 수정"
git commit -m "fix: 헤더 로고 이미지 변경"
git commit -m "style: 전체 페이지 배경색 통일"
git commit -m "docs: README 업데이트"
```

## 5. 자주 사용하는 Git 명령어

```bash
# 현재 상태 확인
git status

# 변경사항 확인
git diff

# 커밋 히스토리 보기
git log

# 원격 저장소 정보 확인
git remote -v

# 최신 코드 받아오기
git pull
```

## 6. GitHub Pages로 웹사이트 배포하기 (선택사항)

1. GitHub 레포지토리 페이지에서 `Settings` 클릭
2. 좌측 메뉴에서 `Pages` 클릭
3. `Source`에서 `GitHub Actions` 선택
4. 프로젝트에 `.github/workflows/deploy.yml` 파일 생성 (아래 내용)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

5. 이 파일을 커밋하고 푸시하면 자동으로 배포됩니다
6. `https://YOUR_USERNAME.github.io/YOUR_REPO/` 에서 접속 가능

## 7. .gitignore 파일 확인

다음 파일들이 GitHub에 올라가지 않도록 `.gitignore` 파일을 확인하세요:

```
node_modules/
dist/
.env
.DS_Store
*.log
```

## 문제 해결

### "fatal: remote origin already exists" 에러
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### 인증 오류 (Username/Password)
GitHub는 비밀번호 대신 **Personal Access Token**을 사용합니다:
1. GitHub → Settings → Developer settings → Personal access tokens
2. `Generate new token` 클릭
3. 필요한 권한 선택 (repo 전체 선택 추천)
4. 생성된 토큰을 복사하여 비밀번호 대신 사용

## 추가 리소스

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub 가이드](https://docs.github.com/ko)
- [GitHub Desktop 가이드](https://docs.github.com/ko/desktop)
