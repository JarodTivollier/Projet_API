const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM0Yjc1MTQ4MzFjZGI5ODA3MTNiM2MyNmE1OWY1YiIsIm5iZiI6MTc0MTk2Mjc5Mi4zNzIsInN1YiI6IjY3ZDQzZTI4ZWM0ZWJkMjhhMjUzYzQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXfTdMN68v_vGud1nkMQ8fNqw9ZNnL7-OnbaE7GJr2A'
    }
  };

export class APIMovie {
    constructor() {}

    /* ------------------------ Récupération ------------------------ */
    /**
     * Récupérer une liste de films
     * @returns une liste de film
     */
    async recupFilms() {
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
    async recupFilm(idMovie) {
        const url = 'https://api.themoviedb.org/3/movie/' + idMovie + '?language=en-US';
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
    async recupActeurs(idMovie) {
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
}