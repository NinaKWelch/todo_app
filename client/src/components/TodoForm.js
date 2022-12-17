import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_TODOS, CREATE_TODO } from '../queries'

const TodoForm = () => {
  const [text, setText ] = useState('')

  const [ createTodo ] = useMutation(CREATE_TODO, {
    refetchQueries: [ { query: ALL_TODOS } ]
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    createTodo({ variables: { text } })
    setText('')
  }

  const handleChange = (e) => setText(e.target.value)

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
      </label>{' '}
      <button type='submit'>Add</button>
    </form>
  )
}

export default TodoForm
