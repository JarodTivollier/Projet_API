/**
 * Constant objet for the view.
 */
export const view = {
    /* ----------- Main Page ---------- */
    // Division for the movies
    moviesDiv: document.getElementById('movies'),
    // Buttons to add/remove favorites
    btnFavorite: document.getElementsByName('favorite'),
    // Button to display the favorites
    btnDisplayFavorite: document.getElementById('btnDisplayFavorite'),

    /* ----------- Search Page ---------- */
    // Menu déroulant des genres
    listGenres:  document.getElementById('genres'),
    // Keywords
    keywords: document.getElementById('keywords'),
    // Date Min
    dateMin: document.getElementById('dateMin'),
    // Date Max
    dateMax: document.getElementById('dateMax'),
 
    recherche: document.getElementById('btn-submit'),
    
    /**
     * Display a movie
     * @param {*} movie 
     * @param {*} actors 
     * @param {*} listFavorites 
     */
    async displayMovie(movie, actors, listFavorites) {
      if (movie.poster_path != null) {
        // ------ Movie Poster
        let moviePoster = document.createElement('img');
        moviePoster.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + movie.poster_path;
      
        // ------ Information
        let movieInfo = document.createElement('div');
        movieInfo.className = 'movieInfo';
        // --- Title
        let movieInfoTitle = document.createElement('h2');
        movieInfoTitle.textContent = movie.title;
        movieInfo.append(movieInfoTitle);
        // --- Subtitle
        if (movie.tagline != "") {
          let movieInfoSubTitle = document.createElement('p');
          movieInfoSubTitle.className = "subTitle";
          movieInfoSubTitle.textContent = movie.tagline;
          movieInfo.append(movieInfoSubTitle);
        }
        // --- Date
        let movieInfoDate = document.createElement('p');
        movieInfoDate.textContent = movie.release_date;
        movieInfo.append(movieInfoDate);
        // --- Kind
        let movieInfoKind = document.createElement('p');
        let txtMovieInfoKind = "";
        for (let i = 0; i < movie.genres.length; i++) {
            if (i == 0) {
              txtMovieInfoKind += movie.genres[i].name;
            } else {
              txtMovieInfoKind += ", " + movie.genres[i].name;
            } 
        }
        movieInfoKind.textContent = txtMovieInfoKind;
        movieInfo.append(movieInfoKind);
        // --- Runtime
        let movieInfoRuntime = document.createElement('p');
        let hours = Math.floor(movie.runtime / 60);
        let minutes = movie.runtime % 60;
        movieInfoRuntime.textContent = hours + "h" + minutes;
        movieInfo.append(movieInfoRuntime);
        // --- Actors (the first three ones)
        let movieInfoActors = document.createElement('p');
        let txtMovieInfoActors = "";
        let i = 0
        while (i < actors.length && i < 3) {
            if (i == 0) {
              txtMovieInfoActors += "With " + actors[i].name;
            } else {
              txtMovieInfoActors += ", " + actors[i].name;
            } 
            i++;
        }
        if (actors.length > 3) {
          txtMovieInfoActors += ", and more";
        }
        movieInfoActors.textContent = txtMovieInfoActors;
        movieInfo.append(movieInfoActors);

        // ------ Favorite Button
        let movieFavorite = document.createElement('button');
        movieFavorite.className = 'favorite';
        movieFavorite.name = 'favorite';
        let movieFavoriteHeart = document.createElement('img');
        if (listFavorites.isInList(movie.id)) {
          movieFavoriteHeart.src = 'css/images/red-heart.png';
        } else {
          movieFavoriteHeart.src = 'css/images/black-heart.png';
        }
        movieFavorite.append(movieFavoriteHeart);
        movieFavorite.addEventListener('click', () => {
          if (movieFavorite.firstElementChild.src.includes('black-heart.png')) {
            listFavorites.add(movie.id);
            movieFavorite.firstElementChild.src = 'css/images/red-heart.png';
          } else {
            listFavorites.remove(movie.id);
            movieFavorite.firstElementChild.src = 'css/images/black-heart.png';
          }
        });
        
        // ------ Movie Division
        let newMovie = document.createElement('div');
        newMovie.className = 'movie';
        newMovie.append(moviePoster);
        newMovie.append(movieInfo);
        newMovie.append(movieFavorite);
      
        this.moviesDiv.append(newMovie);
      }
    }
  }
