import "./App.css";
import { Switch, Route } from "react-router-dom";
import Background from "./components/Background";
import Login from "./components/Login.jsx";
import Onboarding from "./components/Onboarding";
import MissionControl from "./components/MissionControl";
import SolarSystem from "./components/SolarSystem";
import Planets from "./components/Planets";

function App() {
  return (
    <Background>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/onboarding">
          <Onboarding />
        </Route>
        <Route exact path="/mission-control">
          <MissionControl />
        </Route>
        <Route exact path="/solar-system">
          <SolarSystem />
        </Route>
        <Route exact path="/space/:planet_id">
          <Planets />
        </Route>
      </Switch>
    </Background>
  );
}

export default App;
