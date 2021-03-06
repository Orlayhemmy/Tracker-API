const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Set up mongoose connection
const mongoDB = process.env.DB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = {
    dbStart: mongoose.connection,
    dbOff: mongoose.disconnect,
    flushCollections: async function () {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
          const collection = mongoose.connection.collections[collectionName];
          await collection.deleteMany();
        }
      }

}    

