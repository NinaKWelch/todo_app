# Todo React App with GraphQL and Apollo

## Webpage

Currently the app can only be run locally.

## How to run locally

### Server

Navigate to the _todo_app/server_ file and run `npm start` or `npm run dev`.

Both options start the server at http://localhost:4000/

### Server testing

Navigate to the _todo_app/server_ file and run `npm run test`

### Client

When server is ready, navigate to the _todo_app/client_ file and run `npm start`.

## Summary

Having had a look at the test requirements I knew immediately, that I would not be able to complete all of them in the given time. Knowing this, my plan was to attempt completing parts 1, 2, 3, 5 and possibly 6. In the end I did manage to do first four within 3 hours.

For these the biggest challenge was time and that showed in the rushed execution which usually means the code would need refactoring to be of a good standard. 

The most techincally challenging feature for me would have been the pagination, as I have not done it before with graphQl. 

## CODA

After completing the timed test I created another git branch (_add-ons_) and kept on working the code. I also added tests and pagination. I stopped short of deploying the app on Heroku, as they no longer offer the free tier.

Most of my time was spent on the pagination, which proved challenging. It required a lot of reading, mainly Apollo docs and then working out a simple way to integrate the pagination library on the front end.