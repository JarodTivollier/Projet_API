import { view } from './view.js';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM0Yjc1MTQ4MzFjZGI5ODA3MTNiM2MyNmE1OWY1YiIsIm5iZiI6MTc0MTk2Mjc5Mi4zNzIsInN1YiI6IjY3ZDQzZTI4ZWM0ZWJkMjhhMjUzYzQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXfTdMN68v_vGud1nkMQ8fNqw9ZNnL7-OnbaE7GJr2A'
    }
  };
let genreId = '12';  


async function afficheGenre(){
    const genres = await recupGenres();
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
  
  


  function getDuree() {
    // Récupérer le bouton radio sélectionné
    const dureeSelectionner = document.querySelector('input[name="runtime"]:checked');

    if (dureeSelectionner) {
        // Récupérer la valeur (par exemple : "1-1.5" ou "1h30")
        const valeur = dureeSelectionner.value;

        // Si l'intervalle est 'plus de 3h'
        if (valeur === '>3') {
            return { start: 180, end: Infinity }; // 180 minutes à l'infini
        }

        // Cas d'un intervalle de durée (par exemple : "1-1.5")
        if (valeur.includes('-')) {
            const [start, end] = valeur.split('-').map(Number);
            return { start: start * 60, end: end * 60 }; // Convertit en minutes
        }

        // Cas d'une seule durée (par exemple : "1h30")
        if (valeur.includes('h')) {
            const [hours, minutes] = valeur.split('h');
            const totalMinutes = (parseInt(hours) * 60) + (parseInt(minutes) || 0); // Si minutes est vide, ça revient à 0
            return { start: totalMinutes, end: totalMinutes };
        }

        console.log("Format de durée invalide");
        return null;
    } else {
        console.log("Aucune durée sélectionnée.");
        return null;
    }
}



  

async function recherche() {
    try {
          
        const dateMin = view.dateMin.value || '';
        const dateMax = view.dateMax.value || '';
        console.log(dateMin);
        console.log(dateMax);
        const keywords = view.keywords.value || '';
        const duree = getDuree();
        console.log(genreId);
    
        // Construire l'URL en fonction de la disponibilité des dates
        let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        console.log(url);
        // Ajouter les paramètres de dates uniquement si les valeurs sont présentes
        if (genreId){
            url+=  '&with_genres=' + genreId; 
        }
        if (keywords){
            url += '&with_keywords=' + keywords;
        }
            url += '&with_runtime.gte=' + duree.start + '&with_runtime.lte=' + duree.end;
        if (dateMin) {
            url += '&primary_release_date.gte=' + dateMin;
        }
        if (dateMax) {
            url += '&primary_release_date.lte=' + dateMax;
        }

        // Log de l'URL pour débogage
        console.log('URL construite :', url);

       let resObj = await fetch(url, options);

        if (resObj.ok) {
            const resJSON = await resObj.json();
            let movies = resJSON.results;
            console.log(movies);

            // Stocker les données dans le localStorage
           localStorage.setItem('searchMoviesId', JSON.stringify(movies));
            // Rediriger vers index.html
           window.location.href = 'index.html';
        } else {
            // Erreur de la requête (par exemple, mauvaise réponse du serveur)
            console.error('Erreur de requête:', resObj);
        }
    } catch (error) {
        // Gérer toute autre erreur (par exemple, réseau, JSON)
        console.error('Erreur lors de la récupération des films:', error);
    }
}




document.addEventListener('DOMContentLoaded', () => {
    afficheGenre();  
    view.recherche.addEventListener('click', () => {
        console.log('bonjour');
        recherche();
    });
    view.listGenres.addEventListener('change', function () {
        const genre = document.getElementById('genres'); 
        genreId = view.listGenres.options[genre.selectedIndex].value;  
        
    });
});