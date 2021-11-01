import "./App.css";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./components/UserAuth.jsx";

function App() {
  return (
    <switch>
      <Route exact path="/">
        <UserAuth />
      </Route>
    </switch>
  );
}

export default App;
