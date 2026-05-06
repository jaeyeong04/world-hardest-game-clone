import { UnitVariant } from "../../constants/enum";
import useCoinManager from "../../hooks/useCoinManager";
import useEnemyMoves from "../../hooks/useEnemyMoves";
import usePlayerMoves from "../../hooks/usePlayerMoves";
import useScoreManager from "../../hooks/useScoreManager";
import useTimer from "../../hooks/useTimer";
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
  const playerPosition = usePlayerMoves();
  const time = useTimer();
  const enemyPositionArray = useEnemyMoves(time);
  const coinPositionArray = useCoinManager({
    time,
    playerPosition,
    onCoinCollected: () => increaseScore(),
  });
  const { score, increaseScore } = useScoreManager();
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
