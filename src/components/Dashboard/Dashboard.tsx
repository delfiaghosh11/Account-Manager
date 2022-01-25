import { Container, Card, Row, Col } from "react-bootstrap";
import { accountProps } from "../Accounts/types";

interface dashboardProps {
  accounts: accountProps[];
}

const Dashboard = ({ accounts }: dashboardProps): JSX.Element => (
  <Container className="my-5">
    <Row>
      {accounts.map(
        ({ logo, bank, name, balance }: accountProps, index: number) => (
          <Col
            lg={3}
            md={6}
            sm={12}
            className="my-3 mx-lg-4"
            key={`column-account-${index}`}
          >
            <Card
              className="mx-auto"
              style={{ width: "18rem", height: "28rem" }}
              key={`bank-account-${index}`}
            >
              <Card.Img
                variant="top"
                src={logo}
                style={{ width: "286px", height: "286px" }}
              />
              <Card.Body>
                <Card.Title>{bank}</Card.Title>
                <Card.Text>
                  <span>Account Holder:&nbsp;</span>
                  <span style={{ fontWeight: "bold" }}>{name}</span>
                </Card.Text>
                <Card.Text>
                  <span>Balance:&nbsp;</span>
                  <span style={{ fontWeight: "bold" }}>Rs. {balance}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      )}
    </Row>
  </Container>
);

export default Dashboard;
