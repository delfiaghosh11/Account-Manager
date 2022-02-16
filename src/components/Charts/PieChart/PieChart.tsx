import { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { bankProps } from "../../types";
import { colors } from "../../colors";
// import * as d3 from "d3";

interface barChartProps {
  banks: bankProps[];
}

const PieChart = ({ banks }: barChartProps): JSX.Element => {
  let cumulativePercent = 0;

  const totalBankBalance = banks
    .map(({ totalBalance }: bankProps) => totalBalance || 0)
    .reduce((prev: number, curr: number) => prev + curr);

  const colorsArr = Object.values(colors);

  const slices = banks.map((bank: bankProps, index: number) => {
    const { totalBalance } = bank;

    return {
      percent: (totalBalance || 0) / totalBankBalance,
      color: colorsArr[index * 10],
    };
  });

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const svgPieChart = (svgElem: Element | null) => {
    slices.forEach((slice) => {
      // destructuring assignment sets the two variables at once
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent += slice.percent;

      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

      // if the slice is more than 50%, take the large arc (the long way around)
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

      // create an array and join it just for code readability
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        `L 0 0`, // Line
      ].join(" ");

      // create a <path> and append it to the <svg> element
      const pathEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathEl.setAttribute("d", pathData);
      pathEl.setAttribute("fill", slice.color);
      svgElem?.appendChild(pathEl);
    });
  };

  useEffect(() => {
    const svgEl = document.querySelector("#svg-pie-chart");
    svgPieChart(svgEl);
  }, [banks]);

  return (
    <>
      <Col>
        <Card className="mb-4">
          <Card.Header as="h5">SVG.js Chart</Card.Header>
          <Card.Body>
            <Card.Title as="h6" className="border-bottom">
              <div className="mb-1">Total Bank Balances</div>
            </Card.Title>
            <div>
              <svg
                id="svg-pie-chart"
                viewBox="-1 -1 2 2"
                style={{
                  transform: "rotate(-90deg)",
                  width: "100%",
                  height: "250px",
                }}
              ></svg>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default PieChart;
