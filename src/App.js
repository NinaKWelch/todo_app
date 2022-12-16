import './App.css';
import { gql, useQuery } from '@apollo/client'
import Todos from './Todos'

const ALL_TODOS = gql`
query {
  allTodos {
    text
    completed
    id
  }
}
`
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