import React, { useContext, useState } from 'react'

import {Context} from "../contexts/contexts"
import {useNavigate} from "react-router-dom"
function AddTodo() {
   const [title,setTitle]  = useState("");
   const [content,setContent] = useState("");
   const {userInfo,todos,setTodos}  = useContext(Context);
   const {token}  =  userInfo;
  
   const navigate = useNavigate();
   if(!token){
   
      return <div>You need to login</div>;
   }
   const Add = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:4000/add-todo",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
            title,
            content
        })
    });
    if(response.ok){
     const newTodo = await response.json();
     setTodos([...todos,newTodo]);
     alert("New todo added");
     navigate("/todos")
    }
    else{
        alert("Something went wrong");
    }
   }

  return (
    <form className='add-todo' onSubmit={Add}>
        <input placeholder='title' value={title} onChange={(e)=>{
            setTitle(e.target.value)
        }}/>
        <textarea placeholder='Write your todo' value={content} onChange={(e)=>{
            setContent(e.target.value)
        }}/>
        <button type='submit' >Add</button>
    </form>
   
  )
}

export default AddTodo
