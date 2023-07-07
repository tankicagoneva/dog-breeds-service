const express = require("express");
const { MongoClient } = require("mongodb");
const dogRouter = require("./routers/dog.router");
const dogService = require("./services/dog.service");
require("dotenv").config();
const connectionString = process.env.MONGODB_URI;

const port = 3000;
const databaseName = "animals";

const connect = async () => {
  try {
    const client = await MongoClient.connect(connectionString);
    const db = client.db(databaseName);
    dogModel = db.collection("dogs");
    await dogService.registerModel(dogModel);
    console.log("Connected to db");
  } catch (err) {
    console.log("Cannot connect to db", err);
  }
};

const app = express();
app.use(express.json());

app.use("/dog-breeds", dogRouter);

async function startServer() {
  app.listen(port, (err) => {
    if (err) return console.log("Something bad happened", err);
    console.log(`Server is listening on port ${port}`);
  });
}

connect().then(startServer);
