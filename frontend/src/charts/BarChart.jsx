import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useEffect,useState } from "react";
import API from "../services/api";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function BarChart(){

const [chartData,setChartData] = useState({
labels:[],
datasets:[]
});

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{

try{

const res = await API.get("/analytics/articles-views");

const labels = res.data.map(item => item.title);
const views = res.data.map(item => item.totalViews);

setChartData({
labels,
datasets:[
{
label:"Article Views",
data:views,
backgroundColor:[
"#3B82F6",
"#10B981",
"#F59E0B",
"#EF4444",
"#8B5CF6"
],
borderRadius:8,
barThickness:40
}
]
});

}catch(err){
console.log(err);
}

};

const options = {
responsive:true,
maintainAspectRatio:false,

plugins:{
legend:{
display:false
},
tooltip:{
backgroundColor:"#111827",
titleColor:"#fff",
bodyColor:"#fff",
padding:12
}
},

scales:{
x:{
grid:{
display:false
},
ticks:{
color:"#374151",
font:{
size:12
}
}
},
y:{
grid:{
color:"#E5E7EB"
},
ticks:{
color:"#374151"
}
}
}
};

return(

<div className="bg-white rounded-xl shadow p-6">

<div className="mb-4">

<h2 className="text-lg font-semibold text-gray-800">
Article Views
</h2>

<p className="text-sm text-gray-500">
Total student views per article
</p>

</div>

<div className="h-80">
<Bar data={chartData} options={options}/>
</div>

</div>

)

}

export default BarChart;