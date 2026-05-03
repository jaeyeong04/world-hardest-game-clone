import { UnitVariant } from "../../constants/enum";
import useEnemyMoves from "../../hooks/useEnemyMoves";
import usePlayerMoves from "../../hooks/usePlayerMoves";
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
  const PlayerPosition = usePlayerMoves();
  const time = useTimer();
  const enemyPositionArray = useEnemyMoves(time);
  return (
    <GamePlayAreaContainer>
      <GameRecord time={time} />
      <Board>
        <Unit variant={UnitVariant.PLAYER} position={PlayerPosition} />
        {enemyPositionArray.map((enemyPos, index) => (
          <Unit key={index} variant={UnitVariant.ENEMY} position={enemyPos} />
        ))}
      </Board>
    </GamePlayAreaContainer>
  );
};
