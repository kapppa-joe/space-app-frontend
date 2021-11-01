import "./App.css";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./components/UserAuth.jsx";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <UserAuth />
      </Route>
    </Switch>
  );
}

export default App;
