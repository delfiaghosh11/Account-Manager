import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import AccountSummary from "./Accounts/AccountSummary/AccountSummary";

import "./App.css";

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/account">Accounts</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/account">
          <AccountSummary />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
