import React, { useState } from "react";

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("")

    const [displayEmptyMsg, setDisplayEmptyMsg] = useState(false)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        // check if the input is empty of not
        if(value===""){
            setDisplayEmptyMsg(true)
            

        }else{
            setDisplayEmptyMsg(false)
            addTodo(value)
            setValue("")
        }
        
    }


    return (
        <>
         <form onSubmit={handleSubmit} style={{padding: "20px"}}>
         {displayEmptyMsg ? (
                <p style={{color: "red"}}>Todo should not be empty</p>
            ):(
                <></>
            )}
            <input type="text" placeholder="Enter Todo"
                value={value}
                onChange={(e)=> setValue(e.target.value)}
            />
            
            
            <button type="submit">Add Todo</button>
         </form>
        
        </>
       
    )
}