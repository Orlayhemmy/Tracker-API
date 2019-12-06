const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Set up mongoose connection
const mongoDB = process.env.DB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = {
  dbStart: mongoose.connection
}
