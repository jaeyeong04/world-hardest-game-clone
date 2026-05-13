import "./App.css";
import { Board } from "./components/atoms/Board";
import { Unit } from "./components/atoms/Unit";
import { UnitVariant } from "./constants/enum";
import { GameRecord } from "./components/molecules/GameRecord";
import { GamePlayArea } from "./components/organisms/GamePlayArea";

function App() {
  return (
    <div className="App">
      <GamePlayArea />
    </div>
  );
}

export default App;
