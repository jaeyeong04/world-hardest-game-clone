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
  background-color: ${(props) => colorMap[props.variant as UnitVariant]};
  border-radius: ${(props) =>
    props.variant === UnitVariant.PLAYER ? "0%" : "50%"};
  border: 3px solid black;
  text-align: center;
`;

/**
 * 게임의 최소 단위인 '말'을 렌더링하는 컴포넌트
 * - 모든 유닛은 동일한 크기를 가지며, variant에 따라 색상이 결정됨
 * - 'player'는 사각형, 그 외(enemy, coin 등)는 원형으로 표시됨
 * @param variant - 유닛의 종류 (UnitVariant enum 값)
 * @param position - 유닛의 위치 (x, y 좌표를 포함하는 객체)
 * @returns 게임 보드 위에 렌더링된 유닛 컴포넌트
 */
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
