import React, { useState } from "react";

export const Todo = ({task, toggleComplete, deleteTodo, editTodo,}) =>{
    const [isHover, setIsHover]= useState(false)


    return (
        <div style={{display: "flex"}} onMouseOver={() =>setIsHover(true)} onMouseOut={() => setIsHover(false)}>
            <div  >
                <p style={{textDecoration: task.isCompleted ? 'line-through' : 'none'}}>{task.title}</p>
            </div>
            {isHover ? (
                <>
                    <div style={{display: "flex",alignItems:"center",marginLeft: "30px",gap:"10px"}}>
                <div onClick={() =>editTodo(task.id)}>Edit</div>
                <div onClick={()=>deleteTodo(task.id)}>Delete</div>
                
                {task.isCompleted ? (
                    <div onClick={() => toggleComplete(task.id, true)} style={{background: "red"}}>Mark Incompleted</div>
                ): (
                    <div onClick={() => toggleComplete(task.id, false)} style={{background: "green"}} >Mark Completed</div>
                )}
            </div>
                </>
            ):(
                <></>
            )}
        </div>
    )
}