import {MongoClient, ObjectId} from "mongodb"; //import the MongoClient class from the mongodb driver and the ObjectId class (for converting to an ObjectId type) from the driver

//CONNECT TO THE DB
//For MongoDB, the connection string has the following format:
//The protocol will be either mongodb:// (localhost) OR mongodb+srv:// (online)
//After the protocol, `dbuser:dbpassword@dbhost/`
const dbUrl = process.env.MONGOURI;
const db = new MongoClient(dbUrl).db("testdb"); //create a new client connection and select the "testdb" database

//DB FUNCTIONS
//Function to select all documents from the menuLinks collection and return them.
async function getLinks() {
  let results = db.collection("menuLinks").find({});
  return await results.toArray(); //toArray() is an asynchronous function which converts a find cursor to an array of documents
}

//Function to insert one link document into the menuLinks collection.
async function addLink(link) {
  let status = await db.collection("menuLinks").insertOne(link);
  console.log("Link added successfully");
}

//Function to delete one link document from the menuLinks collection which matches a given _id.
async function deleteLink(id) {
  let deleteQuery = { _id: new ObjectId(String(id)) };
  let result = await db.collection("menuLinks").deleteOne(deleteQuery);
  if (result.deletedCount === 1)
    console.log("Link deleted successfully");
}

export default {
  getLinks,
  addLink,
  deleteLink
};