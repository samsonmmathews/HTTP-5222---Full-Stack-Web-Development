import "dotenv/config"; //load from the .env file
import express from "express";
import path from "path";

import db from "./components/movies/db.js"; //load db.js

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let movieList = await db.getMovies();
  //if there's nothing in the movies collection, initialize with some content then get the movies again
  if (!movieList.length) {
    await db.initializeMovies(); 
    movieList = await db.getMovies();
  }
  response.render("index", { movies: movieList });
});
app.get("/add", async (request, response) => {
  //add a movie with some hardcoded values to test
  await db.addMovie("Inception", 2010, "PG13");
  response.redirect("/");
});
// app.get("/insert", async (request, response) => {
//   await db.insertPet("Fred", "fish", "Koi", 1);
//   response.redirect("/");
// });
app.get("/update", async (request, response) => {
  //update something
  await db.updateMovieRating("Inception", "R");
  response.redirect("/");
});
app.get("/delete", async (req, res) => {
  await db.deleteMoviesByRating("R");
  res.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

