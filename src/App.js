import "./App.css";
import { Switch, Route } from "react-router-dom";
import "bulma/css/bulma.min.css";
import Background from "./components/Background";
import Login from "./components/Login.jsx";
import Onboarding from "./components/Onboarding";
import MissionControl from "./components/MissionControl";
import SolarSystem from "./components/SolarSystem";
import Planets from "./components/Planets";
import Loading from "./components/Loading";
import Acknowledgements from "./components/Acknowledgements";

function App() {
  return (
    <div className="App">
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
          <Route exact path="/space/:space_object">
            <Planets />
          </Route>
          <Route exact path="/loading">
            <Loading />
          </Route>
          <Route exact path="/acknowledgements">
            <Acknowledgements />
          </Route>
        </Switch>
      </Background>
    </div>
  );
}

export default App;
