import { EditTodoForm } from "@/components/EditTodoForm";
import { Todo } from "@/components/Todo";
import { TodoForm } from "@/components/TodoForm"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
uuidv4();
import axios from "axios";

export default function Home() {
  const [todos, setTodos]= useState([])
  const [showDuplicateMsg, setShowDuplicateMsg] = useState(false)
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:5001/api/todos')
    .then(function (response) {
      // handle success
      console.log(response.data);
      // set the response to  todos
      setTodos(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[])


  

  const addTodo = (todo) =>{
    //check duplicate in the array
    if(todos.filter(todoFake=>todoFake.title===todo).length>0){
      console.log('There is a duplicate todo')
      setShowDuplicateMsg(true)





    }else{
      setShowDuplicateMsg(false)
      setTodos([...todos,{id:uuidv4(),title: todo, isCompleted: false, isEditing: false}])
      console.log(todo)
      const createTodo = {
        title: todo,
        isCompleted: false,
        isEditing: false
      }
  
      axios.post('http://localhost:5001/api/todo/create', createTodo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    
  }

  const toggleComplete = (id,status) =>{
    setTodos(todos.map(todo => todo.id === id ? 
      {... todo, isCompleted: !todo.isCompleted}: todo
      ))
      // Push to do to API
      const updatedTodo = {
        isCompleted: status
      }
  
      axios.put('http://localhost:5001/api/todo/update/'+id, updatedTodo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  
  const deleteTodo = (id) => {
    console.log('log todo id:',id)
    setTodos(todos.filter(todo =>todo.id !== id))
    //Past id to api call
    axios.delete('http://localhost:5001/api/todo/delete/'+id)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const editTodo = (id) =>{

    setTodos(todos.map(todo => todo.id === id ? {... todo,
      isEditing: !todo.isEditing} :todo))
    }
    

  const editTask = (title, id) =>{
    setTodos(todos.map(todo => todo.id === id ? 
    {... todo,title, isEditing: !todo.isEditing}: todo  
    ))

    const updatedTodo = {
      title: title
    }

    axios.put('http://localhost:5001/api/todo/update/'+id, updatedTodo)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <>
      {showDuplicateMsg ? (
        <p>This is a duplicate todo</p>
      ):(
        <></>
      )}
      <TodoForm addTodo={addTodo} todos={todos}/>
      {todos.map((todo, index) =>(
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ):
        (
          <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>
        )

        
      ))}
    </>
  )
}
