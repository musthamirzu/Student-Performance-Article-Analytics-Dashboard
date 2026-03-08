import { BrowserRouter,Routes,Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"

import ProtectedRoute from "./routes/ProtectedRoute"

import AuthLayout from "./layouts/AuthLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import ReadArticle from "./pages/student/ReadArticle"
import CreateArticle from "./pages/teacher/CreateArticle"
import ArticlesList from "./pages/student/ArticlesList"
import TeacherArticles from "./pages/teacher/TeacherArticles"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={
<AuthLayout>
<Login/>
</AuthLayout>
} />

<Route path="/register" element={
<AuthLayout>
<Register/>
</AuthLayout>
} />

<Route
path="/teacher/dashboard"
element={
<ProtectedRoute role="teacher">
<DashboardLayout>
<TeacherDashboard/>
</DashboardLayout>
</ProtectedRoute>
}
/>

<Route
path="/student/dashboard"
element={
<ProtectedRoute role="student">
<DashboardLayout>
<StudentDashboard/>
</DashboardLayout>
</ProtectedRoute>
}
/>

<Route
path="/student/article/:id"
element={
<ProtectedRoute role="student">
<DashboardLayout>
<ReadArticle/>
</DashboardLayout>
</ProtectedRoute>
}
/>

<Route
path="/create-article"
element={
<ProtectedRoute role="teacher">
<DashboardLayout>
<CreateArticle/>
</DashboardLayout>
</ProtectedRoute>
}
/>

<Route
path="/student/articles"
element={
<ProtectedRoute role="student">
<DashboardLayout>
<ArticlesList/>
</DashboardLayout>
</ProtectedRoute>
}
/>


<Route
path="/teacher/articles"
element={
<ProtectedRoute role="teacher">
<DashboardLayout>
<TeacherArticles/>
</DashboardLayout>
</ProtectedRoute>
}
/>

<Route
path="/teacher/article/:id"
element={
<ProtectedRoute role="teacher">
<DashboardLayout>
<ReadArticle/>
</DashboardLayout>
</ProtectedRoute>
}
/>
</Routes>

</BrowserRouter>

)

}

export default App