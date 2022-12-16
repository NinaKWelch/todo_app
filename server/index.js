const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

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
]

const typeDefs = gql`
  type Todo {
    text: String!
    completed: Boolean!
    id: ID!
  }

  type Query {
    allTodos: [Todo!]!
  }

  type Mutation {
    addTodo(
      text: String!
      completed: Boolean!
     ): Todo
    updateTodo(
      completed: Boolean!
      id: ID!
    ): Todo
    deleteTodo(
      id: ID!
    ): Todo
  }
`

const resolvers = {
  Query: {
    allTodos: () => todos,
  },
  Mutation: {
    addTodo: (root, args) => {
      const todo = { ...args, id: uuid() }
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
