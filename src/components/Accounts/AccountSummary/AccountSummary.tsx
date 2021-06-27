import { useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import AccountDetails from "../AccountDetails/AccountDetails";

const AccountSummary = (): JSX.Element => {
  const accounts = ["Cashedge", "Fiserv"];
  const [accId, setAccId] = useState(accounts[0]);
  const { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/summary`}>
          <AccountDetails id={accId} />
        </Route>
        <Route path={path}>
          <h2>Account Summary</h2>
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>
                <Link to={`${url}/summary`} onClick={() => setAccId(account)}>
                  {account}
                </Link>
              </li>
            ))}
          </ul>
        </Route>
      </Switch>
    </div>
  );
};

export default AccountSummary;
