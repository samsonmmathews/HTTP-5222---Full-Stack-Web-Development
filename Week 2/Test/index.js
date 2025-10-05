// IMPORT REQUIRED MODULES
import express, { response } from "express";
import { request } from "http";
import path from "path"; // to make available methods for path concatenation, etc.
import { MongoClient, ObjectId } from "mongodb"; // import the MongoClient class from the mongodb driver

//Connect to the db
// FOr MongoDB, the connection string has the following format:
// The protocol will be either mongodb:// (localhost) OR mongodb+srv:// (online)
// After the protocol, `dbuser:dbpassword@dbhost/`
const dbUrl = '<REPLACE_WITH_YOUR_OWN>';
const db = new MongoClient(dbUrl).db("testdb"); // Create a new client connection and select the "testdb" database

const __dirname = import.meta.dirname;

const app = express(); //create Express app
const port = process.env.PORT || "8888";

//set up templates in Express app
app.set("views", path.join(__dirname, "templates")); // for Mac users, it's recommended to use "views" as the template folder name (most reliable)
app.set("view engine", "pug"); //set app to use "Pug" as the template engine

// set up static path for static files
app.use(express.static(path.join(__dirname, "public")));

//* You NEED the following two lines if you want to treat POST/GET
// set up the Express app to extend the URLencoded format and use JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HOME PAGE
app.get("/", async(request, response) => {
    let links = await getLinks();
    // console.log(links);
    response.render("index", { title: "Home", menu: links })
});
app.get("/about", async(request, response) => {
    let links = await getLinks();
    response.render("about", { title: "About", menu: links })
});

// ADMIN PATHS
app.get("/admin/menu", async (request, response) => {
    let links = await getLinks();
    response.render("menu-list", { title: "Administer menu links", menu: links })
});
app.get("/admin/menu/add", async (request, response) => {
    let links = await getLinks();
    response.render("menu-add", { title: "Add menu link", menu: links })
});
app.post("/admin/menu/add/submit", async (request, response) => {
    // By default form data gets sent in URLencoded format even if it's a POST submission (e.g. weight=0&path=/about&name=About)

    // If it's a POST request, data is retrieved via request.body
    // If it's a GET request, data is retrieved via request.query
    // console.log(request.body);
    let newLink = {
        weight: request.body.weight,
        path: request.body.path,
        name: request.body.name
    };
    await addLink(newLink);
    response.redirect("/admin/menu");
});
app.get("/admin/menu/delete", async(request, response) => {
    let id = request.query.linkId;
    // console.log(id);
    await deleteLink(id);
    response.redirect("/admin/menu");
})

//set server to listen for incoming requests
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

// DB FUNCTIONS
// Function to select all documents from the menuLinks collection and return them.
async function getLinks() {
    let results = db.collection("menuLinks").find({});
    return await results.toArray(); // toArray() is an asynchronous function which converts a find cursor to an array of documents
}

// Function to insert one link document into the menuLinks collection
async function addLink(link) {
    let status = await db.collection("menuLinks").insertOne(link);
    console.log("Link added successfully");
}

// Function to delete one link document from the menuLinks collection which matches a given _id.
async function deleteLink(id) {
    let deleteQuery = { _id: new ObjectId(String(id)) };
    let result = await db.collection("menuLinks").deleteOne(deleteQuery);
    if(result.deletedCount === 1) {
        console.log("Link deleted successfully");
    }
}