import { useMutation } from '@apollo/client'
import { UPDATE_TODO, DELETE_TODO, ALL_TODOS } from '../queries'

const TodoListItem = ({ todo }) => {
 
  const [ updateTodo ] = useMutation(UPDATE_TODO, {
    refetchQueries: [ { query: ALL_TODOS } ]
  })


  const [ deleteTodo ] = useMutation(DELETE_TODO, {
    refetchQueries: [ { query: ALL_TODOS } ]
  })

  const update = () =>
    updateTodo({ variables: { text: todo.text, completed: !todo.completed, id: todo.id } })

  const remove  = () => 
    deleteTodo({ variables: { text: todo.text, completed: !todo.completed, id: todo.id } })
 
  const buttonText = todo.completed
  ? 'mark as to be done'
  : 'mark as done'

  return (
    <li>
      {todo.text}{' '}
      <button onClick={update}>{buttonText}</button>
      <button onClick={remove}>Delete</button>
      </li>
  )
}


export default TodoListItem