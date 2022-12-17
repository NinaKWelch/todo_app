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

export const UPDATE_TODO = gql`
  mutation updateTodo($completed: Boolean!, $id: ID!) {
    updateTodo(
      completed: $completed,
      id: $id,
    ) {
      text
      completed
      id
    }
  }
`
export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(
      id: $id,
    ) {
      id
    }
  }
`