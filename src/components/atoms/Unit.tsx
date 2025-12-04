import { UnitVariant } from "../../constants/enum";
import theme from "../../constants/theme";
import styled from "styled-components";

//variant별 색상 설정
const colorMap: { [key in UnitVariant]: string } = {
  [UnitVariant.PLAYER]: theme.red,
  [UnitVariant.ENEMY]: theme.blue,
  [UnitVariant.COIN]: theme.gold,
};

const StyledUnit = styled.span<{ variant: UnitVariant }>`
  width: 20px;
  height: 20px;
  position: absolute;
  display: inline-block;
  background-color: ${(props) => colorMap[props.variant]};
  border-radius: ${(props) =>
    props.variant === UnitVariant.PLAYER ? "0%" : "50%"};
  border: 3px solid black;
  text-align: center;
`;

//Unit은 게임에 필요한 '말'을 의미함.
//variant는 '말'의 종류를 의미함. 예: player, enemy, coin 등
//variant의 크기는 모두 같음. 단, 색은 다름.
//variant는 enum으로 관리함.
//player만 네모, 나머지는 동그라미로 표시함.
export const Unit = ({
  variant,
  position,
}: {
  variant: UnitVariant;
  position: { x: number; y: number };
}) => {
  return (
    <StyledUnit
      variant={variant}
      style={{ left: position.x, top: position.y }}
    ></StyledUnit>
  );
};
