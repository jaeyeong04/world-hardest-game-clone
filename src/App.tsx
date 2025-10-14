import "./App.css";
import { Unit } from "./components/atoms/Unit";
import { UnitVariant } from "./constants/enum";

function App() {
  return (
    <div className="App">
      <Unit variant={UnitVariant.PLAYER} />
      <Unit variant={UnitVariant.ENEMY} />
      <Unit variant={UnitVariant.COIN} />
    </div>
  );
}

export default App;
