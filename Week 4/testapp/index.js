//IMPORT REQUIRED MODULES
import express from "express"; //const express = require("express")
import path from "path"; //to make available methods for path concatenation, etc.

import "dotenv/config"; //to use .env file for environment variables. Load the environment variables


const __dirname = import.meta.dirname; //current app's root directory

const app = express(); //create Express app
const port = process.env.PORT || "8888";

//set up templates in Express app
app.set("views", path.join(__dirname, "templates")); //for Mac users, it's recommended to use "views" as the template folder name (most reliable)
app.set("view engine", "pug"); //set app to use "Pug" as the template engine

//set up static path for static files
app.use(express.static(path.join(__dirname, "public")));

//use router from router.js
//Note: Typically, I would group all imports together at the top but for clarity, I'm putting the router.js import here.
import pages from "./components/menuLinks/router.js";
app.use("/", pages);
import menuAdminPages from "./components/router.js";
app.use("/", pages);
app.use("/admin/menu", menuAdminPages);

//set server to listen for incoming requests
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

