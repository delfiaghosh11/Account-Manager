import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { accountProps } from "../types";

interface accountDetailsProps {
  account: accountProps;
}

const AccountDetails = ({ account }: accountDetailsProps): JSX.Element => {
  const { id, name, balance } = account;

  return (
    <Container fluid className="my-5">
      <Card style={{ width: "25rem" }}>
        <Card.Header>Account Details</Card.Header>
        <Card.Body>
          <Card.Text>
            <span>Hi,&nbsp;</span>
            <span style={{ fontWeight: "bold" }}>{name}</span>
          </Card.Text>
          <Card.Text>
            <span>You can see your account id & balance below -</span>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <span>Id:&nbsp;</span>
            <span style={{ fontWeight: "bold" }}>{id}</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Balance:&nbsp;</span>
            <span style={{ fontWeight: "bold" }}>Rs. {balance}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default AccountDetails;
