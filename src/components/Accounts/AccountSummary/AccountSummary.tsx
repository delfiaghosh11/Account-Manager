import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Container } from "react-bootstrap";

import AccountDetails from "../AccountDetails/AccountDetails";
import { bankProps } from "../../types";

interface accountSummaryProps {
  banks: bankProps[];
}

const AccountSummary = ({ banks }: accountSummaryProps): JSX.Element => {
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
        {banks.map(({ bankId, bankName, accounts }: bankProps) => (
          <Tab eventKey={bankId} title={bankName} key={`bank-tab-${bankId}`}>
            <AccountDetails accounts={accounts} />
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default AccountSummary;
