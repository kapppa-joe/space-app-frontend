import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bulma/css/bulma.min.css";
import Login from "./components/Login.jsx";
import Onboarding from "./components/Onboarding";
import MissionControl from "./components/MissionControl";
import Planets from "./components/Planets";
import Loading from "./components/Loading";
import Acknowledgements from "./components/Acknowledgements";
import Page404 from "./components/Page404";
import SpaceStation from "./components/SpaceStation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="space" element={<Planets />}>
          <Route exact path=":space_object" element={<Planets />} />
        </Route>
        <Route exact path="onboarding" element={<Onboarding />} />
        <Route exact path="mission-control" element={<MissionControl />} />
        <Route exact path="loading" element={<Loading />} />
        <Route exact path="acknowledgements" element={<Acknowledgements />} />
        <Route exact path="iss-live" element={<SpaceStation />} />
        <Route element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
