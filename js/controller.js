import { view } from './view.js';
import { Favoris } from './favoris.js';
import { APIMovie } from './movie.js';


let listeFavoris = new Favoris;
let apiMovie = new APIMovie;

// Affichage par défaut de la page
if (localStorage.getItem("searchMoviesId")) {
  console.log('je cherche');
} else {
  // Affichage des films
  const movies = await apiMovie.recupFilms();
  movies.forEach(async movie => {
    prepAffichage(movie.id);
  });
}

// Affichage des films favoris
view.btnAffichageFav.addEventListener('click', () => {
  view.divFilms.innerHTML = '';
  console.log(listeFavoris.getList());
  listeFavoris.getList().forEach(async favoris => {
    prepAffichage(favoris);
  });
});

// Fonction pour préparer l'appel à l'affichage des films
async function prepAffichage(movie) {
  const fullMovie = await apiMovie.recupFilm(movie);
  const actors = await apiMovie.recupActeurs(movie);
  view.afficheFilm(fullMovie, actors, listeFavoris);
}
