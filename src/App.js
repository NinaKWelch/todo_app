import './App.css';
import { useQuery } from '@apollo/client'
import { ALL_TODOS } from './queries'
import AddTodo from './AddTodo'
import Todos from './Todos'


const App = () => {
 const { data, loading, error } = useQuery(ALL_TODOS)

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Data fetching error</div>
  }

  if (!data) {
    return <div>Missing data</div>
  }

  return (
    <>
      <h1>Todo App</h1>
      <AddTodo  />
      <Todos todos={data.allTodos}/>
    </>

  )
}

export default App