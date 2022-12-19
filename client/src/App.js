import { useQuery } from '@apollo/client'
import { ALL_TODOS } from './queries'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const App = () => {
  const { data } = useQuery(ALL_TODOS)

  return (
    <>
      <h1>Todo App</h1>
      <h2>Add Todo</h2>
      <TodoForm  />
      <h2>Todo list:</h2>
      <TodoList
        listLength={(data && data.allTodos) ? data.allTodos.length : 0}
        pageLimit={3}
      />
    </>
  )
}

export default App