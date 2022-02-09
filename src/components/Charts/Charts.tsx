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

  const bar = (bankName: string, balance: number, y: number) => {
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

  const d3Chart = () => {
    const balances = banksWithTotalBalance.map(
      ({ totalBalance }) => totalBalance
    );

    const svgCanvas = d3
      .select(d3ChartDivRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 400);

    svgCanvas
      .selectAll("rect")
      .data(balances)
      .enter()
      .append("rect")
      .attr("width", 25)
      .attr("height", (datapoint) =>
        ((datapoint / maxBalance) * 100).toString().concat("%")
      )
      .attr("fill", "orange")
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", (datapoint) =>
        (((maxBalance - datapoint) / maxBalance) * 100).toString().concat("%")
      );

    // svgCanvas
    //   .selectAll("text")
    //   .data(balances)
    //   .enter()
    //   .append("text")
    //   .attr("x", (dataPoint, i) => i * 45 + 5)
    //   .attr("y", (dataPoint) =>
    //     (((maxBalance - dataPoint) / maxBalance) * 100 - 5)
    //       .toString()
    //       .concat("%")
    //   )
    //   .text((dataPoint) => dataPoint);
  };

  useEffect(() => {
    draw = SVG().addTo("#svg-chart").size("100%", 250);
    banksWithTotalBalance.forEach(
      ({ bankName, totalBalance }, index: number) => {
        bar(bankName, totalBalance, index * 50);
      }
    );

    d3Chart();
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
          <div ref={d3ChartDivRef}></div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Charts;
