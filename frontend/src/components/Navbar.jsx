import { Link, useLocation } from "react-router-dom";

function Navbar() {

const role = localStorage.getItem("role");
const location = useLocation();

const activeClass = "bg-white text-blue-600";
const normalClass = "hover:bg-blue-500";

return(

<nav className="bg-indigo-600 text-white shadow-md">

<div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

{/* Logo */}
<div className="flex">
<h1 className="font-bold text-xl tracking-wide">
 Analytics Dashboard

</h1>
 <span className="bg-red-500 ml-3 px-3 py-1 rounded text-sm capitalize">
{role}
</span>
</div>


{/* Navigation */}

<div className="flex items-center space-x-4">

{/* Teacher Links */}

{role === "teacher" && (

<>

<Link
to="/teacher/dashboard"
className={`px-3 py-1 rounded transition ${
location.pathname === "/teacher/dashboard"
? activeClass
: normalClass
}`}
>
Dashboard
</Link>

<Link
to="/create-article"
className={`px-3 py-1 rounded transition ${
location.pathname === "/create-article"
? activeClass
: normalClass
}`}
>
Create Article
</Link>

<Link
to="/teacher/articles"
className={`px-3 py-1 rounded transition ${
location.pathname === "/teacher/articles"
? activeClass
: normalClass
}`}
>
Articles
</Link>


</>

)}

{/* Student Links */}

{role === "student" && (

<>

<Link
to="/student/dashboard"
className={`px-3 py-1 rounded transition ${
location.pathname === "/student/dashboard"
? activeClass
: normalClass
}`}
>
Dashboard
</Link>

<Link
to="/student/articles"
className={`px-3 py-1 rounded transition ${
location.pathname === "/student/articles"
? activeClass
: normalClass
}`}
>
Articles
</Link>

</>

)}

{/* Role Badge */}



{/* Logout */}

<Link
to="/"
onClick={()=>localStorage.clear()}
className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
>
Logout
</Link>

</div>

</div>

</nav>

)

}

export default Navbar;