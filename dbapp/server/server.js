const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// MongoDB Dependencies.
const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

// Start Express server.
app.listen(port, () => {
  // Connect to the database.
  mongoConn().catch(console.dir);
  // Uncomment to see test data after connection established.
  // testMongo();
  console.log(`Server is running on port: ${port}`);
});

// MongoDB Functions.
async function mongoConn() {
  try {
    await client.connect();
    await client.db('db2').command({ ping: 1 });
    console.log("Connected to MongoDB Atlas");
  } finally {
    await client.close();
  }
}

// Test function to show MongoDB returns data.
async function testMongo() {
  const database = await client.db("db2");
  const records = await database.collection("records");
  const query = { name: 'test doc' };
  const rec = await records.findOne(query);
  console.log(rec);
}
