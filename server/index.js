// https://www.apollographql.com/docs/apollo-server/api/express-middleware
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { PORT, MONGODB_URI } from './utils/config.js'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { typeDefs, resolvers } from './schema.js'

// Do not display DeprecationWarning
mongoose.set('strictQuery', true)
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// express server
export const start = async () => {
  const app = express()
  const httpServer = createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  try {
    await server.start()
  } catch (err) {
    console.log(err)
  }

  app.use(
    '/',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  )
  
  httpServer.listen((PORT || 4000), () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

// start the server
start()
