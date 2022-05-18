import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Login,Welcome} from "./components";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route path="/Welcome" component={Welcome} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;