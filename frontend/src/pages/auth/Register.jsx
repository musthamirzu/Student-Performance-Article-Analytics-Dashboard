import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("student");
const navigate = useNavigate()
const registerUser = async(e)=>{
e.preventDefault();


await API.post("/auth/register",{
name,
email,
password,
role
});

alert("Registered Successfully");
navigate("/")
}

return(

<div className="flex justify-center items-center h-screen bg-gray-100">

<form
onSubmit={registerUser}
className="bg-white p-8 rounded shadow w-96"
>

<h2 className="text-xl font-bold mb-4">
Register
</h2>

<input
className="border p-2 w-full mb-3"
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
className="border p-2 w-full mb-3"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 w-full mb-3"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<select
className="border p-2 w-full mb-3"
onChange={(e)=>setRole(e.target.value)}
>

<option value="student">Student</option>
<option value="teacher">Teacher</option>

</select>

<button className="bg-green-600 text-white w-full py-2 rounded">
Register
</button>

</form>

</div>

)

}

export default Register;