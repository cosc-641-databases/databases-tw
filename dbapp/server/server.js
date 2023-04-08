const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// HTTP headers management.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Mongoose Schemas/Models.
const User = require("./models/user");

// Start Express server only if Mongoose can connect to MongoDB Atlas.
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    // Start Express server.
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

//////////////////////
// CONNECTION TESTS //
////////////////////////////////////////////////////////////////
// MongoDB.
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
