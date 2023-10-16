import React, {useEffect, useState } from "react";
import NavBar from "./NavBar";
import Todo from "./Todos";
import Active from './Active'
import Completed from './Completed'
import {nanoid} from 'nanoid'

export default function App(){
    let [todo, setTodo] = useState('')
    let [theDo, setTheDo] = useState(()=>{
       return JSON.parse(localStorage.getItem('toDo')) || []
    })
    let [showCompleted, setShowCompleted] = useState(false)
    let [showActive, setShowactive] = useState(false)
    let [all, setAll] = useState(true)
    let [theme, setTheme] = useState('light')

    function handleChange(event){
        event.preventDefault()
        let {value} = event.target
        setTodo(value)
    }

    function addTodo(event){
        event.preventDefault()
        if(todo !== ''){
            setTheDo(prevTheDo => {
                return [...prevTheDo, {
                    text: todo,
                    done: false,
                    id: nanoid()
                }]
            })
        }
        setTodo('')
        setAll(true)
    }

    function checkTodo(id){
        setTheDo(prevTheDo => prevTheDo.map(theDo => {
            return (
                theDo.id === id ? {...theDo, done: !theDo.done }: theDo
            )
        }))
    }

    function deleteTodo(id){
        setTheDo(prevTheDo => prevTheDo.filter(todo =>{
           return todo.id === id ? !todo : todo
        }))
    }

    function clearCompleted(){
        setTheDo(prevTheDo => prevTheDo.filter(theDo => {
            return theDo.done ? !theDo : theDo
        }))
    }

    function toggleCompleted(){
        setShowCompleted(true)
        setShowactive(false)
        setAll(false)
    }

    function toggleActive(){
        setShowactive(true)
        setShowCompleted(false)
        setAll(false)
    }   

    function toggleAll(){
        setAll(true)
        setShowCompleted(false)
        setShowactive(false)
    }

    function switchTheme(){
        setTheme(prevTheme => {
            return prevTheme === 'light' ? 'dark':'light'
        })
    }

    useEffect(()=> {
        localStorage.setItem('toDo', JSON.stringify(theDo))
    }, [theDo])

    let todoForm = 
    <form className={theme === 'light' ? 'todoForm': 'darkForm'} >
        <button onClick={addTodo} className="addTodo"></button>
        <input
            type="text"
            name="todoText"
            placeholder="Type What To Do"
            className="todoText"
            onChange={handleChange}
            value={todo}
        />
    </form>

    let todoActive = theDo.filter(toDo =>{
        return toDo.done ? !toDo:toDo
    })

    let activeOnes =todoActive.map(toDo => {
        return(
            <Active
                toDo = {toDo}
                id = {toDo.id}
                done = {toDo.done}
                checke = {checkTodo}
                deleteTodo ={deleteTodo}
            />
        )
    })

    let todoCompleted = theDo.filter(toDo => {
        return toDo.done ? toDo: !toDo
    })

    let completedOnes = todoCompleted.map(toDo => {
        return(
            <Completed
                toDo = {toDo}
                id = {toDo.id}
                done = {toDo.done}
                checke = {checkTodo}
                deleteTodo ={deleteTodo} 
            />
        )
    })

    let toDolist = theDo.map(toDo => {
        return(
            <Todo
                toDo = {toDo}
                id = {toDo.id}
                done = {toDo.done}
                checke = {checkTodo}
                deleteTodo ={deleteTodo}
            />
        )
    })

    let toDoViews =
        <div className="views">
            <p className="items_left">{todoActive.length} item{todoActive.length > 1 ? 's':''} left</p>
            <div className={theme === 'light' ? 'allActiveComplete':'darkAllActiveComplete'}>
                <button onClick={toggleAll} className="all viewsBtn">All</button>
                <button onClick={toggleActive} className="active viewsBtn">Active</button>
                <button onClick={toggleCompleted} className="completed viewsBtn">completed</button>
            </div>
            <button onClick={ clearCompleted} className="clear_completed viewsBtn">clear completed</button>
        </div>
    return(
        <div className={theme === 'light' ? 'app': 'darkApp'}>
            <NavBar
                theme = {theme}
                themeSwitcher ={switchTheme}
            />
            {todoForm}
            <div className={theme === 'light' ? 'toDolist': 'darkTodoList'}>
                {all && toDolist}
                {showActive && activeOnes}
                {showCompleted && completedOnes}
                {toDoViews}
            </div>
        </div>
    )
}