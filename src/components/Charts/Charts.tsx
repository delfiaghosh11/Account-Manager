import BarChart from "./BarChart/BarChart";
import { Container, Row } from "react-bootstrap";
import { bankProps } from "../types";

interface chartsProps {
  banks: bankProps[];
}

const Charts = ({ banks }: chartsProps): JSX.Element => (
  <Container fluid className="my-5">
    <Row xs={1} md={2} lg={2} className="g-4">
      <BarChart banks={banks} />
    </Row>
  </Container>
);

export default Charts;
