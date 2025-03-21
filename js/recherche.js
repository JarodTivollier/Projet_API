import { view } from './view.js';




async function AfficheGenre(){
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
      const genres = resJSON.results;
      // console.log(movies);
      return genres;
    }  else {
      // Sinon on affiche l'erreur
      console.error(resObj);
    }
  }
let genreText = '';
view.genres.addEventListener('click', function() {
    const genre = document.getElementById('select-genre');
     genreText = genre.options[genre.selectedIndex].text;
        
})


async function recherche(){

    const titre = view.titre.value || '';
    const genre = genreText || '';
    const date = view.date.value || '';
    const dureeMin = view.dureeMin.value || '';
    const dureeMax = view.dureeMax.value || '';
    const movies = [];

    if (titre != ''){
        let resObj = await fetch('https://api.themoviedb.org/3/search/movie?query='+titre+'&include_adult=false&language=en-US&page=1', options)
        if (resObj.ok) {
            // Si le résultat semble valide (Statut HTTP entre 200 et 299)
            const resJSON = await resObj.json();
            movies = resJSON.results;
        }  else {
            // Sinon on affiche l'erreur
            console.error(resObj);
        }
    }else {
        let resObj = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year='+date+'&sort_by=popularity.desc&with_genres='+genre+'&with_runtime.gte='+dureeMin+'&with_runtime.lte='+dureeMax+'', options)
        if (resObj.ok) {
            // Si le résultat semble valide (Statut HTTP entre 200 et 299)
            const resJSON = await resObj.json();
            movies = resJSON.results;
        }  else {
            // Sinon on affiche l'erreur
            console.error(resObj);
        }
    }
    // Stocker les films dans le localStorage
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // Rediriger vers index.html
    window.location.href = 'index.html';
}

view.recherche.addEventListener()