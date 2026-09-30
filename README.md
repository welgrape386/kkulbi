
  # Website Builder

  This is a code bundle for Website Builder. The original project is available at https://www.figma.com/design/B2i1wU0k1lbWnWrAlujVf0/Website-Builder.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.


## 숨겨진 게임: 꿀도둑

홈의 바로가기 제목 옆 작은 꿀벌을 세 번 누르면 숲에 입장합니다.

- WASD 또는 방향키로 이동합니다. 모바일에서는 화면 아래 조작 버튼을 사용합니다.
- 벌집 근처에서 E를 1.4초 누르면 꿀을 채집합니다. 채집 중에는 움직일 수 없습니다.
- 벌은 순찰 → 의심 → 추격 → 복귀 상태를 가지며, 수풀에 숨거나 상점으로 피하면 추격을 끊습니다.
- 가방에는 꿀 12개까지 담고, 10개 이상이면 이동 속도가 조금 느려집니다.
- 상점에서 E를 누르면 꿀 한 개당 20 꿀머니로 전부 판매합니다.
- 체력을 모두 잃으면 상점으로 돌아오며, 가방 속 꿀만 잃습니다. 판매한 수입은 유지됩니다.
- 한 판은 실제 시간 120초입니다. 종료 시 미판매 꿀은 수입에 포함되지 않습니다.
- 닉네임별 한 판 최고 수입을 기록합니다. 기존 클릭커 기록은 기존 테이블에 보존하며 새 게임은 `honey_leaderboard_v1` 테이블을 사용합니다.

게임은 발견할 때만 별도 번들로 로드됩니다. 외부 게임 엔진이나 이미지 다운로드 없이 Canvas에 픽셀 그래픽을 그립니다.

### 검증

```sh
npm ci
npm run build
node --test tests/honey-game.test.mjs
```

랭킹은 기존 Neon 환경변수 `POSTGRES_URL` 또는 `DATABASE_URL`을 사용합니다. 서버 연결에 실패해도 게임 자체는 플레이할 수 있습니다. 현재 점수 등록은 클라이언트 수입 값을 받는 방식이므로 서버 권위의 부정행위 방지 기능은 제공하지 않습니다.
