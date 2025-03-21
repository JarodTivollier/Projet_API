import { view } from './view.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM0Yjc1MTQ4MzFjZGI5ODA3MTNiM2MyNmE1OWY1YiIsIm5iZiI6MTc0MTk2Mjc5Mi4zNzIsInN1YiI6IjY3ZDQzZTI4ZWM0ZWJkMjhhMjUzYzQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXfTdMN68v_vGud1nkMQ8fNqw9ZNnL7-OnbaE7GJr2A'
  }
};

/**
 * Récupérer une liste de films
 * @returns une liste de film
 */
async function recupFilms() {
  let resObj = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=EN6us&page=1&sort_by=popularity.desc', options);
  if (resObj.ok) {
    // Si le résultat semble valide (Statut HTTP entre 200 et 299)
    const resJSON = await resObj.json();
    const movies = resJSON.results;
    // console.log(movies);
    return movies;
  }  else {
    // Sinon on affiche l'erreur
    console.error(resObj);
  }
}

/**
 * Récupérer un film
 * @param {*} idMovie
 * @returns un film
 */
async function recupFilm(idMovie) {
  const url = 'https://api.themoviedb.org/3/movie/' + idMovie + '/credits?language=en-US';
  let resObj = await fetch(url, options);
  if (resObj.ok) {
    // Si le résultat semble valide (Statut HTTP entre 200 et 299)
    const movie = await resObj.json();
    // console.log(movies);
    return movie;
  }  else {
    // Sinon on affiche l'erreur
    console.error(resObj);
  }
}

/**
 * Récupérer les acteurs d'un film qui se trouvent dans les crédits de ce-dernier
 * @param {*} idMovie
 * @returns la liste des acteurs 
 */
async function recupActeurs(idMovie) {
  const url = 'https://api.themoviedb.org/3/movie/' + idMovie + '/credits?language=en-US';
  let resObj = await fetch(url, options);
  if (resObj.ok) {
    // Si le résultat semble valide (Statut HTTP entre 200 et 299)
    const actors = await resObj.json();
    //console.log(actors.cast);
    return actors.cast;
  }  else {
    // Sinon on affiche l'erreur
    console.error(resObj);
  }
}

/**
 * Afficher une liste de films
 */
async function afficheFilms() {
    const movies = await recupFilms();
    // Affichage
    for (let i = 0; i < movies.length; i++) {
      const url = 'https://api.themoviedb.org/3/movie/' + movies[i].id + '?language=en-US';
      let resObj = await fetch(url, options);
      if (resObj.ok) {
        // Si le résultat semble valide (Statut HTTP entre 200 et 299)
        const movie = await resObj.json();
        // console.log(movie);
        afficheFilm(movie);
      }  else {
        // Sinon on affiche l'erreur
        console.error(resObj);
      }
    }
}


/**
 * Afficher un film
 * @param {} movie 
 */
async function afficheFilm(movie) {
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
    const actors = await recupActeurs(movie.id);
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
    imgCoeur.src = 'css/images/coeur-noir.png';
    favoris.append(imgCoeur);
    
    // --- Div du film
    let newDiv = document.createElement('div');
    newDiv.className = 'film';
    newDiv.append(afficheFilm);
    newDiv.append(info);
    newDiv.append(favoris);
  
    view.divFilms.append(newDiv);
  }
}

afficheFilms();
