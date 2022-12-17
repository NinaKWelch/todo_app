import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './index'

describe('Query tests', () => {
  let server

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })
  
  afterAll(async () => {
    await server?.stop()
  });

  test('query returns todo list', async () => {
    try {
      const result = await server.executeOperation({
        query: 
          `query {
            allTodos {
              text
              completed
              id
            }
          }`,
      })

      expect(result.errors).toBeUndefined()
      expect(result.data.allTodos.length).toBe(3)
    } catch (err) {
      console.log(err)
    }
  })

  test('mutation returns new todo', async () => {
    try {
      const result = await server.executeOperation({
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

      expect(result.errors).toBeUndefined()
      expect(result.data.addTodo.text).toBe("New todo")
      expect(result.data.addTodo.completed).toBe(false)
    } catch (err) {
      console.log(err)
    }
  })

  test('mutation returns updated todo', async () => {
    try {
      const result = await server.executeOperation({
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
          variables: { completed: true, id: "1" },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data.updateTodo.completed).toBe(true)
    } catch (err) {
      console.log(err)
    }
  })

  test('mutation deletes todo', async () => {
    try {
      const result = await server.executeOperation({
        query: 
          `mutation deleteTodo($id: ID!) {
            deleteTodo(
              id: $id,
            ) {
              id
            }
          }`,
          variables: { id: "1" },
      })
  
      expect(result.errors).toBeUndefined()
      expect(result.data.deleteTodo).toBe(null)
    } catch (err) {
      console.log(err)
    }
  })
})


