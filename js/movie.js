// 
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM0Yjc1MTQ4MzFjZGI5ODA3MTNiM2MyNmE1OWY1YiIsIm5iZiI6MTc0MTk2Mjc5Mi4zNzIsInN1YiI6IjY3ZDQzZTI4ZWM0ZWJkMjhhMjUzYzQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXfTdMN68v_vGud1nkMQ8fNqw9ZNnL7-OnbaE7GJr2A'
    }
  };

export class APIMovie {
    constructor() {}

    /* ------------------------ Getters ------------------------ */
    /**
     * Get a list of movies
     * @returns a list of movies
     */
    async getMovies() {
        let resObj = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=EN6us&page=1&sort_by=popularity.desc&with_runtime.gte=60', options);
        if (resObj.ok) {
            // If the result is OK (Status HTTP between 200 and 299)
            const resJSON = await resObj.json();
            const movies = resJSON.results;
            // console.log(movies);
            return movies;
        }  else {
            // Else we display the error
            console.error(resObj);
        }
    }

    /**
     * Get one movie
     * @param {*} idMovie
     * @returns a movie
     */
    async getMovie(idMovie) {
        const url = 'https://api.themoviedb.org/3/movie/' + idMovie + '?language=en-US';
        let resObj = await fetch(url, options);
        if (resObj.ok) {
            // If the result is OK (Status HTTP between 200 and 299)
            const movie = await resObj.json();
            // console.log(movie);
            return movie;
        }  else {
            // Else we display the error
            console.error(resObj);
        }
    }

    /**
     * Get the actors of a movie located in its credits
     * @param {*} idMovie
     * @returns the actor's list 
     */
    async getActors(idMovie) {
        const url = 'https://api.themoviedb.org/3/movie/' + idMovie + '/credits?language=en-US';
        let resObj = await fetch(url, options);
        if (resObj.ok) {
            // If the result is OK (Status HTTP between 200 and 299)
            const actors = await resObj.json();
            //console.log(actors.cast);
            return actors.cast;
        }  else {
            // Else we display the error
            console.error(resObj);
        }
    }
}