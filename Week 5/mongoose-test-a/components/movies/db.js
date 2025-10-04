import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Schema and model
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  rating: String
});
//By default, a model will be associated with a collection named as the plural form of the model name.
const Movie = mongoose.model("Movie", MovieSchema);

await mongoose.connect(dbUrl); //if the connection string has a user and password, you should use await

//MONGODB FUNCTIONS
// async function connect() {
//   await mongoose.connect(dbUrl); //connect to mongodb
// }

//Function to initialize movie collection.
async function initializeMovies() {
  let movieArray = [
    {
      title: "The Dark Knight",
      year: 2008,
      rating: "PG13" 
    },
    {
      title: "Coco",
      year: 2017,
      rating: "PG"
    }
  ];
  await Movie.insertMany(movieArray);
}
//Get all movies from the pets collection
async function getMovies() {
  return await Movie.find({}); //return array for find all
}
//Add one movie to the movies collection
async function addMovie(title, year, rating) {
  const newMovie = new Movie({
    title,
    year: parseInt(year),
    rating
  });
  await newMovie.save(); //save to the DB
}
// Update movie rating
async function updateMovieRating(title, newRating) {
  await Movie.updateOne(
    { title },
    { rating: newRating }
  );
}

// Delete movies by rating
async function deleteMoviesByRating(rating) {
  await Movie.deleteMany(
    { rating }
  );
}

export default {
  initializeMovies,
  getMovies,
  addMovie,
  updateMovieRating,
  deleteMoviesByRating
};