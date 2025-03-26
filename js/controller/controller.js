import { view } from '../view/view.js';
import { Favorite } from '../model/favorite.js';
import { APIMovie } from '../model/APIMovie.js';
import { SearchResult } from '../model/search-result.js';

export class Controleur {
  constructor() {
    this.apiMovie = new APIMovie;
    this.listFavorites = new Favorite;
    this.searchResult = new SearchResult;
  }

  initialize() {
    this.displayPage();
    this.addEventListener();
  }

  displayPage() {
    // Search what is going to be displayed
    if (this.searchResult.getList().length > 0) {
      // Change the subtitle of the page
      view.changeIndicator('Here are the result for your research');
      // Display the result of the search
      this.searchResult.getList().forEach(movie => {
        this.preDisplay(movie);
      });
      // Erase the list
      this.searchResult.resetList();
      this.searchResult.save();
    } else {
      // Change the subtitle of the page
      view.changeIndicator('Here are random movies, maybe because your research didn\'t have any matches');
      // Display the default movies
      this.displayDefault();
    }
  }

  /**
   * Display the default list of movies
   */
  async displayDefault() {
    view.moviesDiv.innerHTML = '';
    const movies = await this.apiMovie.getMovies();
    movies.forEach(async movie => {
      this.preDisplay(movie.id);
    });
  }
  async displayRandom() {
    view.moviesDiv.innerHTML = '';
    const movies = await this.apiMovie.getRandomMovies();
    movies.forEach(async movie => {
      this.preDisplay(movie.id);
    });
  }

  /**
   * Recover the movie's information to display it
   * @param {*} movie 
   */
  async preDisplay(movie) {
    const fullMovie = await this.apiMovie.getMovie(movie); // movie's general information
    const actors = await this.apiMovie.getActors(movie); // movie's cast
    view.displayMovie(fullMovie, actors, this.listFavorites); // call the displaying function
  }

  addEventListener() {
    // Button random search
    view.btnRandomSearch.addEventListener('click', () => {
      view.changeIndicator('Here are random movies');
      this.displayRandom();
    })

    // Button display favorites
    view.btnDisplayFavorite.addEventListener('click', () => {
      view.moviesDiv.innerHTML = '';
      if (this.listFavorites.getList().length == 0) {
        view.changeIndicator('It seems that you don\'t have any favorites yet');
      } else {
        view.changeIndicator('Here are your favorite movies');
        this.listFavorites.getList().forEach(async favorite => {
          this.preDisplay(favorite);
        });
      }
    });
  }
}