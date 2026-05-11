import { useState } from "react";
import { GameState } from "../constants/enum";

/**
 * 게임 진행 상태를 관리하는 커스텀 훅
 * @returns playState - 현재 게임 진행 상태 (게임 중, 게임 중단)
 * @returns startGame - 게임을 시작시키는 함수
 * @returns endGame - 게임을 종료시키는 함수
 */

export default function usePlayState() {
  const [playState, setPlayState] = useState<GameState>(GameState.GAME_OVER);
  //startGame 함수는 게임을 시작할 때 호출 (시작 시 리셋)
  const startGame = () => {
    setPlayState(GameState.PLAYING);
  };
  //endGame 함수는 게임이 끝났을 때 호출 (게임 오버 상태로 전환)
  const endGame = () => {
    setPlayState(GameState.GAME_OVER);
  };
  return { playState, startGame, endGame };
}
