const express = require('express');
const mongoose = require('mongoose');


mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  // eslint-disable-next-line
  () => console.log('Mongo connected'.magenta)
);

const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost: 8000');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept, If-Modified-Since, ETag, Authorization',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS',
  );

  res.type('json');

  next();
});


module.exports = app;
