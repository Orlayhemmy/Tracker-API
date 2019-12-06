const express = require('express');
const cors = require('cors');

const { dbStart } = require('./dbConnection/index')
const eventRoutes = require('./routes/events');

const app = express()

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



app.listen(PORT, () => console.log('Application listening in port ', PORT));
