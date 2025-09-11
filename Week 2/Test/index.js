// IMPORT REQUIRED MODULES
import express, { response } from "express";
import { request } from "http";
import path from "path"; // to make available methods for path concatenation, etc.

const __dirname = import.meta.dirname;

const app = express(); //create Express app
const port = process.env.PORT || "8888";

//set up templates in Express app
app.set("views", path.join(__dirname, "templates")); // for Mac users, it's recommended to use "views" as the template folder name (most reliable)
app.set("view engine", "pug"); //set app to use "Pug" as the template engine

// set up static path for static files
app.use(express.static(path.join(__dirname, "public")));

// HOME PAGE
app.get("/", (request, response) => {
    response.render("index", { title: "Home" })
});
app.get("/about", (request, response) => {
    response.render("about", { title: "About" })
});

// test app to see if it's working
// app.get("/", (request, response) => {
//     response.status(200).send("Random text to display");
// });

//set server to listen for incoming requests
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});