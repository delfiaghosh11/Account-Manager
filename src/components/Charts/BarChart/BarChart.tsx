import { useEffect, useRef } from "react";
import { Card, Col } from "react-bootstrap";
import { bankProps } from "../../types";
import { colors } from "../../colors";
import { Number, Svg, SVG } from "@svgdotjs/svg.js";
import * as d3 from "d3";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface barChartProps {
  banks: bankProps[];
}

const BarChart = ({ banks }: barChartProps): JSX.Element => {
  const d3BarChartDivRef = useRef(null);
  let draw: Svg;
  const maxBalance = Math.max(
    ...banks.map(({ totalBalance }) => totalBalance || 0)
  );

  const svgBarChart = (bankName: string, balance = 0, y: number) => {
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
    const balances = banks.map(({ totalBalance }) => totalBalance || 0);
    const bankNames = banks.map(({ bankName }) => bankName);

    const scale = 1.5;
    const width = (data: number, shift: number) =>
      (((data / maxBalance) * 100) / scale + shift).toString().concat("%");

    const svgCanvas = d3
      .select(d3BarChartDivRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 250);

    svgCanvas
      .selectAll("text #bankName")
      .data(bankNames)
      .enter()
      .append("text")
      .attr("y", (_, itr) => itr * 50 + 20)
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
      .attr("y", (_, iteration) => iteration * 50 + 22);

    svgCanvas
      .selectAll("text #balance")
      .data(balances)
      .enter()
      .append("text")
      .attr("x", (dataPoint) => width(dataPoint, 1))
      .attr("y", (_, i) => i * 50 + 37)
      .text((dataPoint) => dataPoint)
      .attr("font-size", 14)
      .attr("fill", "#666");
  };

  const currentOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Total Bank Balances",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Total Balances",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%",
        },
      },
    },
    tooltip: {
      headerFormat: `<span style="font-size:11px">{series.name}</span><br>`,
      pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>Rs. {point.totalBalance}</b><br/>`,
    },
    series: [
      {
        name: "Balance",
        colorByPoint: true,
        data: banks.map((bank: bankProps) => {
          const { bankName, totalBalance } = bank;
          return {
            name: bankName,
            y: ((totalBalance || 0) / maxBalance) * 100,
            drilldown: bankName,
            totalBalance,
          };
        }),
      },
    ],
  };

  useEffect(() => {
    draw = SVG().addTo("#svg-bar-chart").size("100%", 250);
    banks.forEach(({ bankName, totalBalance }, index: number) => {
      svgBarChart(bankName, totalBalance, index * 50);
    });

    d3BarChart();
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
            <div id="svg-bar-chart"></div>
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
            <div id="d3-bar-chart" ref={d3BarChartDivRef}></div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ height: "500px" }}>
          <Card.Header as="h5">Highcharts.js Chart</Card.Header>
          <Card.Body>
            <div id="highcharts-bar">
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

export default BarChart;
