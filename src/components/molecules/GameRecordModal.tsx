import { Button } from "../atoms/Button";
import Modal from "../atoms/Modal";

export default function GameRecordModal({
  visible,
  onClickStart,
  time,
  score,
}: {
  visible: boolean;
  onClickStart: () => void;
  time: number;
  score: number;
}) {
  return (
    <Modal visible={visible}>
      <h1>Game Record</h1>
      <h3>Play Time: {time.toFixed(2)} seconds</h3>
      <h3>Score: {score}</h3>
      <Button onClick={onClickStart}>Start</Button>
    </Modal>
  );
}
