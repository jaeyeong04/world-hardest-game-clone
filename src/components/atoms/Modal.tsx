import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFrame = styled.div`
  position: absolute;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  z-index: 1000;
`;

export default function Modal({
  visible,
  children,
  style,
}: {
  visible: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  if (!visible) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalFrame style={style}>{children}</ModalFrame>
    </ModalBackground>
  );
}
