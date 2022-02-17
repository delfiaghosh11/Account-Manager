import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";
import { Container, Row } from "react-bootstrap";
import { bankProps, accountProps } from "../types";

interface chartsProps {
  banks: bankProps[];
}

const Charts = ({ banks }: chartsProps): JSX.Element => {
  const banksWithTotalBalance = banks.map((bank: bankProps) => {
    const { accounts } = bank;

    return {
      ...bank,
      totalBalance: accounts
        .map(({ accBalance }: accountProps) => accBalance)
        .reduce((prev: number, curr: number) => prev + curr),
    };
  });

  return (
    <Container fluid className="my-5">
      <Row xs={1} md={2} lg={3} className="g-4 mb-5">
        <BarChart banks={banksWithTotalBalance} />
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        <PieChart banks={banksWithTotalBalance} />
      </Row>
    </Container>
  );
};

export default Charts;
