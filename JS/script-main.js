const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjM0Yjc1MTQ4MzFjZGI5ODA3MTNiM2MyNmE1OWY1YiIsIm5iZiI6MTc0MTk2Mjc5Mi4zNzIsInN1YiI6IjY3ZDQzZTI4ZWM0ZWJkMjhhMjUzYzQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXfTdMN68v_vGud1nkMQ8fNqw9ZNnL7-OnbaE7GJr2A'
    }
  };

const divFilms = document.getElementById('films');

async function recupFilm() {
  let resObj = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=EN6us&page=1&sort_by=popularity.desc', options);
  if (resObj.ok) {
    // Si le résultat semble valide (Statut HTTP entre 200 et 299)
    const resJSON = await resObj.json();
    const movies = resJSON.results;
    console.log(movies);

    // Affichage
    for (let i = 0; i < movies.length; i++) {
      
      if (movies[i].poster_path != null) {
        let afficheFilm = document.createElement('img');
        afficheFilm.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + movies[i].poster_path;

        // Info
        let titre = document.createElement('p');
        titre.textContent = movies[i].title;
        let resume = document.createElement('p');
        resume.textContent = movies[i].overview;
        let date = document.createElement('p');
        date = movies[i].release_date;
        
        let info = document.createElement('div');
        info.className = 'infoFilm';
        info.append(titre);
        info.append(date);
        info.append(resume);

        let newDiv = document.createElement('div');
        newDiv.className = 'film';
        newDiv.append(afficheFilm);
        newDiv.append(info);

        divFilms.append(newDiv);
      }
    }
  } else {
    // Sinon on affiche l'erreur
    console.error(resObj);
  }
}

recupFilm()


