import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import API from "../services/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart() {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const res = await API.get("/analytics/category-distribution");

      const labels = res.data.map(item => item._id);
      const values = res.data.map(item => item.views);

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#3B82F6",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6"
            ]
          }
        ]
      });

    } catch (error) {
      console.error(error);
    }

  };

  if (!chartData) return <p>Loading Chart...</p>;

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Category Distribution
      </h2>

      <Pie data={chartData} />

    </div>

  );
}

export default PieChart;