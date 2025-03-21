export class Favoris {

    /**
     * Liste de favoris
     * @type {Array}
     */
    _listFavoris

    /**
     * Constructeur de la classe Favoris.
     */
    constructor() {}

    getList() {
        return this._listFavoris;
    }

    save() {
        localStorage.setItem("listFavoris", JSON.stringify(this._listFavoris));
    }

    retrieve() {
        let favorisJSONSL = localStorage.getItem("listFavoris");
        if(favorisJSONSL) {
            this._listFavoris = JSON.parse(btnJSONSL);
        } else {
            this._listFavoris = [];
        }
    }

    add(newFavoris) {
        this.retrieve();
        if (!this._listFavoris.includes(newFavoris)) {
            console.log('Le favoris vient d\'être ajouté !')
            this._listFavoris.push(newFavoris);
        }
        this.save();
    }

    remove(oldFavoris) {
        this.retrieve();
        if (!this._listFavoris.includes(oldFavoris)) {
            let indice = this._listFavoris.indexOf(oldFavoris);
            this._listFavoris.splice(indice, 1);
        }
        this.save();
    }


}