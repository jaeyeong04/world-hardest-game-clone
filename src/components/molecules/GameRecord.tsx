import { Text } from "../atoms/Text";
import { TextUsage } from "../../constants/enum";
import styled from "styled-components";

const GameRecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  align-items: center;
  justify-content: space-between;
`;

export const GameRecord = () => {
  return (
    <GameRecordContainer>
      <Text usage={TextUsage.LIVES}>Lives: 3</Text>
      <Text usage={TextUsage.SCORE}>Score: 100</Text>
      <Text usage={TextUsage.TIME}>Time: 00:45</Text>
    </GameRecordContainer>
  );
};
