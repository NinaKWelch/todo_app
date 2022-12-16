import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_TODOS, CREATE_TODO } from './queries'

const TodoForm = () => {
  const [text, setText ] = useState('')
  const [completed, setCompleted ] = useState(false)

  const [ createTodo ] = useMutation(CREATE_TODO, {
    refetchQueries: [ { query: ALL_TODOS } ]
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    createTodo({  variables: { text, completed } })

    setText('')
    setCompleted(false)
  }

  const handleChange = (e) => {
    const target = e.target

    switch (target.name) {
      case 'text':
        setText(target.value)
        break
      case 'completed':
        setCompleted(!completed)
        break
      default:
        return
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text:{' '}
        <input
          type="text"
          name="text"
          value={text}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Completed:{' '}
        <input
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Add</button>
    </form>
  )
}

export default TodoForm
