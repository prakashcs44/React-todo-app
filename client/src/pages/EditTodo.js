import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../contexts/contexts';

function EditTodo() {
   const {id} = useParams();
   const [title,setTitle] = useState("");
   const [content,setContent] = useState("");
   const {userInfo,todos,setTodos} = useContext(Context);
   const {token} = userInfo;
   const navigate = useNavigate();



   const GetTodo = async ()=>{
    const response = await fetch(`http://localhost:4000/todos/${id}`,{
        method:"GET",
        headers:{
         "Authorization":`Bearer ${token}`
        }
      });
      console.log("hello");
      if(response.ok){
        const {title,content} = await response.json();
        setTitle(title);
        setContent(content);
      }
      else{
        alert("Something went wrong");
        navigate("/login");
      }
   }

   useEffect(()=>{
      GetTodo();
   },[])



const Update = async (e)=>{ 
      e.preventDefault();
      const response  = await fetch(`http://localhost:4000/todos/update/${id}`,{
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
         navigate("/todos");
     }
     else{
        alert("Something went wrong")
     }
}

   return (
    <form className='update-todo' onSubmit={Update}>
    <input placeholder='title' value={title} onChange={(e)=>{
        setTitle(e.target.value)
    }}/>
    <textarea placeholder='Write your todo' value={content} onChange={(e)=>{
        setContent(e.target.value)
    }}/>
    <button type='submit' >Update</button>
</form>
   )
}

export default EditTodo;
