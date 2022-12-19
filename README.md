The following 3-hour test for a Junior mid-level full stack developer using GraphQL, Apollo, JavaScript, 
Node.js, and React will need to be added to a github repository and shared at the end of time and shared
to marius@anderspink.com. Ideally would be to complete as much as possible.

1. The developer should create a simple React app that fetches data from a GraphQL API using Apollo.
The app should have a single page with a list of items fetched from the API.
The developer should use Apollo Client to connect to the API and fetch the data, and then display 
the data on the page using React components.

2. The developer should add a form to the page that allows the user to add new items to the list.
The form should have input fields for the necessary data for the new item, and a submit button 
to send the data to the API. The developer should use Apollo Client to send a mutation to 
the API to create the new item. After the mutation is successful, the new item should be added 
to the list on the page.

3. The developer should modify the app to show a loading indicator while data is being fetched
from the API, and display an error message if there is an error fetching the data. This can be
done using Apollo Client's <Query> component, which has built-in support for loading and error
states.

4. The developer should add pagination to the app, so that only a limited number of items are
shown at a time, and the user can navigate to different pages to see more items. This can be
done by using the skip and limit arguments in the GraphQL query to only fetch a certain number
of items at a time, and using the <Pagination> component from a pagination library like
react-paginate to allow the user to navigate between pages.

5. The developer should write a simple Node.js server that exposes a GraphQL API with a single
query and multiple mutations. The query should return a list of items, and the mutation should allow
new items to be added to the list. The developer can use a library like graphql-yoga to quickly
set up a GraphQL server, and define the schema and resolvers for the query and mutations.

6. The developer should write a set of tests for the server using a testing framework like Jest,
to ensure that the query and mutations are working correctly. The tests should create a test
server, send queries and mutations to the server, and assert that the correct data is returned.

7. The developer should deploy the React app and Node.js server to a cloud platform like Heroku,
and make sure they are working correctly in a live environment. This can be done by creating a
new app on Heroku, connecting it to a Git repository, and pushing the code to the repository.
The developer should also set up the necessary environment variables and dependencies on Heroku
to run the app.

8. The developer should write a brief report summarizing the work done and any challenges
encountered during the test. The report should include a description of the features
implemented in the app, any challenges faced, and how they were overcome. It should also
include a link to the deployed app and any instructions for running the app locally.

// Schema Example

type Todo {
  id: ID!
  text: String!
  completed: Boolean!
}

type Query {
  todos: [Todo]!
}

type Mutation {
  addTodo(text: String!): Todo
  updateTodo(id: ID!, text: String, completed: Boolean): Todo
  deleteTodo(id: ID!): Todo
}


This schema defines a Todo type with three fields: id, text, and completed. It also defines a 
Query type with a single field, todos, which returns a list of Todo items. Finally, it
defines a Mutation type with three fields: addTodo, updateTodo, and deleteTodo, which allow
new to-do items to be added, existing to-do items to be updated, and to-do items to be deleted.