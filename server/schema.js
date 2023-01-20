import { GraphQLError } from 'graphql'
import gql from 'graphql-tag'
import { Todo } from './models/todo.js'


const handleError = (message, code) => {
  throw new GraphQLError(message, {
    extensions: { code }
  })
}

export const typeDefs = gql`
  type Todo {
    text: String!
    completed: Boolean!
    id: ID!
  }

  type Query {
    todoCount: Int
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
    todoCount: async () => Todo.collection.countDocuments(),
    allTodos: async () => {
      try {
        const todos = await Todo.find({})
        return todos
      } catch (error) {
        handleError(error.message, error.extensions?.code)
      }
    },
    todoFeed: async (_, args) => {
      try {
        const todos = await Todo.find({})

        if (args.offset && args.limit) {
          if (todos.length > args.offset) {
            if (todos.length > (args.offset + args.limit)) {
              return todos.slice(args.offset, args.offset + args.limit)
            } else {
              return todos.slice(args.offset)
            }
          }
        }

        return todos
      } catch (error) {
        handleError(error.message, error.extensions?.code)
      }
    }
  },
  Mutation: {
    addTodo: async (root, args) => {
      const todo = new Todo({ text: args.text, completed: false })

      try {
        await todo.save()
      } catch (error) {
        handleError(error.message, error.extensions?.code)
      }

      return todo
    },
    updateTodo: async (root, args) => {
      try {
        const changedTodo = await Todo.findById(args.id)

        if (!changedTodo) {
          return null
        }

        if (changedTodo) {
          changedTodo.completed = args.completed

          try {
            await changedTodo.save()
          } catch (error) {
            handleError(error.message, error.extensions?.code)
          }

          return changedTodo
        }
      } catch (error) {
        handleError(error.message, error.extensions?.code)
      }
    },
    deleteTodo: async (_, args) => {
      try {
        await Todo.findByIdAndDelete(args.id)
      } catch (error) {
        handleError(error.message, error.extensions?.code)
      }

      return null
    }
  }
}
