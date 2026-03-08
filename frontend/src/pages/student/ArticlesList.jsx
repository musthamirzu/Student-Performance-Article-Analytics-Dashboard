import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function ArticlesList() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,setSearch] = useState("");
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {

      const res = await API.get("/articles");

      setArticles(res.data);

    } catch (error) {

      console.error("Error fetching articles:", error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Articles...
      </div>
    );
  }
  const filteredArticles = articles.filter(article =>
article.title.toLowerCase().includes(search.toLowerCase())
);

  return (

   <div className="p-8 max-w-7xl mx-auto">

  {/* Page Title */}

  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

    <h1 className="text-3xl font-bold text-gray-800">
      Available Articles
    </h1>

    {/* Search Bar */}

    <div className="mt-4 md:mt-0">

      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="w-full md:w-80 border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
      />

    </div>

  </div>


  {filteredArticles.length === 0 ? (

    <div className="text-center py-16">

      <p className="text-gray-500 text-lg">
        No articles found
      </p>

    </div>

  ) : (

    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

      {filteredArticles.map((article) => (

        <div
          key={article._id}
          className="bg-white border rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition duration-300"
        >

          <div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {article.title}
            </h3>

            {/* Category Badge */}

            <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>

          </div>

          <Link
            to={`/student/article/${article._id}`}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-indigo-700 transition"
          >
            Read Article
          </Link>

        </div>

      ))}

    </div>

  )}

</div>

  );
}

export default ArticlesList;