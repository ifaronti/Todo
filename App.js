import React from "react";
import NavBar from "./NavBar";
// import Todo from "./Todos";
import {nanoid} from 'nanoid'

export default function App(){
    let [todo, setTodo] = React.useState(undefined)
    let [theDo, setTheDo] = React.useState([])
    // let [done, setDone] = React.useState(false)

    function handleChange(event){
        event.preventDefault()
        let {value} = event.target
        setTodo(value)
    }

    function addTodo(event){
        event.preventDefault()
        if(todo !== ""){
            setTheDo(prevTheDo => {
                return [...prevTheDo, {
                    text: todo,
                    done: false,
                    id: nanoid()
                }]
            })
        }
        console.log(theDo)
        setTodo('')
    }

    let todoForm = 
    <div className="todoForm" >
        <input
            type="text"
            name="todoText"
            placeholder="Type What To Do"
            className="todoText"
            onChange={handleChange}
        />
        <button onClick={addTodo} className="addTodo"></button>
    </div>
    return(
        <div className="app">
            {todoForm}
            <NavBar/>
        </div>
    )
}
 // use fieldset when rendering the todoList