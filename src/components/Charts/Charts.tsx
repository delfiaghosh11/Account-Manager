import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { bankProps, accountProps } from "../types";
import { colors } from "../colors";
import { Number, Svg, SVG } from "@svgdotjs/svg.js";

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

  let draw: Svg;

  const bar = (bankName: string, balance: number, y: number) => {
    const maxBalance = Math.max(
      ...banksWithTotalBalance.map(({ totalBalance }) => totalBalance)
    );

    draw.text(bankName).move(0, y).font({ size: 16 }).fill(colors.black);

    const width = new Number(balance).divide(maxBalance).convert("%");

    draw
      .rect(width as any, 25)
      .y(y + 22)
      .fill(colors.aqua);
    draw
      .text((add) => {
        add.tspan(balance.toString());
      })
      .move(width.plus("1%"), y + 20)
      .font({ size: 14 })
      .fill("#666");
  };

  useEffect(() => {
    draw = SVG().addTo("#drawing").size("100%", 250);
    banksWithTotalBalance.forEach(
      ({ bankName, totalBalance }, index: number) => {
        bar(bankName, totalBalance, index * 50);
      }
    );
  }, []);

  return (
    <Container className="my-5">
      <div id="drawing"></div>
    </Container>
  );
};

export default Charts;
