import React from 'react'
import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth";
import Navbar from './components/Navbar';
import Todo from './pages/Todo';
import { ContextProvider } from './contexts/contexts';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import ViewTodo from './pages/ViewTodo';
import HomePage from './pages/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
   return (
      <ContextProvider>

         <Navbar />
         <Routes>
            
            <Route path='/' element = {<HomePage/>}/>
            <Route path='/todos' element={<Todo />} />
            <Route path='/register' element={<Auth action="Register" />} />
            <Route path='/login' element={<Auth action="Login" />} />
            <Route path='/add-todo'element={<AddTodo/>}/>
            <Route path={'/edit/:id'} element = {<EditTodo/>}/>
            <Route path={'/view/:id'} element = {<ViewTodo/>}/>
          
         </Routes>



      </ContextProvider>


   )
}

export default App
