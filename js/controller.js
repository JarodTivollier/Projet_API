import { view } from './view.js';
import { Favorite } from './favorite.js';
import { APIMovie } from './movie.js';


let listFavorites = new Favorite;
let apiMovie = new APIMovie;

// Search what is going to be displayed
if (localStorage.getItem("searchMoviesId")) {
  // Display the result of the search
  console.log('je cherche...');
} else {
  // Display the default movies
  const movies = await apiMovie.getMovies();
  movies.forEach(async movie => {
    preDisplay(movie.id);
  });
}

// Display the favorites movies
view.btnDisplayFavorite.addEventListener('click', () => {
  view.moviesDiv.innerHTML = '';
  listFavorites.getList().forEach(async favorite => {
    preDisplay(favorite);
  });
});

/**
 * Recover the movie's information to display it
 * @param {*} movie 
 */
async function preDisplay(movie) {
  const fullMovie = await apiMovie.getMovie(movie); // movie's general information
  const actors = await apiMovie.getActors(movie); // movie's cast
  view.displayMovie(fullMovie, actors, listFavorites); // call the displaying function
}
