import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

import Dashboard from "./Dashboard/Dashboard";
import AccountSummary from "./Accounts/AccountSummary/AccountSummary";

import "./App.css";

const App = (): JSX.Element => (
  <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">React-App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Dashboard</Nav.Link>
          <Nav.Link href="/account">Accounts</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/account">
        <AccountSummary />
      </Route>
    </Switch>
  </Router>
);

export default App;
