export default function Todo(props){
return( <fieldset  key={props.id} className={props.toDo.done? 'checked':'' } >
            <button onClick={()=> props.checke(props.id)} type="button" className= {props.toDo.done ? 'done':'undone'}><img className="checker" src={`${process.env.PUBLIC_URL}/asset/images/${props.toDo.done ? 'check.svg':''}`} alt=""/></button>
            <p className="todoP">{props.toDo.text}</p>
            <button className="deleteBtn" onClick={()=> props.deleteTodo(props.id)}><img src={`${process.env.PUBLIC_URL}/asset/images/cross.svg`} alt=""/></button>
        </fieldset>
  )
}