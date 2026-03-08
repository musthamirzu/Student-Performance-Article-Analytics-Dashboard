import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");
  const [errors,setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {

    const newErrors = {};

    if(!name.trim()){
      newErrors.name = "Name is required";
    }

    if(!email){
      newErrors.email = "Email is required";
    } 
    else if(!/\S+@\S+\.\S+/.test(email)){
      newErrors.email = "Invalid email format";
    }

    if(!password){
      newErrors.password = "Password is required";
    }
    else if(password.length < 6){
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const registerUser = async(e)=>{
    e.preventDefault();

    const validationErrors = validate();

    if(Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }

    try{

      await API.post("/auth/register",{
        name,
        email,
        password,
        role
      });

      alert("Registered Successfully");
      navigate("/");

    }catch(err){
      alert(err,"Registration failed");
    }

  }

  return (

    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <form
        onSubmit={registerUser}
        className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 transition-all duration-300 hover:scale-105"
      >

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Name */}

        <input
          className="border border-gray-300 p-3 w-full mb-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>
        )}

        {/* Email */}

        <input
          className="border border-gray-300 p-3 w-full mb-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        {/* Password */}

        <input
          type="password"
          className="border border-gray-300 p-3 w-full mb-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        {/* Role */}

        <select
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-lg font-semibold transition duration-300"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? 
          <span
            className="text-indigo-600 cursor-pointer ml-1 hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </form>

    </div>

  )
}

export default Register;