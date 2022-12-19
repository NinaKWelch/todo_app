import { useMutation } from '@apollo/client'
import { UPDATE_TODO, DELETE_TODO, ALL_TODOS, TODO_FEED } from '../queries'

const TodoListItem = ({ todo }) => {
  const [ updateTodo ] = useMutation(UPDATE_TODO, {
    refetchQueries: [ { query: ALL_TODOS }, { query: TODO_FEED } ]
  })

  const [ deleteTodo ] = useMutation(DELETE_TODO, {
    refetchQueries: [ { query: ALL_TODOS }, { query: TODO_FEED } ]
  })

  const update = () =>
    updateTodo({ variables: { completed: !todo.completed, id: todo.id } })

  const remove  = () => 
    deleteTodo({ variables: { id: todo.id } })
 
  const buttonText = todo.completed
  ? 'mark as to be done'
  : 'mark as done'

  return (
    <li>
      {todo.text}{' '}
      <button onClick={update}>{buttonText}</button>{' '}
      <button onClick={remove}>Delete</button>
    </li>
  )
}


export default TodoListItem