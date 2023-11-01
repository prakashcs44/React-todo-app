import React from 'react';
import {Link}  from "react-router-dom";
import DeleteIcon from '../icons/DeleteIcon';
import CompleteIcon from '../icons/CompleteIcon';
import NotCompleteIcon from '../icons/NotCompleteIcon';




function Layout({ title, content, completed, onDelete, onToggleComplete,id }) {
  return (
    <div className="layout-container">
      <Link className='texts'  to={`/view/${id}`}>
      <h2 className="layout-title">{title}</h2>
      <p className="layout-content">{content}</p>
      </Link>
      <div className="todo-actions">
       
  <div className='delete-action'  >
     <DeleteIcon onClick = {onDelete} />
    </div>
       
       <div className='complete-action'>
        {completed?( <CompleteIcon onToggle = {onToggleComplete}/>)
        
        :(<NotCompleteIcon onToggle = {onToggleComplete}/>)}

      
</div>
      </div>
    </div>
  );
}

export default Layout;