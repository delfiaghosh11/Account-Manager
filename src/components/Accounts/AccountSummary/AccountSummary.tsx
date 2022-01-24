import { useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

import AccountDetails from "../AccountDetails/AccountDetails";

const AccountSummary = (): JSX.Element => {
  const accounts = ["Axis", "ICICI"];
  const [accId, setAccId] = useState(accounts[0]);
  const { path, url } = useRouteMatch();

  return (
    <Router>
      <Tabs
        defaultActiveKey="Axis"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {accounts.map((account, index) => (
          <Tab
            eventKey={account}
            title={account}
            key={index}
            onClick={() => setAccId(account)}
          >
            <Link to={`${url}/details`}>{account}</Link>
          </Tab>
        ))}
      </Tabs>

      <Switch>
        <Route path={`${path}/details`}>
          <AccountDetails id={accId} />
        </Route>
      </Switch>
    </Router>
  );
};

export default AccountSummary;
