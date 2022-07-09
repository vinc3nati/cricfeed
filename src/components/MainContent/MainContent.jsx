import { useState, useEffect } from "react";
import PapaParse from "papaparse";
import { KeyInfo } from "../KeyInfo/KeyInfo";
import { ChartComponent } from "../ChartComponent/ChartComponent";
import { useLayoutEffect } from "react";
import { useTheme } from "../../hooks/useTheme";

export const MainContent = () => {
  const [chartData, setChartData] = useState({
    chartData1: {},
    chartData2: {},
    chartData3: {},
    chartData4: {},
    chartData5: {},
    chartData6: {},
    chartData7: {},
    chartData8: {},
    rawMatchData: {},
    rawPlayerData: {},
    rawBallByBallData: {},
  });
  const [keyInfos, setKeyInfos] = useState({
    info1: 0,
    info2: 0,
    info3: 0,
    info4: 0,
  });
  const { theme } = useTheme();

  const saveKeyInfoData1and2 = () => {
    if (!Object.keys(chartData.rawMatchData).length) return;
    // set number of matches and superover
    setKeyInfos((prev) => ({
      ...prev,
      info1: chartData.rawMatchData.data.length - 1,
    }));
    const superOvers = chartData.rawMatchData.data.reduce(
      (acc, curr) => (curr.IS_Superover === 1 ? acc + 1 : acc),
      0
    );
    setKeyInfos((prev) => ({ ...prev, info2: superOvers }));
  };

  const saveKeyInfoData3and4 = () => {
    if (!Object.keys(chartData.rawBallByBallData).length) return;
    // set number of fours and sixes
    const numBoundaries = chartData.rawBallByBallData.data.reduce(
      (acc, curr) => {
        if (curr.Batsman_Scored === 4) return { ...acc, fours: acc.fours + 1 };
        if (curr.Batsman_Scored === 6) return { ...acc, sixes: acc.sixes + 1 };
        return acc;
      },
      { fours: 0, sixes: 0 }
    );
    setKeyInfos((prev) => ({
      ...prev,
      info3: numBoundaries.fours,
      info4: numBoundaries.sixes,
    }));
  };

  const dataForChart1 = () => {
    if (!Object.keys(chartData.rawPlayerData).length) return;
    const handType = chartData.rawPlayerData.data.reduce(
      (acc, curr) =>
        curr.Batting_Hand === "Left_Hand" || curr.Batting_Hand === "Right_Hand"
          ? { ...acc, [curr.Batting_Hand]: acc[curr.Batting_Hand] + 1 }
          : acc,
      { Left_Hand: 0, Right_Hand: 0 }
    );
    setChartData((prev) => ({
      ...prev,
      chartData1: {
        labels: [...Object.keys(handType)],
        datasets: [
          {
            label: "Left or Right Handed Batsmen",
            data: [...Object.values(handType)],
            backgroundColor: ["#62b365", "#7cc6fe"],
            borderColor: ["#4caf50", "#4383b4"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dataForChart2 = () => {
    if (!Object.keys(chartData.rawMatchData).length) return;
    const countries = chartData.rawMatchData.data.reduce(
      (acc, curr) =>
        acc[curr.Host_Country] !== undefined
          ? { ...acc, [curr.Host_Country]: acc[curr.Host_Country] + 1 }
          : curr.Host_Country !== undefined
          ? { ...acc, [curr.Host_Country]: 1 }
          : acc,
      {}
    );

    setChartData((prev) => ({
      ...prev,
      chartData2: {
        labels: [...Object.keys(countries)],
        datasets: [
          {
            label: "Host Nations",
            data: [...Object.values(countries)],
            backgroundColor: [
              "rgba(67, 97, 238, 0.5)",
              "#62b365",
              "#f73c2f",
              "#999",
            ],
            borderColor: ["rgba(67, 97, 238, 0.2)", "#4caf50", "#dd1e10"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };
  const dataForChart3 = () => {
    if (!Object.keys(chartData.rawMatchData).length) return;
    const winType = chartData.rawMatchData.data.reduce(
      (acc, curr) =>
        acc[curr.Win_Type] !== undefined
          ? { ...acc, [curr.Win_Type]: acc[curr.Win_Type] + 1 }
          : curr.Win_Type !== undefined
          ? { ...acc, [curr.Win_Type]: 1 }
          : acc,
      {}
    );

    setChartData((prev) => ({
      ...prev,
      chartData3: {
        labels: [...Object.keys(winType)],
        datasets: [
          {
            label: "Match Results",
            data: [...Object.values(winType)],
            backgroundColor: ["#777", "#7cc6fe", "#e6a647", "#f73c2f"],
            borderColor: ["#555", "#4383b4", "#ff9800", "#dd1e10"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dataForChart4 = () => {
    if (!Object.keys(chartData.rawPlayerData).length) return;
    const bowlingType = chartData.rawPlayerData.data.reduce(
      (acc, curr) =>
        acc[curr.Bowling_Skill] !== undefined
          ? { ...acc, [curr.Bowling_Skill]: acc[curr.Bowling_Skill] + 1 }
          : curr.Bowling_Skill !== undefined && curr.Bowling_Skill !== "NULL"
          ? { ...acc, [curr.Bowling_Skill]: 1 }
          : acc,
      {}
    );

    setChartData((prev) => ({
      ...prev,
      chartData4: {
        labels: [...Object.keys(bowlingType)],
        datasets: [
          {
            label: "Bowling Skills",
            data: [...Object.values(bowlingType)],
            backgroundColor: ["#ec599b"],
            borderColor: ["#db176f"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dataForChart5 = () => {
    if (!Object.keys(chartData.rawMatchData).length) return;
    const tossDescision = chartData.rawMatchData.data.reduce(
      (acc, curr) =>
        curr.Toss_Decision === "bat"
          ? { ...acc, Bat: acc.Bat + 1 }
          : { ...acc, Field: acc.Field + 1 },
      { Bat: 0, Field: 0 }
    );
    setChartData((prev) => ({
      ...prev,
      chartData5: {
        labels: [...Object.keys(tossDescision)],
        datasets: [
          {
            label: "Toss Decisions",
            data: [...Object.values(tossDescision)],
            backgroundColor: ["#8789c0", "#e6a647"],
            borderColor: ["#707196", "#ff9800"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dataForChart6 = () => {
    if (!Object.keys(chartData.rawBallByBallData).length) return;
    const averages = chartData.rawBallByBallData.data.reduce((acc, curr) => {
      if (
        acc[curr.Over_Id] !== undefined &&
        curr.Batsman_Scored !== "Do_nothing" &&
        curr.Batsman_Scored !== " "
      )
        return {
          ...acc,
          [curr.Over_Id]: {
            sum: acc[curr.Over_Id].sum + curr.Batsman_Scored,
            count: acc[curr.Over_Id].count + 1,
          },
        };
      if (
        curr.Over_Id !== undefined &&
        curr.Batsman_Scored !== "Do_nothing" &&
        curr.Batsman_Scored !== " "
      )
        return {
          ...acc,
          [curr.Over_Id]: { sum: curr.Batsman_Scored, count: 1 },
        };

      return acc;
    }, {});
    Object.entries(averages).forEach((elem) => {
      averages[elem[0]] = (
        (parseFloat(elem[1].sum) * 10) /
        elem[1].count
      ).toFixed(2);
    });
    setChartData((prev) => ({
      ...prev,
      chartData6: {
        labels: [...Object.keys(averages)],
        datasets: [
          {
            label: "Average Runs Per Over",
            data: [...Object.values(averages)],
            backgroundColor: ["#94a6f8"],
            borderColor: ["#404b7a"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dataForChart7 = () => {
    if (!Object.keys(chartData.rawPlayerData).length) return;
    const playersNationality = chartData.rawPlayerData.data.reduce(
      (acc, curr) =>
        acc[curr.Country] !== undefined
          ? { ...acc, [curr.Country]: acc[curr.Country] + 1 }
          : curr.Country !== undefined && curr.Is_Umpire !== 1
          ? { ...acc, [curr.Country]: 1 }
          : acc,

      {}
    );

    setChartData((prev) => ({
      ...prev,
      chartData7: {
        labels: [...Object.keys(playersNationality)],
        datasets: [
          {
            label: "Players Nationality",
            data: [...Object.values(playersNationality)],
            backgroundColor: [
              "#5e77e7",
              "#ec599b",
              "#777",
              "#f73c2f",
              "#62b365",
              "#e6a647",
              "#7cc6fe",
              "#8789c0",
              "rgba(54, 162, 235, 0.5)",
              "rgba(245, 135, 31, 0.5)",
              "rgba(128, 203, 174, 0.5)",
            ],
            borderColor: [
              "#3954ce",
              "#db176f",
              "#555",
              "#dd1e10",
              "#42a545",
              "#ff9800",
              "#518dba",
              "#474ba2",
              "rgba(54, 162, 235, 1)",
              "rgba(245, 135, 31, 1)",
              "rgba(128, 203, 174, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dataForChart8 = () => {
    if (!Object.keys(chartData.rawBallByBallData).length) return;
    const dismissalType = chartData.rawBallByBallData.data.reduce(
      (acc, curr) =>
        acc[curr.Dissimal_Type] !== undefined
          ? { ...acc, [curr.Dissimal_Type]: acc[curr.Dissimal_Type] + 1 }
          : curr.Dissimal_Type !== undefined && curr.Dissimal_Type !== " "
          ? { ...acc, [curr.Dissimal_Type]: 1 }
          : acc,
      {}
    );

    setChartData((prev) => ({
      ...prev,
      chartData8: {
        labels: [...Object.keys(dismissalType)],
        datasets: [
          {
            label: "Bowling Skills",
            data: [...Object.values(dismissalType)],
            backgroundColor: ["#7cc6fe"],
            borderColor: ["#518dba"],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const saveMatchData = (result) => {
    setChartData((prev) => ({ ...prev, rawMatchData: result }));
  };

  const savePlayerData = (result) => {
    setChartData((prev) => ({ ...prev, rawPlayerData: result }));
  };

  const saveBallByBallData = (result) => {
    setChartData((prev) => ({ ...prev, rawBallByBallData: result }));
  };

  const getChartData = () => {
    PapaParse.parse("./ipl_data/Match.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: saveMatchData,
    });
    PapaParse.parse("./ipl_data/Player.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: savePlayerData,
    });
    PapaParse.parse("./ipl_data/Ball_by_Ball.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: saveBallByBallData,
    });
  };

  useEffect(() => {
    getChartData();
  }, []);

  useEffect(() => {
    if (chartData.rawPlayerData?.data) {
      dataForChart1();
      dataForChart4();
      dataForChart7();
    }
    if (chartData.rawMatchData?.data) {
      saveKeyInfoData1and2();
      dataForChart2();
      dataForChart3();
      dataForChart5();
    }
    if (chartData.rawBallByBallData?.data) {
      saveKeyInfoData3and4();
      dataForChart6();
      dataForChart8();
    }
  }, [
    chartData.rawPlayerData,
    chartData.rawMatchData,
    chartData.rawBallByBallData,
  ]);

  return (
    <section id="maincontent-container">
      <header className="section-heading">IPL Statistics</header>
      <div className="key-info-container">
        <KeyInfo data={keyInfos.info1} title="Total Matches" />
        <KeyInfo data={keyInfos.info2} title="Total Superovers" />
        <KeyInfo data={keyInfos.info3} title="Total Fours" />
        <KeyInfo data={keyInfos.info4} title="Total Sixes" />
      </div>
      <div className="chart-wrapper">
        {Object.keys(chartData.chartData1).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData1}
            chartTitle="Left - Right Handed Batsmen"
            chartType="pie"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData2).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData2}
            chartTitle="IPL Hosting Nations"
            chartType="pie"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData3).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData3}
            chartTitle="Match Results"
            chartType="doughnut"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData4).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData4}
            displayLegend={false}
            chartTitle="Bowling Skills"
            isHorizontalBar={true}
            chartType="bar"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData5).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData5}
            displayLegend={false}
            chartTitle="Batting vs Fielding Decisions"
            chartType="bar"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData6).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData6}
            selectLabel={true}
            selectLabelText="Overs"
            chartTitle="Average Runs Per Over"
            chartType="line"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData7).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData7}
            displayLegend={false}
            chartTitle="Player's Nationality"
            isHorizontalBar={true}
            chartType="bar"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
        {Object.keys(chartData.chartData8).length !== 0 && (
          <ChartComponent
            chartData={chartData.chartData8}
            displayLegend={false}
            chartTitle="Player's Dismissal Type"
            chartType="bar"
            fontColor={theme === "dark" ? "#f4faff" : "#333"}
          />
        )}
      </div>
    </section>
  );
};
