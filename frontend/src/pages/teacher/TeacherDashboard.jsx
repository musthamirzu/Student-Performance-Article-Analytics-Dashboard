import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

import BarChart from "../../charts/BarChart";
import PieChart from "../../charts/PieChart";
import LineChart from "../../charts/LineChart";

function TeacherDashboard() {


    const [articlesCount, setArticlesCount] = useState(0)
    const [studentsCount, setStudentsCount] = useState(0)
    const [topCategories, setTopCategories] = useState([])



   

    const fetchArticles = async () => {

        try {

            const res = await API.get("/articles");

            setArticles(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    

    const fetchStudentProgress = async () => {

        try {

            const res = await API.get("/analytics/student-Details")

            setProgress(res.data)

        } catch (err) {
            console.log(err)
        }

    }
    const fetchDashboardStats = async () => {

        try {

            const articlesRes = await API.get("/analytics/articles-count")
            const studentsRes = await API.get("/analytics/students-read-count")
            const categoriesRes = await API.get("/analytics/top-categories")

            setArticlesCount(articlesRes.data.count)
            setStudentsCount(studentsRes.data.total)
            setTopCategories(categoriesRes.data)

        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fetchArticles();
        fetchStudentProgress()
        fetchDashboardStats()
    }, []);
    return (

        <div className="p-6 bg-gray-100 min-h-screen">



            {/* Create Article Button */}

            <div className="flex justify-end mb-6 "

            >

                <Link
                    to="/create-article"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >

                    + Create Article

                </Link>

            </div>

            {/* Charts */}

            <div className="grid md:grid-cols-3 gap-6 mb-10">

                {/* Articles Created */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500 text-sm">
                        Articles Created
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        {articlesCount}
                    </h2>

                </div>

                {/* Total Students Read */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500 text-sm">
                        Total Students Read
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {studentsCount}
                    </h2>

                </div>

                {/* Top Categories */}

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-gray-500 text-sm mb-2">
                        Top Categories
                    </p>

                    <ul className="space-y-1">

                        {topCategories.map((cat, i) => (
                            <li key={i} className="font-semibold text-gray-700">
                                {cat._id} ({cat.count})
                            </li>
                        ))}

                    </ul>

                </div>

            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-10">

                <div className="bg-white rounded-xl shadow p-6">

                    <BarChart />
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <PieChart />
                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-10">
                <LineChart />
            </div>

            
        </div>

    );

}

export default TeacherDashboard;