import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Chart as ChartJS } from "react-chartjs-2";
import { useTheme } from "../../contexts/theme-context";

Chart.register(...registerables);

export const ChartComponent = ({
  chartData,
  chartType = "Bar",
  chartTitle = "Chart Title",
  selectLabel = true,
  displayTitle = true,
  displayLegend = true,
  selectLabelText = "",
  isHorizontalBar = false,
  fontColor = "#333",
}) => {
  return (
    <div className="chart-container">
      <ChartJS
        type={chartType}
        data={chartData}
        options={{
          indexAxis: isHorizontalBar === true ? "y" : "x",
          plugins: {
            title: {
              display: displayTitle,
              text: chartTitle,
              color: "#4361ee",
              font: {
                size: 30,
              },
            },
            legend: {
              display: displayLegend,
              labels: {
                color: fontColor,
              },
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          scales:
            chartType === "pie" || chartType === "doughnut"
              ? {
                  x: {
                    display: false,
                  },

                  y: {
                    display: false,
                  },
                }
              : {
                  x: {
                    title: { display: selectLabel, text: selectLabelText },
                    ticks: {
                      color: fontColor,
                    },
                  },

                  y: {
                    ticks: {
                      beginAtZero: true,
                      color: fontColor,
                    },
                  },
                },
        }}
      />
    </div>
  );
};
