import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "react-bootstrap";
import { accountProps } from "../../types";

interface accountDetailsProps {
  accounts: accountProps[];
}

const AccountDetails = ({ accounts }: accountDetailsProps): JSX.Element => (
  <Container fluid className="my-5">
    <Row xs={1} sm={1} md={2} lg={3} className="g-4">
      {accounts.map(
        ({ accId, accHolderName, displayAccBalance }: accountProps) => (
          <Col key={`column-account-${accId}`}>
            <Card className="mx-auto" key={`account-card-${accId}`}>
              <Card.Header>Account Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <span>Hi,&nbsp;</span>
                  <span className="fw-bold">{accHolderName}</span>
                </Card.Text>
                <Card.Text>
                  <span>You can see your account id & balance below -</span>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <span>Id:&nbsp;</span>
                  <span className="fw-bold">{accId}</span>
                </ListGroupItem>
                <ListGroupItem>
                  <span>Balance:&nbsp;</span>
                  <span className="fw-bold">Rs. {displayAccBalance}</span>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        )
      )}
    </Row>
  </Container>
);

export default AccountDetails;
