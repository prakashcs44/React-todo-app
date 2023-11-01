import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../contexts/contexts'

function Navbar() {
  const {userInfo,setUserInfo} = useContext(Context);
  const navigate = useNavigate();

  const Logout = ()=>{
      setUserInfo({});
      navigate("/login");
  }


  return (
    <div className='navbar'>
      <h2>Todo App</h2>
      <nav>
       {userInfo.token?(
         <button  className='logout-link' onClick={Logout}>Logout</button>
       ):(
        <>
         <Link to={"/login"} className='nav-link'>Login</Link>
         <Link to={"/register"} className='nav-link'>Register</Link>
        </>
       )}
     
      </nav>
      
    </div>
  )
}

export default Navbar
