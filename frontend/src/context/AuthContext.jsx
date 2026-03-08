import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

const [user,setUser] = useState(null)

const login = (data)=>{

localStorage.setItem("token",data.token)
localStorage.setItem("role",data.user.role)

setUser(data.user)

}

const logout = ()=>{
localStorage.clear()
setUser(null)
}

return(

<AuthContext.Provider value={{user,login,logout}}>
{children}
</AuthContext.Provider>

)

}