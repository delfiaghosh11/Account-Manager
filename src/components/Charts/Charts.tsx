import { useEffect, useRef } from "react";
import { Container, Card } from "react-bootstrap";
import { bankProps, accountProps } from "../types";
import { colors } from "../colors";
import { Number, Svg, SVG } from "@svgdotjs/svg.js";
import * as d3 from "d3";

interface chartsProps {
  banks: bankProps[];
}

const Charts = ({ banks }: chartsProps): JSX.Element => {
  const d3ChartDivRef = useRef(null);
  const banksWithTotalBalance = banks.map((bank: bankProps) => {
    const { accounts } = bank;

    return {
      ...bank,
      totalBalance: accounts
        .map(({ accBalance }: accountProps) => accBalance)
        .reduce((prev: number, curr: number) => prev + curr),
    };
  });

  const maxBalance = Math.max(
    ...banksWithTotalBalance.map(({ totalBalance }) => totalBalance)
  );

  let draw: Svg;

  const svgBarChart = (bankName: string, balance: number, y: number) => {
    draw.text(bankName).move(0, y).font({ size: 16 }).fill(colors.black);

    const width = new Number(balance).divide(maxBalance * 1.5).convert("%");

    draw
      .rect(width as any, 25)
      .y(y + 22)
      .fill(colors.greenyellow);

    draw
      .text(balance.toString())
      .ax(width.plus("1%").toString())
      .y(y + 20)
      .font({ size: 14 })
      .fill("#666");
  };

  const d3BarChart = () => {
    const balances = banksWithTotalBalance.map(
      ({ totalBalance }) => totalBalance
    );
    const bankNames = banksWithTotalBalance.map(({ bankName }) => bankName);

    const scale = 1.5;
    const width = (data: number, shift: number) =>
      (((data / maxBalance) * 100) / scale + shift).toString().concat("%");

    const svgCanvas = d3
      .select(d3ChartDivRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 250);

    svgCanvas
      .selectAll("text #bankName")
      .data(bankNames)
      .enter()
      .append("text")
      .attr("y", (dp, itr) => itr * 50 + 20)
      .text((dp) => dp)
      .attr("font-size", 16)
      .attr("fill", colors.black);

    svgCanvas
      .selectAll("rect")
      .data(balances)
      .enter()
      .append("rect")
      .attr("width", (datapoint) => width(datapoint, 0))
      .attr("height", 25)
      .attr("fill", colors.darkcyan)
      .attr("y", (datapoint, iteration) => iteration * 50 + 22);

    svgCanvas
      .selectAll("text #balance")
      .data(balances)
      .enter()
      .append("text")
      .attr("x", (dataPoint) => width(dataPoint, 1))
      .attr("y", (dataPoint, i) => i * 50 + 37)
      .text((dataPoint) => dataPoint)
      .attr("font-size", 14)
      .attr("fill", "#666");
  };

  useEffect(() => {
    draw = SVG().addTo("#svg-chart").size("100%", 250);
    banksWithTotalBalance.forEach(
      ({ bankName, totalBalance }, index: number) => {
        svgBarChart(bankName, totalBalance, index * 50);
      }
    );

    d3BarChart();
  }, [banksWithTotalBalance]);

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Header as="h5">SVG.js Chart</Card.Header>
        <Card.Body>
          <Card.Title as="h6" className="border-bottom">
            <div className="mb-1">Total Bank Balances</div>
          </Card.Title>
          <div id="svg-chart"></div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as="h5">D3.js Chart</Card.Header>
        <Card.Body>
          <Card.Title as="h6" className="border-bottom">
            <div className="mb-1">Total Bank Balances</div>
          </Card.Title>
          <div id="d3-chart" ref={d3ChartDivRef}></div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Charts;
