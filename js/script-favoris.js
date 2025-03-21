// Récupération des favoris 
let favoris = document.getElementsByName('favoris');
console.log(favoris);
console.log(favoris.length);

// Ajout d'un événement au click
favoris.forEach(favori => {
    console.log(favori);
    favori.addEventListener('click', () => {
        favori.firstElementChild.src = 'css/images/coeur-rouge.png';
    })
});