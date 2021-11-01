import "./App.css";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./components/UserAuth.jsx";
import Onboarding from "./components/Onboarding";
import MissionControl from "./components/MissionControl";
import SolarSystem from "./components/SolarSystem";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <UserAuth />
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
      <Route exact path="/planets/:planet_id">
        <SolarSystem />
      </Route>
    </Switch>
  );
}

export default App;
