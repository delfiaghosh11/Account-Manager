import { Container } from "react-bootstrap";

interface accountDetailsProps {
  id: string;
}

const AccountDetails = ({ id }: accountDetailsProps): JSX.Element => (
  <Container>
    <h6>Account Name: {id}</h6>
  </Container>
);

export default AccountDetails;
