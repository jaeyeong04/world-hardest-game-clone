import { useEffect } from "react";
import useCoinManager from "./useCoinManager";
import useEnemyManager from "./useEnemyManager";
import usePlayerMoves from "./usePlayerMoves";
import usePlayState from "./usePlayState";
import useScoreManager from "./useScoreManager";
import useTimer from "./useTimer";
import { GameState } from "../constants/enum";

/**
 * @description - useGame 훅은 게임의 상태를 관리하는 여러 커스텀 훅을 조합하여, 게임의 전체 상태를 한 번에 가져올 수 있도록 합니다.
 * @returns playState - 현재 게임 진행 상태 (게임 중, 게임 중단)
 * @returns startGame - 게임을 시작시키는 함수
 * @returns endGame - 게임을 종료시키는 함수
 * @returns time - 게임이 시작된 후 경과된 시간
 * @returns score - 현재 점수
 * @returns playerPosition - 플레이어의 현재 위치
 * @returns enemyPositionArray - 모든 적의 위치를 저장하는 배열
 * @returns coinPositionArray - 모든 코인의 위치를 저장하는 배열
 */

export default function useGame() {
  const { playState, startGame, endGame } = usePlayState();
  const { time, resetTimer } = useTimer(playState);
  const { score, increaseScore, resetScore } = useScoreManager();
  const { position, resetPlayerPosition } = usePlayerMoves(playState);
  const { enemyPositionArray, resetEnemyPositions } = useEnemyManager({
    playState,
    time,
    playerPosition: position,
    endGame,
  });
  const { coinPositions, resetCoinPositions } = useCoinManager({
    playState,
    time,
    playerPosition: position,
    onCoinCollected: () => increaseScore(),
  });
  useEffect(() => {
    if (playState === GameState.PLAYING) {
      resetTimer();
      resetScore();
      resetPlayerPosition();
      resetEnemyPositions();
      resetCoinPositions();
    }
  }, [playState]);

  return {
    playState,
    startGame,
    endGame,
    time,
    score,
    playerPosition: position,
    enemyPositionArray,
    coinPositionArray: coinPositions,
  };
}
