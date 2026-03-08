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

        <div className="p-6 bg-gray-100 min-h-screen space-y-8">

            {/* Page Title */}

            <h1 className="text-3xl font-bold">
                Student Dashboard
            </h1>

            {/* Analytics Cards */}

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Articles Read</p>
                    <h2 className="text-2xl font-bold">{analytics.length}</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Highlights</p>
                    <h2 className="text-2xl font-bold">{highlights.length}</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Categories</p>
                    <h2 className="text-2xl font-bold">
                        {[...new Set(analytics.map(a => a._id))].length}
                    </h2>
                </div>

            </div>

            {/* Chart Section */}

            <div className="bg-white p-6 shadow rounded-xl">

               <h2 className="text-xl font-semibold mb-4">
        Time Spent Per Category
      </h2>

                <div className="flex justify-center">

                    
                        <StudentPieChart/>
                    

                </div>

            </div>

            {/* Highlights Section */}

            <div className="bg-white p-6 shadow rounded-xl">

                <h2 className="text-xl font-semibold mb-4">
                    Your Highlights
                </h2>

                {highlights.length === 0 ? (

                    <p className="text-gray-400">
                        No highlights yet
                    </p>

                ) : (

                    <div className="grid md:grid-cols-2 gap-4">

                        {highlights.map((h, i) => (

                            <div
                                key={i}
                                className="border rounded-lg p-4 hover:shadow transition"
                            >

                                <p className="italic text-gray-700">
                                    "{h.text}"
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    Article: {h.articleId?.title}
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