export class SearchResult {
    /**
     * List of search movies
     * @type {Array}
     */
    _list;
  
    /**
     * Instance of localStorage
     * @type {Storage}
     */
    localStorage;
  
    /**
     * Constructor of the class SearchResult.
     * @param {Storage} [localStorage=window.localStorage] - instance of localStorage 
     */
    constructor(localStorage = window.localStorage) {
      this.localStorage = localStorage;
      this.retrieve() // Load movies
    }
  
    /**
     * Get the list of search movies
     * @returns the list
     */
    getList() {
      return this._list;
    }

    /**
     * Reset the list to change the movie in the list
     */
    resetList() {
        this._list = [];
    }
  
    /**
     * Save the list in the localStorage
     */
    save() {
        this.localStorage.setItem("searchMoviesId", JSON.stringify(this._list));
    }
  
    /**
     * Retrieve the list form the localStorage
     */
    retrieve() {
      let favoritesJSONSL = this.localStorage.getItem("searchMoviesId");
      if (favoritesJSONSL) {
        this._list = JSON.parse(favoritesJSONSL);
      } else {
        this._list = [];
      }
    }
  
    /**
     * Add a movie in the list
     * @param {*} movieId 
     */
    add(movieId) {
        this._list.push(movieId);
    }
  }
  