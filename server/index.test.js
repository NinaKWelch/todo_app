// Alternative for using test database
// https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners
// Mongoose recommends Mocha instead of Jest
// https://mongoosejs.com/docs/jest.html
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs, resolvers } from './schema'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import { Todo } from './models/todo.js'

// Do not display DeprecationWarning
mongoose.set('strictQuery', true)

// https://www.apollographql.com/docs/apollo-server/testing/testing/#end-to-end-testing
export const createApolloServer = async (listenOptions = { port: 4000 }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, { listen: listenOptions });
 
  // return the server instance and the url the server is listening on
  return { server, url }
}

describe('Integration tests', () => {
  let server, url
  
  beforeAll(async () => {
    try {
      const db = await MongoMemoryServer.create()

      if (db) {
        try {
          await mongoose.connect(db.getUri(), { dbName: "todoAppTest" })
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err)
    }
    
    try {
      // wrap object destructuring in parentheses because we already declared these variables
      // port 0 tlest the server pick its own ephemeral port for testing
      ({ server, url } = await createApolloServer({ port: 0 }))
    } catch (err) {
      console.log(err)
    }
  })

  afterAll(async () => {
    await server?.stop()
    await mongoose.connection?.close()
  })
  
  beforeEach(async () => {
    let todo = new Todo({ text: 'Todo 1', completed: false })
    await todo.save()
    todo = new Todo({ text: 'Todo 2', completed: false })
    await todo.save()
    todo = new Todo({ text: 'Todo 3', completed: false })
    await todo.save()
  })

  afterEach(async () => {
    await Todo.deleteMany({})
  })

  test('query returns todo list length', async () => {
    const { _body, error } = await request(url).post('/').send({
      query: 
        `query {
          todoCount
        }`,
    })

    expect(error).toBeFalsy()
    expect(_body.data.todoCount).toBe(3)
  })

  test('query returns whole todo list', async () => {
    const { _body, error } = await request(url).post('/').send({
      query: 
        `query {
          todoFeed {
            text
            completed
            id
          }
        }`,
    })

    expect(error).toBeFalsy()
    expect(_body.data.todoFeed).toHaveLength(3)
  })

  test('query returns partial todo list', async () => {
    const { _body, error } = await request(url).post('/').send({
      query: 
        `query todoFeed($offset: Int, $limit: Int) {
          todoFeed(offset: $offset, limit: $limit) {
            text
            completed
            id
          }
        }`,
        variables: { offset: 1, limit: 1 },
    })

    expect(error).toBeFalsy()
    expect(_body.data.todoFeed).toHaveLength(1)
  })


  test('mutation returns new todo', async () => {
    const { _body, error } = await request(url).post('/').send({
      query: 
        `mutation addTodo($text: String!) {
          addTodo(
            text: $text,
          ) {
            text
            completed
            id
          }
        }`,
        variables: { text: "New todo" },
    })

    expect(error).toBeFalsy()
    expect(_body.data.addTodo.text).toBe("New todo")
    expect(_body.data.addTodo.completed).toBe(false)
  })

  test('mutation returns updated todo', async () => {
      const { _id } = await Todo.findOne({ text: 'Todo 1' })

      const { _body, error } = await request(url).post('/').send({
        query: 
          `mutation updateTodo($completed: Boolean, $id: ID!) {
            updateTodo(
              completed: $completed,
              id: $id,
            ) {
              text
              completed
              id
            }
          }`,
          variables: { completed: true, id: _id },
      })

      expect(error).toBeFalsy()
      expect(_body.data.updateTodo.completed).toBe(true)
  })

  test('mutation deletes todo', async () => {
    const { _id } = await Todo.findOne({ text: 'Todo 1' })

    const { _body, error } = await request(url).post('/').send({
      query: 
        `mutation deleteTodo($id: ID!) {
          deleteTodo(
            id: $id,
          ) {
            id
          }
        }`,
        variables: { id: _id },
    })

    expect(error).toBeFalsy()
    expect(_body.data.deleteTodo).toBe(null)
  })
})
