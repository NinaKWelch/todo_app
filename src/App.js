import './App.css';
import { useQuery } from '@apollo/client'
import { ALL_TODOS } from './queries'
import Todos from './Todos'


const App = () => {
  const result = useQuery(ALL_TODOS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <Todos todos={result.data.allTodos}/>
  )
}

export default App