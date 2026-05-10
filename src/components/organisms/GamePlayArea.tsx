import { UnitVariant } from "../../constants/enum";
import useGame from "../../hooks/useGame";
import { Board } from "../atoms/Board";
import { Unit } from "../atoms/Unit";
import { GameRecord } from "../molecules/GameRecord";
import styled from "styled-components";

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
    </GamePlayAreaContainer>
  );
};
