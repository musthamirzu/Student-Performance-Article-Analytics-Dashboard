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

function StudentPieChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await API.get("/analytics/time-by-category");

      const labels = res.data.map(item => item._id);
      const duration = res.data.map(item => item.duration);

      setChartData({
        labels,
        datasets: [
          {
            label: "Time Spent",
            data: duration,
            backgroundColor: [
              "#3B82F6",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6"
            ],
            borderWidth: 1
          }
        ]
      });

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="bg-white rounded-xl shadow p-6">

      

      <div className="flex justify-center">

        <div className="w-72 h-72">

          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom"
                }
              }
            }}
          />

        </div>

      </div>

    </div>

  );

}

export default StudentPieChart;