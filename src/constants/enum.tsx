/**
 * @file enum.tsx
 * @description 게임에서 사용되는 다양한 열거형(enum)과 인터페이스를 정의하는 파일
 */

/**
 * 게임에서 사용되는 유닛의 종류를 나타내는 열거형(enum)
 * - PLAYER: 플레이어 캐릭터
 * - ENEMY: 적 캐릭터
 * - COIN: 수집 가능한 아이템
 */
export enum UnitVariant {
  PLAYER = "player",
  ENEMY = "enemy",
  COIN = "coin",
}

/**
 * 게임에서 사용되는 텍스트의 용도를 나타내는 열거형(enum)
 * - SCORE: 점수 표시
 * - LIVES: 남은 목숨 표시
 * - STATUS: 게임 상태 표시 (예: "Game Over", "You Win" 등)
 * - TIME: 경과 시간 표시
 */
export enum TextUsage {
  SCORE = "score",
  LIVES = "lives",
  STATUS = "status",
  TIME = "time",
}

/**
 * 게임에서 사용되는 키 코드를 나타내는 열거형(enum)
 * - UP: 위쪽 화살표 키
 * - DOWN: 아래쪽 화살표 키
 * - LEFT: 왼쪽 화살표 키
 * - RIGHT: 오른쪽 화살표 키
 */
export enum KeyCode {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
}

/**
 * 게임에서 사용되는 위치 정보를 나타내는 인터페이스
 * - x: x 좌표 (수평 위치)
 * - y: y 좌표 (수직 위치)
 */
export interface Position {
  x: number;
  y: number;
}

export enum GameState {
  PLAYING = "playing",
  GAME_OVER = "game_over",
  HOME_SCREEN = "home_screen",
}
