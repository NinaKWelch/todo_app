import AddTodo from './AddTodo'

const Todos = ({ todos }) => {
  return (
    <div>
      <h2>Todos</h2>
      <AddTodo />
      {todos.map(todo =>
        <div key={todo.id}>
          {todo.text} {todo.completed}
        </div>  
      )}
    </div>
  )
}

export default Todos
