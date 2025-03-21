import { view } from './view.js';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM0Yjc1MTQ4MzFjZGI5ODA3MTNiM2MyNmE1OWY1YiIsIm5iZiI6MTc0MTk2Mjc5Mi4zNzIsInN1YiI6IjY3ZDQzZTI4ZWM0ZWJkMjhhMjUzYzQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXfTdMN68v_vGud1nkMQ8fNqw9ZNnL7-OnbaE7GJr2A'
    }
  };



async function afficheGenre(){
    const genres = await recupGenres();
    console.log("bonjour");
    for(let i = 0; i < genres.length; i++){
        let genre = document.createElement('option');
        genre.value = genres[i].id;
        genre.text = genres[i].name;
        view.listGenres.append(genre);
    }
}
 async function recupGenres(){
    let resObj = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    if (resObj.ok) {
      // Si le résultat semble valide (Statut HTTP entre 200 et 299)
      const resJSON = await resObj.json();
      const genres = resJSON.genres;
      // console.log(movies);
      return genres;
    }  else {
      // Sinon on affiche l'erreur
      console.error(resObj);
    }
  }
  let genreId = '';  
  view.listGenres.addEventListener('change', function () {
      const genre = document.getElementById('genres'); 
      genreId = view.listGenres.options[genre.selectedIndex].value;  
      console.log('Genre sélectionné:', genreId);  
  });


function getDuree() {
    // Récupérer le bouton radio sélectionné
    const dureeSelectionner = document.querySelector('input[name="runtime"]:checked');

    if (dureeSelectionner) {
        // Récupérer la valeur (par exemple : "1-1.5" 1.5 = 1h30)
        const valeur = dureeSelectionner.value;

        // Si l'intervalle est 'plus de 3h'
        if (valeur === '>3') {
            return { start: 180, end: Infinity }; // 180 minutes  à l'infini
        }

        // Séparer les heures et minutes pour l'intervalle
        const [start, end] = valeur.split('-').map(value => {
            const [hours, minutes] = value.split('h').map(Number);
            return (hours * 60) + minutes; // Converti en minutes
        });

        return { start, end };
    } else {
        console.log("Aucune durée sélectionné.");
        return null;
    }
}


  

async function recherche(){

    const genre = genreId || '';
    const dateMin = view.dateMin.value || '';
    const dateMax = view.dateMax.value || '';
    const keywords = view.keywords.value || '';
    const duree = getDuree();
    const movies = [];
    const moviesId = [];
    let resObj = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte='+dateMin+'&primary_release_date.lte='+dateMax+'&sort_by=popularity.desc&with_genres='+genre+'&with_keywords='+keywords+'&with_runtime.gte='+duree.start+'&with_runtime.lte='+duree.end+'', options)
    if (resObj.ok) {
        // Si le résultat semble valide (Statut HTTP entre 200 et 299)
        const resJSON = await resObj.json();
        movies = resJSON.results;
        movies = JSON.stringify(movies);
        for (let i = 0; i < 20; i++){
            moviesId = movies.id;
        }
    }  else {
        // Sinon on affiche l'erreur
        console.error(resObj);
    }
        
    // Stocker les données dans l'objet window
    localStorage.setItem('searchMoviesId', JSON.stringify(moviesId));
    // Rediriger vers index.html
    window.location.href = 'index.html';
}

view.recherche.addEventListener('click', (event) => {
    recherche();
});
document.addEventListener('DOMContentLoaded', () => {
    afficheGenre();  
});