export class Favorite {
    /**
     * List of favorites
     * @type {Array}
     */
    _list;
  
    /**
     * Instance of localStorage
     * @type {Storage}
     */
    localStorage;
  
    /**
     * Constructor of the class Favorite.
     * @param {Storage} [localStorage=window.localStorage] - instance of localStorage 
     */
    constructor(localStorage = window.localStorage) {
      this.localStorage = localStorage;
      this.retrieve(); // Load favorites
    }
  
    /**
     * Get the list of favorites
     * @returns the list
     */
    getList() {
      return this._list;
    }

    /**
     * Know if a favorite is in the list
     * @param {*} favorite 
     * @returns true if the favorite is in the list, else false
     */
    isInList(favorite) {
      return this._list.includes(favorite);
    }
  
    /**
     * Save the list in the localStorage
     */
    save() {
      this.localStorage.setItem("listFavoris", JSON.stringify(this._list));
    }
  
    /**
     * Retrieve the list form the localStorage
     */
    retrieve() {
      let favoritesJSONSL = this.localStorage.getItem("listFavoris");
      if (favoritesJSONSL) {
        this._list = JSON.parse(favoritesJSONSL);
      } else {
        this._list = [];
      }
    }
  
    /**
     * Add a favorite if it's not yet in the list
     * @param {*} newFavorite 
     */
    add(newFavorite) {
      if (!this._list.includes(newFavorite)) {
        this._list.push(newFavorite);
        console.log('The favorite was added');
      }
      this.save();
    }
  
    /**
     * Remove a favorite if it was in the list
     * @param {*} oldFavorite 
     */
    remove(oldFavorite) {
      let index = this._list.indexOf(oldFavorite);
      if (index !== -1) {
        this._list.splice(index, 1);
        console.log('The favorite was removed');
      }
      this.save();
    }
  }
  