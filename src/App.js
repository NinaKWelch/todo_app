import './App.css';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const App = () => {
  return (
    <>
      <h1>Todo App</h1>
      <h2>Add Todo</h2>
      <TodoForm  />
      <h2>Todo list:</h2>
      <TodoList />
    </>

  )
}

export default App