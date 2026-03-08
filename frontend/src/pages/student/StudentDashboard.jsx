import { useEffect, useState } from "react";
import API from "../../services/api";
import StudentPieChart from "../../charts/StudentPieChart";

function StudentDashboard() {

    const [analytics, setAnalytics] = useState([]);
    const [highlights, setHighlights] = useState([]);

    const fetchAnalytics = async () => {
        const res = await API.get("/analytics/category-distribution");
        setAnalytics(res.data);
    };

    const fetchHighlights = async () => {

        try {

            const res = await API.get("/student/highlights");
            setHighlights(res.data);

        } catch (err) {
            console.error("Failed to load highlights", err);
        }

    };

    useEffect(() => {
        fetchAnalytics();
        fetchHighlights();
    }, []);

    const chartData = {
        labels: analytics.map(a => a._id),
        datasets: [
            {
                data: analytics.map(a => a.views),
                backgroundColor: [
                    "#3B82F6",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6"
                ]
            }
        ]
    };

    return (

       <div className="p-8 bg-gray-100 min-h-screen space-y-10">

  {/* Page Title */}

  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold text-gray-800">
      Student Dashboard
    </h1>
  </div>


  {/* Analytics Cards */}

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">Articles Read</p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {analytics.length}
      </h2>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">Highlights</p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {highlights.length}
      </h2>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">Categories</p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {[...new Set(analytics.map(a => a._id))].length}
      </h2>
    </div>

  </div>


  {/* Chart Section */}

  <div className="bg-white p-6 shadow-sm border rounded-xl">

    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Time Spent Per Category
    </h2>

    <div className="flex justify-center">
      <StudentPieChart/>
    </div>

  </div>


  {/* Highlights Section */}

<div className="bg-white p-6 shadow-sm border rounded-xl">

  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
     Your Highlights
  </h2>

  {highlights.length === 0 ? (

    <p className="text-gray-400 text-center py-6">
      No highlights yet
    </p>

  ) : (

    <div className="grid md:grid-cols-2 gap-5">

      {highlights.map((h, i) => (

        <div
          key={i}
          className="border-l-4 border-indigo-500 rounded-lg p-5 bg-indigo-50 hover:bg-indigo-100 hover:shadow-md transition"
        >

          <p className="italic text-gray-700 text-sm leading-relaxed">
            "{h.text}"
          </p>

          <p className="text-sm text-gray-600 mt-3">
            📄 Article: 
            <span className="font-semibold text-indigo-600 ml-1">
              {h.articleId?.title}
            </span>
          </p>

        </div>

      ))}

    </div>

  )}

</div>

</div>

    )

}

export default StudentDashboard