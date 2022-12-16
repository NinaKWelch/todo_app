const Todos = ({ todos }) => {
  return (
    <div>
      <h2>Todo list:</h2>
      {todos.map(todo =>
        <div key={todo.id}>
          {todo.text} {todo.completed}
        </div>  
      )}
    </div>
  )
}

export default Todos
