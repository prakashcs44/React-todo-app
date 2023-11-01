import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from "../contexts/contexts"




function Auth({ action }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const {setUserInfo} = useContext(Context)
  const navigate = useNavigate();


  const auth = async (e) => {
    e.preventDefault();
    if (action === "Register") {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        setEmail("");
        setPassword("");
        alert("Registration successfull");
        navigate("/login");
       
      }
      else {
        alert("Registration failed!!");
      }

    }

    else if (action === "Login") {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data)
        setEmail("");
        setPassword("");
        alert("Login successfull");
        navigate("/todos");
       
      }
      else{
        alert("Wrong credentials")
      }
    }
  }




  return (
    
      <form className='auth-form' onSubmit={auth}>
        <h2>{action}</h2>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type="text" placeholder='email' value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='password' value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} />
        </div>

        <button type='submit'>{action}</button>
      </form>

    

  )
}

export default Auth;
