const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

//Function to retrieve a list of trending movies.
async function getTrendingMovies() {
  let reqUrl = `${trakt}/movies/trending?limit=20&extended=full,images`;
  let response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}
//Function to retrieve a list of studios by IMDB movie ID
async function getStudiosByMovieId(imdbId) {
  let reqUrl = `${trakt}/movies/${imdbId}/studios`;
  let response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Function to retrieve a list of anticipated shows.
async function getAnticipatedShows() {
  let reqUrl = `${trakt}/shows/anticipated`;
  let response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Function to display info about a selected show
async function getShowDetails(showId) {
  let reqUrl = `${trakt}/shows/${showId}?extended=full,images`;
  let response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

export default {
  getTrendingMovies,
  getStudiosByMovieId,
  getAnticipatedShows,
  getShowDetails
};