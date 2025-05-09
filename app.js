require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./server/schema/schema');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB bağlantısını başlatan asenkron fonksiyon
async function startServer() {
  try {
    console.log('🔄 MongoDB bağlantısı başlatılıyor...');

    await mongoose.connect(
      `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphql-project.e5guub7.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority&appName=graphql-project`,
    );

    console.log('✅ MongoDB bağlantısı başarılı');

    // GraphQL endpoint'i tanımla
    app.use(
      '/graphql',
      graphqlHTTP({
        graphiql: true,
        schema,
      }),
    );

    // Express sunucusunu başlat
    app.listen(port, () => {
      console.log(`🚀 Express sunucusu ${port} portunda çalışıyor`);
    });
  } catch (err) {
    console.error('❌ MongoDB bağlantı hatası:', err.message);
  }
}

startServer();
