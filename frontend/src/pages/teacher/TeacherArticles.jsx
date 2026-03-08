import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../services/api"

function TeacherArticles(){

const [articles,setArticles] = useState([])
const [loading,setLoading] = useState(true)
const [editingArticle,setEditingArticle] = useState(null)
const [title,setTitle] = useState("")
const [category,setCategory] = useState("")
const [content,setContent] = useState("")
const [imageUrl,setImageUrl] = useState("")
const [file,setFile] = useState(null)


const fetchArticles = async()=>{

try{

const res = await API.get("/articles")

setArticles(res.data)

}catch(err){
console.log(err)
}

setLoading(false)

}

const uploadFile = async () => {

const formData = new FormData()
formData.append("file",file)

const res = await API.post("/upload",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
})

return res.data.fileUrl
}

const updateArticle = async(e)=>{

e.preventDefault()

try{

let updatedImage = imageUrl

if(file){
updatedImage = await uploadFile()
}

await API.put(`/articles/${editingArticle._id}`,{

title,
category,

contentBlocks:[
{
type:"text",
value:content
},
{
type:"image",
value:updatedImage
}
]

})

setEditingArticle(null)

fetchArticles()

}catch(err){
console.log(err)
}

}
useEffect(()=>{
fetchArticles()
},[])


const deleteArticle = async(id)=>{

if(!window.confirm("Delete this article?")) return

try{

await API.delete(`/articles/${id}`)

fetchArticles()

}catch(err){
console.log(err)
}

}

if(loading){
return(
<div className="flex justify-center items-center h-screen text-xl">
Loading Articles...
</div>
)
}

return(

<div className="p-6 max-w-7xl mx-auto">

{/* Header */}

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">
My Articles
</h1>

<Link
to="/create-article"
className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
>
+ Create Article
</Link>

</div>

{/* Articles Grid */}

{articles.length === 0 ? (

<div className="text-center text-gray-400 mt-20">
No articles created yet
</div>

) : (

<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

{articles.map(article=>{

const imageBlock = article.contentBlocks?.find(
block => block.type === "image"
)

return(

<div
key={article._id}
className="bg-white rounded-xl shadow hover:shadow-xl transition flex flex-col overflow-hidden"
>

{/* Article Image */}

{imageBlock && (

<img
src={`http://localhost:5005${imageBlock.value}`}
className="h-40 w-full object-cover"
/>

)}

<div className="p-5 flex flex-col flex-grow">

<h3 className="text-xl font-semibold mb-2">
{article.title}
</h3>

<p className="text-gray-500 mb-4">
Category: {article.category}
</p>

<div className="mt-auto flex gap-3">

<Link
to={`/teacher/article/${article._id}`}
className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
>
View
</Link>

<button
onClick={()=>{

setEditingArticle(article)
setTitle(article.title)
setCategory(article.category)
setContent(article.contentBlocks?.[0]?.value || "")
setImageUrl(article.contentBlocks?.[1]?.value || "")

}}
className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
>
Edit
</button>

<button
onClick={()=>deleteArticle(article._id)}
className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
>
Delete
</button>

</div>

</div>

</div>

)

})}

</div>

)}
{editingArticle && (

<div
className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
onClick={(e)=>{
if(e.target === e.currentTarget){
setEditingArticle(null)
}
}}
>

<div
className="bg-white w-full max-w-lg rounded-2xl shadow-2xl"
onClick={(e)=>e.stopPropagation()}
>

<div className="flex justify-between items-center p-5 border-b">

<h2 className="text-lg font-semibold">
Edit Article
</h2>

<button onClick={()=>setEditingArticle(null)}>
✕
</button>

</div>

<form onSubmit={updateArticle} className="p-6 space-y-4">

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="w-full border p-2 rounded"
placeholder="Title"
/>

<input
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="w-full border p-2 rounded"
placeholder="Category"
/>

<textarea
value={content}
onChange={(e)=>setContent(e.target.value)}
className="w-full border p-2 rounded"
placeholder="Content"
/>

{imageUrl && (

<img
src={`http://localhost:5005${imageUrl}`}
className="rounded"
/>

)}

<input
type="file"
onChange={(e)=>{
setFile(e.target.files[0])
setImageUrl(URL.createObjectURL(e.target.files[0]))
}}
/>

<div className="flex justify-end gap-3">

<button
type="button"
onClick={()=>setEditingArticle(null)}
className="bg-gray-400 text-white px-4 py-2 rounded"
>
Cancel
</button>

<button
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Update
</button>

</div>

</form>

</div>

</div>

)}
</div>

)

}

export default TeacherArticles