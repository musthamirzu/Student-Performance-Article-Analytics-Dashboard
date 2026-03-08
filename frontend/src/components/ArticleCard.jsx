import { Link } from "react-router-dom";

function ArticleCard({ article }) {

return (

<div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">

{/* Article Image */}

{article.contentBlocks?.[1]?.value && (

<img
src={`http://localhost:5005${article.contentBlocks[1].value}`}
alt={article.title}
className="w-full h-40 object-cover"
/>

)}

{/* Card Content */}

<div className="p-4 flex flex-col flex-grow">

<h3 className="text-lg font-semibold mb-1">
{article.title}
</h3>

<p className="text-gray-500 text-sm mb-4">
Category: {article.category}
</p>

{/* Read Button */}

<Link
to={`/student/article/${article._id}`}
className="mt-auto bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
>
Read Article
</Link>

</div>

</div>

)

}

export default ArticleCard;