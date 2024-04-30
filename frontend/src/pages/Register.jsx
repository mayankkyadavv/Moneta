import React, {useState} from 'react'
import AuthContext from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate('/')

  const registerUser = async (e) => {
    e.preventDefault();

    const data = {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "username": username,
      "password": password,
    }

    let response = await fetch("/api/register", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    })

    if(response.status == 200){
      navigate("/")
    }
    else{
      alert("Failed to create an account.")
    }

  }

  return (

    <div>
      <form className='flex flex-col ' action = "" onSubmit={registerUser}>
        <div className = "border-solid border-2 border-black m-2">
          <input type='' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
        </div>
        <div className = "border-solid border-2 border-black m-2">
          <input type='' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
        </div>
        <div className = "border-solid border-2 border-black m-2">
          <input type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        </div>
        <div className = "border-solid border-2 border-black m-2">
          <input type='' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div className = "border-solid border-2 border-black m-2">
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button className = "border-solid border-2 border-black m-2" type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default Register