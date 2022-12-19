import React from 'react'
import ReactDOM from 'react-dom/client'
import { offsetLimitPagination } from "@apollo/client/utilities"
import App from './App'
import reportWebVitals from './reportWebVitals'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todoFeed: {
            ...offsetLimitPagination(),
            read(existing, { args: { offset, limit }}) {
              return existing && existing.slice(offset, offset + limit)
            },
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
