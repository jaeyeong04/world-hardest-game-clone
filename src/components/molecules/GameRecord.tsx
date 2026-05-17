import { Text } from "../atoms/Text";
import { TextUsage } from "../../constants/enum";
import styled from "styled-components";
import useTimer from "../../hooks/useTimer";
import { useEffect } from "react";

const GameRecordContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  align-items: center;
  justify-content: space-between;
`;

//time을 화면에 표시하기 위해 format하는 함수
//time은 초 단위로 저장되어 있으므로, ss.ms 형식으로 변환하여 표시
const formatTime = (time: number) => {
  const seconds = Math.floor(time);
  const milliseconds = Math.floor((time - seconds) * 100);
  return `${seconds}:${milliseconds.toString().padStart(2, "0")}`;
};

export const GameRecord = ({
  time,
  score,
}: {
  time: number;
  score: number;
}) => {
  return (
    <GameRecordContainer>
      <Text usage={TextUsage.SCORE}>Score: {score}</Text>
      <Text usage={TextUsage.TIME}>Time: {formatTime(time)}</Text>
    </GameRecordContainer>
  );
};
