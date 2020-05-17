require('colors');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;
const PID = process.pid;


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}. Process PID: ${PID}`.cyan);
});
