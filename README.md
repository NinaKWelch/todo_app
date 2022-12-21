# Todo React App with GraphQL and Apollo

## Webpage

Currently the app can only be run locally.

## How to run locally

### Server

1. Navigate to the _todo_app_ root folder and switch to _add_ons_ branch

`git checkout add_ons`

2. Navigate to the _todo_app/server_ folder and install dependencies if needed

`npm install`

3. Start the server

`npm start` or `npm run dev`

Both options start the server at http://localhost:4000/

### Server testing

1. Navigate to the _todo_app/server_ folder

2. Run tests

`npm run test`

### Client

When server is up and running, and you are on the _add_ons_ branch:

1. Navigate to the _todo_app/client_ folder and install dependencies if needed

`npm install`

2. Start the app

`npm start`.

## Summary

Having had a look at the test requirements I knew immediately, that I would not be able to complete all of them in the given time. Knowing this, my plan was to attempt completing parts 1, 2, 3, 5 and possibly 6. In the end I did manage to do first four within 3 hours.

For these the biggest challenge was time and that showed in the rushed execution which usually means the code would need refactoring to be of a good standard. 

The most techincally challenging feature for me would have been the pagination, as I have not done it before with graphQl. 

## CODA

After completing the timed test I created another git branch (_add-ons_) and kept on working the code. I also added tests and pagination. I stopped short of deploying the app on Heroku, as they no longer offer the free tier.

Most of my time was spent on the pagination, which proved challenging. It required a lot of reading, mainly Apollo docs and then working out a simple way to integrate the pagination library on the front end.

The app logic could still benefit from some improvement. At the moment, all changes to the todo list are updated by fetching data from the server. Better option would be to use app state. This would require server side error handling for graphQL mutations and the use of asynchronous data fetching at the front end.

The total number of todos should also be included in the feed query, which might require a change to a [cursor based pagination](https://graphql.org/learn/pagination/#complete-connection-model).

It would also be good to add tests to the front end.

## Path to deployment

1. Add user sign up and login

2. Add database for saving data

3. Set up a new Heroku application

4. Enable server production mode

5. Automate build and deployment

