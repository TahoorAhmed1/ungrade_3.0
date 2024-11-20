import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  compentencies: any;
  pre_percentage: any;
  post_percentage: any;
};

function BarGraph({ compentencies, pre_percentage, post_percentage }: Props) {
  const Utils = {
    // Generate an array of month names
    months: function ({ count }: any) {
      // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const months = compentencies;
      return months.slice(0, count);
    },

    // Generate an array of random numbers based on configuration
    pre_percentages: function ({ count, min, max }: any) {
      const numbers = [];
      for (let i = 0; i < pre_percentage.length; i++) {
        // console.log(pre_percentage[i] * 100);
        // @ts-ignore
        numbers.push(pre_percentage[i] * 100);
      }

      return numbers.slice(0, count);
    },
    post_percentages: function ({ count, min, max }: any) {
      const numbers = [];
      for (let i = 0; i < post_percentage.length; i++) {
        // @ts-ignore
        numbers.push(post_percentage[i] * 100);
      }
      return numbers.slice(0, count);
    },
    // Define some chart colors
    CHART_COLORS: {
      red: "rgba(255, 99, 132, 1)",
      blue: "#A4EAE2",
      green: "rgba(75, 192, 192, 1)",
      blueDark: "#033239",
    },
  };

  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pre Assesments",
        data: Utils.pre_percentages(NUMBER_CFG),
        backgroundColor: Utils.CHART_COLORS.blueDark,
        stack: "Stack 0",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: "middle",
      },
      {
        label: "Post Assesments",
        // data: Utils.pre_percentages(NUMBER_CFG),
        data: Utils.post_percentages(NUMBER_CFG),
        backgroundColor: Utils.CHART_COLORS.blue,
        stack: "Stack 2",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: "middle",
        // borderSkipped: false,
      },
    ],
  };
  return (
    <div className="BarGraph">
      {/* @ts-ignore */}
      <Bar data={data} />
    </div>
  );
}

export default BarGraph;
