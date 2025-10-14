import "./App.css";
import { Board } from "./components/atoms/Board";
import { Unit } from "./components/atoms/Unit";
import { UnitVariant } from "./constants/enum";
import { TextUsage } from "./constants/enum";
import { Text } from "./components/atoms/Text";
import { GameRecord } from "./components/molecules/GameRecord";

function App() {
  return (
    <div className="App">
      <GameRecord />
      <Board />
      <Unit variant={UnitVariant.PLAYER} />
      <Unit variant={UnitVariant.ENEMY} />
      <Unit variant={UnitVariant.COIN} />
    </div>
  );
}

export default App;
