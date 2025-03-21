/**
 * Objet constant représentant la vue.
 */
export const view = {
    // Divisions des films
    divFilms: document.getElementById('films'),
    // Boutons d'affichage des favoris
    btnAffichageFav: document.getElementById('btnAfficheFavoris'),
    // Menu déroulant des genres
    listGenres:  document.getElementById('genres'),
    // Keywords
    keywords: document.getElementById('keywords'),
    // Date Min
    dateMin: document.getElementById('dateMin'),
    // Date Max
    dateMax: document.getElementById('dateMax'),
 
    recherche: document.getElementById('btn-submit'),
    // Boutons des favoris
    favoris: document.getElementsByName('favoris'),

    // Fonction d'affichage
    /**
     * Afficher un film
     * @param {} movie 
     */
    async afficheFilm(movie, actors, listeFavoris) {
      if (movie.poster_path != null) {
        // --- Affiche du film
        let afficheFilm = document.createElement('img');
        afficheFilm.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + movie.poster_path;
      
        // --- Info
        let info = document.createElement('div');
        info.className = 'infoFilm';
        // Titre
        let titre = document.createElement('h2');
        titre.textContent = movie.title;
        info.append(titre);
        // Sous-titre
        if (movie.tagline != "") {
          let sousTitre = document.createElement('p');
          sousTitre.className = "sousTitre";
          sousTitre.textContent = movie.tagline;
          info.append(sousTitre);
        }
        // Date
        let date = document.createElement('p');
        date.textContent = movie.release_date;
        info.append(date);
        // Genre
        let genre = document.createElement('p');
        let txtGenre = "";
        for (let i = 0; i < movie.genres.length; i++) {
            if (i == 0) {
              txtGenre += movie.genres[i].name;
            } else {
              txtGenre += ", " + movie.genres[i].name;
            } 
        }
        genre.textContent = txtGenre;
        info.append(genre);
        // Durée
        let duree = document.createElement('p');
        let heures = Math.floor(movie.runtime / 60);
        let minutes = movie.runtime % 60;
        duree.textContent = heures + "h" + minutes;
        info.append(duree);
        // Acteurs (les 3 premiers)
        let acteurs = document.createElement('p');
        let txtActeurs = "";
        let i = 0
        while (i < actors.length && i < 3) {
            if (i == 0) {
              txtActeurs += "With " + actors[i].name;
            } else {
              txtActeurs += ", " + actors[i].name;
            } 
            i++;
        }
        if (actors.length > 3) {
          txtActeurs += ", and more";
        }
        acteurs.textContent = txtActeurs;
        info.append(acteurs);

        // --- Favoris
        let favoris = document.createElement('button');
        favoris.className = 'favoris';
        favoris.name = 'favoris';
        let imgCoeur = document.createElement('img');
        if (listeFavoris.isInList(movie.id)) {
          imgCoeur.src = 'css/images/coeur-rouge.png';
        } else {
          imgCoeur.src = 'css/images/coeur-noir.png';
        }
        favoris.append(imgCoeur);
        favoris.addEventListener('click', () => {
          console.log('je suis là')
          if (favoris.firstElementChild.src.includes('coeur-noir.png')) {
            console.log('ici')
            listeFavoris.add(movie.id);
            favoris.firstElementChild.src = 'css/images/coeur-rouge.png';
          } else {
            listeFavoris.remove(movie.id);
            favoris.firstElementChild.src = 'css/images/coeur-noir.png';
          }
        });
        
        // --- Div du film
        let newDiv = document.createElement('div');
        newDiv.className = 'film';
        newDiv.append(afficheFilm);
        newDiv.append(info);
        newDiv.append(favoris);
      
        this.divFilms.append(newDiv);
      }
    }
  }
