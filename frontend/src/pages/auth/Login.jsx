import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [errors,setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if(Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }

    try{

      const res = await API.post("/auth/login",{email,password});

      login(res.data);

      if(res.data.user.role === "teacher"){
        navigate("/teacher/dashboard");
      }else{
        navigate("/student/dashboard");
      }

    }catch(err){
      setError(err,"Invalid email or password");
    }

  };

  return (

    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 hover:scale-105">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}

          <div>

            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

          </div>

          {/* Password */}

          <div>

            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Don't have an account?

          <Link
            to="/register"
            className="text-indigo-600 font-semibold ml-1 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;