const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  }),
);

mongoose
  .connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphql-project.e5guub7.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority&appName=graphql-project`,
  )
  .then(() => {
    app.listen(port, () => {
      console.log('Listening for request on my awsome port 4000');
    });
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });
