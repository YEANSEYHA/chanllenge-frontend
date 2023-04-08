import React, { useState } from "react";

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.title)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        editTodo(value, task.id)

        console.log(value)
        setValue("")
    }

    return (
        <>
         <form onSubmit={handleSubmit} style={{padding: "20px"}}>
            <div style={{display:"flex"}}>
                <div>
                <input type="text" placeholder="Enter Todo"
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                />
                </div>
                <div>
                    <button type="submit">Update Todo</button>
                </div>  
            
            </div>
         </form>
        
        </>
       
    )
}