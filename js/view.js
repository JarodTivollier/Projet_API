/**
 * Constant objet for the view.
 */
export const view = {
    /* ----------- Main Page ---------- */
    // Header of the page
    headerIndex: document.getElementById('header'),
    // Division for the movies
    moviesDiv: document.getElementById('movies'),
    // Buttons to add/remove favorites
    btnFavorite: document.getElementsByName('favorite'),
    // Button to display the favorites
    btnDisplayFavorite: document.getElementById('btnDisplayFavorite'),
    // Button to display the random search
    btnRandomSearch: document.getElementById('btnRandomSearch'),

    /* ----------- Search Page ---------- */
    // Menus déroulant des genres
    firstListKinds:  document.getElementById('firstKind'),
    secondListKinds: document.getElementById('secondKind'),
    // Release Date
    dateMin: document.getElementById('dateMin'),
    dateMax: document.getElementById('dateMax'),
    // Runtime 
    btnRadioRuntime: document.getElementsByName('runtime'),
    // Keywords
    firstKeyword: document.getElementById('firstKeyword'),
    secondKeyword: document.getElementById('secondKeyword'),
    // Serach Button
    recherche: document.getElementById('btnSearch'),

    async displayKinds(kinds) {
      for(let i = 0; i < kinds.length; i++){
        let kind = document.createElement('option');
        kind.value = kinds[i].id;
        kind.text = kinds[i].name;
        this.firstListKinds.append(kind);
        let kind2 = document.createElement('option');
        kind2.value = kinds[i].id;
        kind2.text = kinds[i].name;
        this.secondListKinds.append(kind2);
      }
    },

    /**
     * Add a subtitle according to the context (search result, default research)
     * @param {*} text 
     */
    async addIndicator(text) {
      let indicator = document.createElement('p');
      indicator.textContent = text;
      this.headerIndex.append(indicator);
    },
    
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
