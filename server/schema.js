import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'

let todos = [
  {
    text: "Todo 1",
    completed: true,
    id: "1"
  },
  {
    text: "Todo 2",
    completed: true,
    id: "2"
  },
  {
    text: "Todo 3",
    completed: false,
    id: "3"
  },
  {
    text: "Todo 4",
    completed: false,
    id: "4"
  },
]

export const typeDefs = gql`
  type Todo {
    text: String!
    completed: Boolean!
    id: ID!
  }

  type Query {
    allTodos: [Todo!]!
    todoFeed(offset: Int, limit: Int): [Todo!]!
  }

  type Mutation {
    addTodo(
      text: String!
     ): Todo
    updateTodo(
      text: String
      completed: Boolean
      id: ID!
    ): Todo
    deleteTodo(
      id: ID!
    ): Todo
  }
`

export const resolvers = {
  Query: {
    allTodos: () => todos,
    todoFeed: () => todos,
  },
  Mutation: {
    addTodo: (root, args) => {
      const todo = { text: args.text, completed: false, id: uuidv4() }
      todos = todos.concat(todo)
      return todo
    },
    updateTodo: (root, args) => {
      const todo = todos.find(t => t.id === args.id)
      if (!todo) {
        return null
      }

      const updatedTodo = { ...todo, completed: args.completed }
      todos = todos.map((t) => t.id !== args.id ? t : updatedTodo)
      return todo
    },
    deleteTodo: (root, args) => {
      const id = args.id
      const todo = todos.find(t => t.id === id)
      if (!todo) {
        return null
      }

      todos = todos.filter((t) => t.id !== id)
      return null
    }
  }
}
