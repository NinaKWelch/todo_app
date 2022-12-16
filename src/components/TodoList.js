import TodoListItem from './TodoListItem'
import { useQuery } from '@apollo/client'
import { ALL_TODOS } from './queries'

const TodoList = () => {
  const { data, loading, error } = useQuery(ALL_TODOS)

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Data fetching error</p>
  }

  if (!data) {
    return <p>Missing data</p>
  }

  return (
    <ul>
      {data.allTodos.map((todo) =>
        <TodoListItem key={todo.id} todo={todo} />
      )}
    </ul>
  )
}

export default TodoList
