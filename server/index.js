// https://www.apollographql.com/docs/apollo-server/api/express-middleware
// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { typeDefs, resolvers } from './schema.js'

dotenv.config()

// Do not display DeprecationWarning
mongoose.set('strictQuery', true)
console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// express server
const start = async () => {
  const app = express()
  const httpServer = createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  )
  
  httpServer.listen((process.env.PORT || 4000), () =>
    console.log(`Server is now running on http://localhost:${process.env.PORT}`)
  )
}

// start the server
start()
