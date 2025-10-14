import { UnitVariant } from "../../constants/enum";
import theme from "../../constants/theme";

//variant별 색상 설정
const colorMap: { [key in UnitVariant]: string } = {
  [UnitVariant.PLAYER]: theme.red,
  [UnitVariant.ENEMY]: theme.blue,
  [UnitVariant.COIN]: theme.gold,
};

//Unit은 게임에 필요한 '말'을 의미함.
//variant는 '말'의 종류를 의미함. 예: player, enemy, coin 등
//variant의 크기는 모두 같음. 단, 색은 다름.
//variant는 enum으로 관리함.
//player만 네모, 나머지는 동그라미로 표시함.
export const Unit = ({ variant }: { variant: UnitVariant }) => {
  const style = {
    width: "20px",
    height: "20px",
    display: "inline-block",
    backgroundColor: colorMap[variant],
    borderRadius: variant === UnitVariant.PLAYER ? "0%" : "50%",
    border: "3px solid black",
    textAlign: "center" as const,
  };
  return <span style={style}></span>;
};
