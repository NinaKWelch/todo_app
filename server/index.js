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
      todos = todos.map((todo) => todo.id !== args.id ? todo : args)
    },
    deleteTodo: (root, id) => {
      todos = todos.filter((todo) => todo.id !== id)
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
