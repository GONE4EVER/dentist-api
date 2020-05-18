const express = require('express');
const mongoose = require('mongoose');

const doctorsRoute = require('./modules/doctors/routes');
const patientsRoute = require('./modules/patients/routes');
const recordsRoute = require('./modules/records/routes');


mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  // eslint-disable-next-line
  () => console.log('Mongo connected'.magenta)
);

const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'/* 'http://localhost: 8080' */);
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

app.use(express.json());

app.use('/api/doctors', doctorsRoute);
app.use('/api/patients', patientsRoute);
app.use('/api/records', recordsRoute);


module.exports = app;
