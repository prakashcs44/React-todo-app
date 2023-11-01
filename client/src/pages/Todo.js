import React, { useContext, useEffect} from 'react'

import Layout from '../components/Layout';
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../contexts/contexts"




function Todo() {
 const {todos,setTodos,userInfo} = useContext(Context);
 const navigate = useNavigate();


 const {token} = userInfo;
 

  const GetPosts = async ()=>{
    const response =  await fetch("http://localhost:4000/todos",{
        method:"GET",
        headers:{
           "Authorization":`Bearer ${token}`
        }
    });
   if(response.ok){
    const todo = await response.json();
    setTodos(todo);
   }
   else{
    alert("Something went wrong");
    navigate("/login");
   }
       
  
   
  };

  useEffect(()=>{
    GetPosts();
 }
,[userInfo])

const DeleteTodo = async (id)=>{
   const response = await fetch(`http://localhost:4000/todos/delete/${id}`,{
    method:"DELETE",
    headers:{
      "Authorization":`Bearer ${token}`
    }
   });

   if(response.ok){
     const data = await response.json();
    
     setTodos(data);
   }
   else{
    alert("Unable to delete")
   }
}

const ToggleComplete =async (id)=>{
  const response = await fetch(`http://localhost:4000/todos/complete/${id}`,{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${token}`
    }
  });
  if(response.ok){
    const data = await response.json();
    
    setTodos(data);
  }
  else{
    alert("Something went wrong");
  }
};







  return (
   
    <div className='todo-page'>
     {
        todos.length ===  0? (
            <p>No todos to display</p>
        ) :(
            todos.map((todo)=>(
            <Layout title = {todo.title} content={todo.content} completed={todo.completed}
             onDelete={()=>{
              DeleteTodo(todo._id)}
             }
             onToggleComplete={()=>{
              ToggleComplete(todo._id)
             }
            
             }
             id={todo._id}
            />
            )

            )
        )
     }
  
        <Link className="add-todo-button" to={"/add-todo"} >
          Add Todo
        </Link>
      </div>
    
  )
}

export default Todo
