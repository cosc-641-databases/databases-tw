const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// HTTP headers management for CORS.
app.use((req, res, next) => {
  // Allow access from any origin (CORS).
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Set allowed/auto-included headers.
  res.setHeader(
    'Access-Control-Allow-Headers',
    // 'Authorization' header will store JWT auth token.
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // Specify available methods.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Register user routes on base path.
const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Establish connection to MongoDB Atlas via Mongoose.
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(port, async () => {
      // Uncomment to see test connection established message.
      // mongoTestConn(port);
      // Uncomment to see test data after connection established.
      // testMongo();
    })
  })
  .catch(err => {
    console.log(err);
  });

////////////////////////////////
/// MONGODB CONNECTION TESTS ///
////////////////////////////////////////////////////////////////

const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
// Quick test to see that MongoDB Atlas is available/reachable.
async function mongoTestConn(port) {
  try {
    await client.connect();
    await client.db('db2').command({ ping: 1 });
    console.log("Connected to MongoDB Atlas");
    console.log(`Server is running on port: ${port}`);
  } catch(error) {
    console.log(error);
  }
  finally {
    await client.close();
  }
}
// Test function to show MongoDB returns data.
async function testMongo() {
  const database = await client.db("db2");
  const records = await database.collection("records");
  const query = { name: 'test doc' };
  const rec = await records.findOne(query);
  await console.log(rec);
}
////////////////////////////////////////////////////////////////
