import styled from "styled-components";

const BoardContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border: 3px solid black;
`;

export const Board = ({ children }: { children: React.ReactNode }) => {
  return <BoardContainer>{children}</BoardContainer>;
};
