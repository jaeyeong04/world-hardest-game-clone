import { GameState, UnitVariant } from "../../constants/enum";
import useGame from "../../hooks/useGame";
import { Board } from "../atoms/Board";
import { Unit } from "../atoms/Unit";
import { GameRecord } from "../molecules/GameRecord";
import styled from "styled-components";
import GameRecordModal from "../molecules/GameRecordModal";

const GamePlayAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GamePlayArea = () => {
  const {
    playState,
    startGame,
    endGame,
    time,
    score,
    playerPosition,
    enemyPositionArray,
    coinPositionArray,
    handleStart,
  } = useGame();
  return (
    <GamePlayAreaContainer>
      <GameRecord time={time} score={score} />
      <Board>
        <Unit variant={UnitVariant.PLAYER} position={playerPosition} />
        {enemyPositionArray.map((enemyPos, index) => (
          <Unit key={index} variant={UnitVariant.ENEMY} position={enemyPos} />
        ))}
        {coinPositionArray.map((coinPos, index) => (
          <Unit key={index} variant={UnitVariant.COIN} position={coinPos} />
        ))}
      </Board>
      <GameRecordModal
        visible={playState === GameState.GAME_OVER}
        onClickStart={handleStart}
        time={time}
        score={score}
      />
    </GamePlayAreaContainer>
  );
};
