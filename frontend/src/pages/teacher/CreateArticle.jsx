import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateArticle(){

const navigate = useNavigate();

const [title,setTitle] = useState("");
const [category,setCategory] = useState("");
const [content,setContent] = useState("");
const [file,setFile] = useState(null);
const [preview,setPreview] = useState("");
const [loading,setLoading] = useState(false);

const uploadFile = async()=>{

const formData = new FormData();
formData.append("file",file);

const res = await API.post("/upload",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
});

return res.data.fileUrl;

};

const createArticle = async(e)=>{

e.preventDefault();

if(!title || !category || !content){
alert("Please fill all fields");
return;
}

try{

setLoading(true);

let imageUrl = "";

if(file){
imageUrl = await uploadFile();
}

await API.post("/articles",{

title,
category,

contentBlocks:[
{
type:"text",
value:content
},
{
type:"image",
value:imageUrl
}
]

});

alert("Article Created Successfully");

navigate("/teacher/dashboard");

}catch(err){
console.log(err);
}
finally{
setLoading(false);
}

};

return(

<div className="max-w-3xl mx-auto p-6">

<h2 className="text-3xl font-bold mb-6">
Create Article
</h2>

<form onSubmit={createArticle} className="space-y-4">

{/* Title */}

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-3 w-full rounded"
placeholder="Article Title"
/>

{/* Category */}

<input
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-3 w-full rounded"
placeholder="Category"
/>

{/* Content */}

<textarea
value={content}
onChange={(e)=>setContent(e.target.value)}
className="border p-3 w-full rounded"
rows="5"
placeholder="Write article content"
/>

{/* File Upload */}

<div>

<label className="font-medium mb-2 block">
Upload Image
</label>

<input
type="file"
onChange={(e)=>{
setFile(e.target.files[0]);
setPreview(URL.createObjectURL(e.target.files[0]));
}}
/>

</div>

{/* Image Preview */}

{preview && (

<img
src={preview}
alt="preview"
className="w-full h-64 object-cover rounded"
/>

)}

{/* Submit */}

<button
disabled={loading}
className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>

{loading ? "Publishing..." : "Publish Article"}

</button>

</form>

</div>

);

}

export default CreateArticle;