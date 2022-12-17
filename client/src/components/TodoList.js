import TodoListItem from './TodoListItem'
import { useQuery } from '@apollo/client'
import { ALL_TODOS } from '../queries'

const TodoList = () => {
  const { data, loading, error } = useQuery(ALL_TODOS)
  const warningStyle = {
    color: 'red'
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p style={warningStyle}>Data fetching error</p>
  }

  if (!data) {
    return <p style={warningStyle}>Missing data</p>
  }

  return (
    <ul style={{ listStyle: 'none', paddingInlineStart: '0px' }}>
      {data.allTodos.map((todo) =>
        <TodoListItem key={todo.id} todo={todo} />
      )}
    </ul>
  )
}

export default TodoList
