import React, { useContext, useState,useEffect } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
import { Context } from '../contexts/contexts';

function ViewTodo() {
  const {id} = useParams();
  const [todo,setTodo] = useState({});
  const {userInfo} = useContext(Context);
  const {token} = userInfo;
  const navigate = useNavigate();
  const GetTodo = async ()=>{
    const response = await fetch(`http://localhost:4000/todos/${id}`,{
        method:"GET",
        headers:{
         "Authorization":`Bearer ${token}`
        }
      });

   
      if(response.ok){
        const todo = await response.json();
         setTodo(todo);
      }
      else{
        alert("Something went wrong");
        navigate("/login");
      }
   }

   useEffect(()=>{
      GetTodo();
   },[])







  return (
    <div className="container">
      <h2>{todo.title}</h2>
      <p>{todo.content}</p>
      <Link to="/todos" className="back-link">Back to Todos</Link>
    </div>

  )
}

export default ViewTodo;
