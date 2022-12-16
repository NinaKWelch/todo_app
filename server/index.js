const { ApolloServer, gql } = require('apollo-server')

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
    completed: Boolean
    id: ID!
  }

  type Query {
    allTodos: [Todo!]!
  }
`

const resolvers = {
  Query: {
    allTodos: () => todos,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
