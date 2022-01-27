import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

import Dashboard from "./Dashboard/Dashboard";
import AccountSummary from "./Accounts/AccountSummary/AccountSummary";
import { banks } from "./mockData";

import "./App.css";

const App = (): JSX.Element => (
  <Router>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Account Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Dashboard</Nav.Link>
          <Nav.Link href="/accounts">Accounts</Nav.Link>
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
    </Switch>
  </Router>
);

export default App;
