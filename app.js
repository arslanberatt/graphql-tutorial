require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;

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
      console.log(`🚀 Sunucu ${port} portunda çalışıyor`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB bağlantı hatası:', err.message);
  });
