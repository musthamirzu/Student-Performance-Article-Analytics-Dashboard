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

    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Available Articles
      </h1>
{/* Search Bar */}

<div className="mb-6">

<input
type="text"
placeholder="Search articles..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full md:w-96 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
/>

</div>

 {filteredArticles.length === 0 ? (

<p className="text-gray-500">
No articles found.
</p>

) : (

<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

{filteredArticles.map((article) => (

            <div
              key={article._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            >

              <div>

                <h3 className="text-xl font-semibold mb-2">
                  {article.title}
                </h3>

                <p className="text-gray-500 mb-4">
                  Category: {article.category}
                </p>

              </div>

              <Link
                to={`/student/article/${article._id}`}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition"
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