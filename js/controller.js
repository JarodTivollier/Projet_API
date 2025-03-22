import { view } from './view.js';
import { Favorite } from './favorite.js';
import { APIMovie } from './movie.js';
import { SearchResult } from './search-result.js';


const listFavorites = new Favorite;
const apiMovie = new APIMovie;
const searchResult = new SearchResult;

// Search what is going to be displayed
if (searchResult.getList().length > 0) {
  // Change the subtitle of the page
  view.addIndicator('Here are the result for your research')
  // Display the result of the search
  searchResult.getList().forEach(movie => {
    preDisplay(movie);
  });
  // Erase the list
  searchResult.resetList();
  searchResult.save();
} else {
  // Change the subtitle of the page
  view.addIndicator('Here are random movies, maybe because your research didn\'t have any matches')
  // Display the default movies
  displayDefault();
}

// Button random search
view.btnRandomSearch.addEventListener('click', () => {
  displayDefault();
})

// Button display favorites
view.btnDisplayFavorite.addEventListener('click', () => {
  view.moviesDiv.innerHTML = '';
  listFavorites.getList().forEach(async favorite => {
    preDisplay(favorite);
  });
});

/**
 * Display the default list of movies
 */
async function displayDefault() {
  view.moviesDiv.innerHTML = '';
  const movies = await apiMovie.getMovies();
  movies.forEach(async movie => {
    preDisplay(movie.id);
  });
}

/**
 * Recover the movie's information to display it
 * @param {*} movie 
 */
async function preDisplay(movie) {
  const fullMovie = await apiMovie.getMovie(movie); // movie's general information
  const actors = await apiMovie.getActors(movie); // movie's cast
  view.displayMovie(fullMovie, actors, listFavorites); // call the displaying function
}
