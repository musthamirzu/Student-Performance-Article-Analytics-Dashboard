import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import API from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart() {

const [chartData,setChartData] = useState(null);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{

try{

const res = await API.get("/analytics/daily-engagement");

const labels = res.data.map(item => item._id);
const reads = res.data.map(item => item.reads);

setChartData({
labels,
datasets:[
{
label:"Daily Reads",
data:reads,
borderColor:"#6366F1",
backgroundColor:"rgba(99,102,241,0.15)",
pointBackgroundColor:"#6366F1",
pointRadius:4,
tension:0.4,
fill:true
}
]
});

}catch(error){
console.error(error);
}

};

if(!chartData){
return(
<div className="bg-white p-6 rounded-xl shadow">
Loading Chart...
</div>
);
}

const options = {

responsive:true,

plugins:{
legend:{
display:true,
position:"top"
}
}}


  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Daily Engagement
      </h2>

      <Line data={chartData} />

    </div>

  );
}

export default LineChart;