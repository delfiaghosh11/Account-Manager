import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

import Dashboard from "./Dashboard/Dashboard";
import AccountSummary from "./Accounts/AccountSummary/AccountSummary";
import Charts from "./Charts/Charts";
import { banks } from "./mockData";

import "./App.css";

const App = (): JSX.Element => (
  <Router basename="/">
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Account Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/accounts">
            Accounts
          </Nav.Link>
          <Nav.Link as={Link} to="/charts">
            Charts
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Switch>
      <Route exact path="/">
        <Dashboard banks={banks} />
      </Route>
      <Route path="/accounts">
        <AccountSummary banks={banks} />
      </Route>
      <Route path="/charts">
        <Charts banks={banks} />
      </Route>
    </Switch>
  </Router>
);

export default App;
