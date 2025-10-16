//import required modules
import express from "express";
import path from "path";
import "dotenv/config";

import trakt from "./components/trakt/api.js";

const __dirname = import.meta.dirname;

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  let movies = await trakt.getTrendingMovies();
  console.log(movies);
  response.render("index", {movies: movies});
});
app.get("/movie/:imdbId/studios", async (request, response) => {
  let studios = await trakt.getStudiosByMovieId(request.params.imdbId);
  response.render("studios", {studios: studios});
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


