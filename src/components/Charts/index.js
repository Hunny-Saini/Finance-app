import { Line, Pie } from "@ant-design/charts";
import React from "react";
import "./styles.css";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
        return {
            tag: transaction.tag, amount: transaction.amount
        }
    }
  });

  let finalSpendings = spendingData.reduce((acc,obj)=>{
    let key = obj.tag;
    if(!acc[key]){
        acc[key] = {tag: obj.tag, amount: obj.amount};
    } else{
        acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 800,
    height: 400,
    autoFit: true,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: "circle",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
    smooth: true,
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 500,
    angleField: 'amount',
    colorField: 'tag',
  };

  let chart;
  let pieChart;

  return (
    <div className="chart-wrapper">
      <div className="chart">
        <h2>Financial Statistics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="chart-pie">
        <h2>Total Spending</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
