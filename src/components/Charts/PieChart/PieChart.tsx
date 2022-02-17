import { useEffect, useRef } from "react";
import { Card, Col } from "react-bootstrap";
import { bankProps } from "../../types";
import { colors } from "../../colors";
import * as d3 from "d3";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface barChartProps {
  banks: bankProps[];
}

const PieChart = ({ banks }: barChartProps): JSX.Element => {
  const d3PieChartDivRef = useRef(null);
  let cumulativePercent = 0;

  const maxBalance = Math.max(
    ...banks.map(({ totalBalance }) => totalBalance || 0)
  );

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

  const d3PieChart = () => {
    const balances: Array<any> = banks.map(({ totalBalance }) => totalBalance);
    const bankNames = banks.map(({ bankName }) => bankName);

    const outerRadius = 75;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, balances.length]);

    const svg = d3
      .select(d3PieChartDivRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 250);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const radius = Math.min(width, height) / 2;

    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc: any = d3.arc().innerRadius(0).outerRadius(radius);

    //Generate groups
    const arcs = g
      .selectAll("arc")
      .data(pie(balances))
      .enter()
      .append("g")
      .attr("class", "arc");

    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", (_, i) => colorScale(i))
      .attr("d", arc);
  };

  const currentOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Total Bank Balances",
    },
    tooltip: {
      pointFormat: `<span>{series.name}: <b>{point.percentage:.1f}%</b></span></br><span>Balance: <b>Rs. {point.totalBalance}</b></span>`,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: banks.map((bank: bankProps) => {
          const { bankName, totalBalance } = bank;
          return {
            name: bankName,
            y: ((totalBalance || 0) / totalBankBalance) * 100,
            totalBalance,
            sliced: totalBalance === maxBalance ? true : false,
            selected: totalBalance === maxBalance ? true : false,
          };
        }),
      },
    ],
  };

  useEffect(() => {
    const svgEl = document.querySelector("#svg-pie-chart");
    svgPieChart(svgEl);

    d3PieChart();
  }, [banks]);

  return (
    <>
      <Col>
        <Card className="mb-4" style={{ height: "500px" }}>
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
      <Col>
        <Card className="mb-4" style={{ height: "500px" }}>
          <Card.Header as="h5">D3.js Chart</Card.Header>
          <Card.Body>
            <Card.Title as="h6" className="border-bottom">
              <div className="mb-1">Total Bank Balances</div>
            </Card.Title>
            <div id="d3-pie-chart" ref={d3PieChartDivRef}></div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ height: "500px" }}>
          <Card.Header as="h5">Highcharts.js Chart</Card.Header>
          <Card.Body>
            <div id="highcharts-pie">
              <HighchartsReact
                highcharts={Highcharts}
                options={currentOptions}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default PieChart;
