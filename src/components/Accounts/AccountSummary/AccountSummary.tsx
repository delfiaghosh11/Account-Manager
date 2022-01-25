import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Container } from "react-bootstrap";

import AccountDetails from "../AccountDetails/AccountDetails";
import { accountProps } from "../types";

interface accountSummaryProps {
  accounts: accountProps[];
}

const AccountSummary = ({ accounts }: accountSummaryProps): JSX.Element => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string | null>(location.hash);

  const handleSelect = (e: string | null) => setSelectedTab(e);

  return (
    <Container fluid>
      <Tabs
        id="accounts-tab"
        className="mb-3 my-2"
        activeKey={selectedTab ? selectedTab : 1}
        onSelect={(e: string | null) => handleSelect(e)}
      >
        {accounts.map((account, index) => (
          <Tab
            eventKey={account.id}
            title={account.bank}
            key={`account-${index}`}
          >
            <AccountDetails account={account} />
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default AccountSummary;
