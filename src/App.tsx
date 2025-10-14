import "./App.css";
import { Board } from "./components/atoms/Board";
import { Unit } from "./components/atoms/Unit";
import { UnitVariant } from "./constants/enum";

function App() {
  return (
    <div className="App">
      <Board />
      <Unit variant={UnitVariant.PLAYER} />
      <Unit variant={UnitVariant.ENEMY} />
      <Unit variant={UnitVariant.COIN} />
    </div>
  );
}

export default App;
