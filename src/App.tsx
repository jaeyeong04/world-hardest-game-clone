import "./App.css";
import { Board } from "./components/atoms/Board";
import { Unit } from "./components/atoms/Unit";
import { UnitVariant } from "./constants/enum";
import { TextUsage } from "./constants/enum";
import { Text } from "./components/atoms/Text";

function App() {
  return (
    <div className="App">
      <Board />
      <Text usage={TextUsage.SCORE}>Score: 100</Text>
      <Text usage={TextUsage.LIVES}>Lives: 3</Text>
      <Text usage={TextUsage.STATUS}>Game Over!</Text>
      <Text usage={TextUsage.TIME}>Time: 00:45</Text>
      <Unit variant={UnitVariant.PLAYER} />
      <Unit variant={UnitVariant.ENEMY} />
      <Unit variant={UnitVariant.COIN} />
    </div>
  );
}

export default App;
