import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from  'jwt-decode';

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')):null);
    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken')? JSON.parse(localStorage.getItem("authToken")):null);
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    let loginUser =  async (e) => {
        e.preventDefault()
        console.log("Login Form Submitted!")

        let response = await fetch("/api/login", {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })

        let data = await response.json();
        if(response.status == 200){
            console.log("data:", data)
            setAuthToken(data);
            setUser(jwtDecode(data.access));
            console.log("data.access:", data.access)
            console.log("jwtDecode:", jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data));
            console.log("localstorageSet: ", JSON.stringify(data));
            navigate('/')
        }
        else{
            alert("Wrong username or password")
        }

        console.log("Done")
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken');
    }

    let updateToken = async () => {
        console.log("Update Token Function Called")

        let response = await fetch("/api/token/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'refresh' : authToken.refresh}),
        })

        let data = await response.json()

        if(response.status == 200){
            setAuthToken(data)
            setUser(data.access)
            localStorage.setItem('authToken', JSON.stringify(data)) 
        }
        else{
            alert("Session Expired. Please Log in again.")
            logoutUser()
        }
    }

    let contextData = {
        authToken : authToken,
        user : user,
        loginUser : loginUser,
        logoutUser : logoutUser,
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if(authToken){
                updateToken()
            }
        }, 1000 * 60 * 4);
        return () => clearInterval(interval)

    }, [authToken, loading]);

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}   