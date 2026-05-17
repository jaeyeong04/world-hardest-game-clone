# World-Hardest-Game-Clone

> 클린코드를 목적으로 한 개인 토이 프로젝트입니다.

- 배포 주소: https://jaeyeong04.github.io/world-hardest-game-clone/

<img width="300" height="300" alt="Image" src="https://github.com/user-attachments/assets/d3050c99-4be4-453c-b7f3-91ebc90ade42" />

---

> 해당 프로젝트에 대한 회고록은 아래 블로그 주소에 작성해두었습니다.

- 블로그 글에는 프로젝트 일정, 목적, 프로젝트와 관련된 테크블로그 링크 등이 포함되어있습니다.
- [[프로젝트 회고] World Hardest Game Clone](https://jaeyeong04.tistory.com/28)

---

## 실행 방법

```
git clone https://github.com/jaeyeong04/world-hardest-game-clone.git
npm install
npm start
```

---

## 기술 스택

#### 프론트엔드
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

- Atomic Design Pattern을 일부 적용하여 컴포넌트의 재사용성을 고려하여 설계함
- 로직마다 커스텀훅을 분리하여 코드 가독성을 개선시키려고 노력함

<img src="https://img.shields.io/badge/styled--components-DB7093?style=flat&logo=styled-components&logoColor=white">

- Styled component와 props를 이용하여 개별 스타일링이 가능한 컴포넌트를 설계함

---

## 주요 기능

- 방향키를 이용한 플레이어(빨간 네모) 이동하는 기능
- 적 유닛(파란 원)이 랜덤한 방향/속도로 이동하며, 시간이 지남에 따라 적이 추가되는 기능
- 코인(노란 원) 스폰과 코인 획득 시 점수 오르는 기능. 코인을 랜덤한 위치에 스폰시키는 기능

---

## 프로젝트 구조

```
📦 
├─ .gitignore
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ atoms
│  │  │  ├─ Board.tsx
│  │  │  ├─ Button.tsx
│  │  │  ├─ Modal.tsx
│  │  │  ├─ Text.tsx
│  │  │  └─ Unit.tsx
│  │  ├─ molecules
│  │  │  ├─ GameRecord.tsx
│  │  │  └─ GameRecordModal.tsx
│  │  └─ organisms
│  │     └─ GamePlayArea.tsx
│  ├─ constants
│  │  ├─ constants.tsx
│  │  ├─ enum.tsx
│  │  └─ theme.tsx
│  ├─ hooks
│  │  ├─ useCoinManager.tsx
│  │  ├─ useEnemyManager.tsx
│  │  ├─ useGame.tsx
│  │  ├─ useGameLoop.tsx
│  │  ├─ usePlayState.tsx
│  │  ├─ usePlayerMoves.tsx
│  │  ├─ useScoreManager.tsx
│  │  └─ useTimer.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ react-app-env.d.ts
│  └─ utils
│     └─ utils.ts
└─ tsconfig.json
```

---

