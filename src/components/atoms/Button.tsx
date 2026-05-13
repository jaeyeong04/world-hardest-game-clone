import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid black;
  background-color: white;
  font-size: 30px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
`;

/**
 * @params text - button text
 * @returns button element w/ text
 */

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
