const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const eventRoutes = require('./routes/events');
const { dbStart } = require('./dbConnection/index')
const app = express();


dotenv.config();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

dbStart.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', eventRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') app.listen(PORT, () => console.log('Application listening in port ', PORT));

module.exports = app