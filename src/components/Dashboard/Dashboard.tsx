import { Container } from "react-bootstrap";
import { bankProps } from "../types";

interface dashboardProps {
  banks: bankProps[];
}

const Dashboard = ({ banks }: dashboardProps): JSX.Element => (
  <Container className="my-5">
    {banks.map(
      ({ bankId, bankName, displayName, description, logo }: bankProps) => (
        <div
          key={`bank-${bankId}`}
          className="d-flex align-items-center my-3 border"
        >
          <div className="flex-shrink-0 border-end">
            <img
              src={logo}
              alt={bankName}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="flex-grow-1 ms-3 text-truncate">
            <div className="fw-bold mb-1">{displayName}</div>
            <div className="mr-2 text-truncate">{description}</div>
          </div>
        </div>
      )
    )}
  </Container>
);

export default Dashboard;
