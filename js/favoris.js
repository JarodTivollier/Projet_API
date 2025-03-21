export class Favoris {
    /**
     * Liste de favoris
     * @type {Array}
     */
    _listFavoris;
  
    /**
     * Instance de localStorage
     * @type {Storage}
     */
    localStorage;
  
    /**
     * Constructeur de la classe Favoris.
     * @param {Storage} [localStorage=window.localStorage] - instance de localStorage à utiliser 
     */
    constructor(localStorage = window.localStorage) {
      this.localStorage = localStorage;
      this.retrieve(); // Charger les favoris au moment de l'instanciation
    }
  
    getList() {
      return this._listFavoris;
    }

    isInList(favoris) {
      return this._listFavoris.includes(favoris);
    }
  
    save() {
      this.localStorage.setItem("listFavoris", JSON.stringify(this._listFavoris));
    }
  
    retrieve() {
      let favorisJSONSL = this.localStorage.getItem("listFavoris");
      if (favorisJSONSL) {
        this._listFavoris = JSON.parse(favorisJSONSL);
      } else {
        this._listFavoris = [];
      }
    }
  
    add(newFavoris) {
      if (!this._listFavoris.includes(newFavoris)) {
        console.log('Le favoris vient d\'être ajouté !')
        this._listFavoris.push(newFavoris);
      }
      this.save();
    }
  
    remove(oldFavoris) {
      let indice = this._listFavoris.indexOf(oldFavoris);
      if (indice !== -1) {
        this._listFavoris.splice(indice, 1);
      }
      this.save();
    }
  }
  