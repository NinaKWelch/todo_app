import { gql } from '@apollo/client'

export const ALL_TODOS = gql`
  query {
    allTodos {
      text
      completed
      id
    }
  }
`

export const CREATE_TODO = gql`
  mutation createTodo($text: String!, $completed: Boolean!) {
    addTodo(
      text: $text,
      completed: $completed,
    ) {
      text
      completed
      id
    }
  }
` 