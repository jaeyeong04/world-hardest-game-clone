import styled from "styled-components";
import { TextUsage } from "../../constants/enum";

const FontMap: {
  [key in TextUsage]: { fontWeight: string; fontSize: string };
} = {
  [TextUsage.SCORE]: { fontWeight: "bold", fontSize: "40px" },
  [TextUsage.LIVES]: { fontWeight: "normal", fontSize: "20px" },
  [TextUsage.STATUS]: { fontWeight: "normal", fontSize: "18px" },
  [TextUsage.TIME]: { fontWeight: "bold", fontSize: "16px" },
};

const StyledText = styled.div<{ usage: TextUsage }>`
  font-weight: ${(props) => FontMap[props.usage as TextUsage].fontWeight};
  font-size: ${(props) => FontMap[props.usage as TextUsage].fontSize};
`;

export const Text = ({
  usage,
  children,
}: {
  usage: TextUsage;
  children: React.ReactNode;
}) => {
  return <StyledText usage={usage}>{children}</StyledText>;
};
