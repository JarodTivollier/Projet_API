import assert from 'assert';
import { Favoris } from '../js/favoris.js';
import { LocalStorage } from 'node-localstorage';

// Créez une instance de LocalStorage pour les tests
const localStorage = new LocalStorage('./localeStorage');

describe('Favoris', function () {
  describe('#add()', function () {
    it('should add the id to the list', function () {
      // Passez localStorage simulé dans le constructeur de Favoris
      let favoris = new Favoris(localStorage);

      let idMovie = '1234';
      favoris.add(idMovie);

      // On récupère la liste depuis localStorage simulé
      let ls = JSON.parse(localStorage.getItem('listFavoris'));

      // On vérifie si l'élément a bien été ajouté à la liste
      assert.ok(ls.includes(idMovie), 'Le film n\'a pas été ajouté à la liste.');
    });
  });

  describe('#remove()', function () {
    it('should remove the id to the list', function () {
      // Passez localStorage simulé dans le constructeur de Favoris
      let favoris = new Favoris(localStorage);

      let idMovie = '1234';
      favoris.add(idMovie);
      favoris.remove(idMovie);

      // On récupère la liste depuis localStorage simulé
      let ls = JSON.parse(localStorage.getItem('listFavoris'));

      // On vérifie si l'élément a bien été ajouté à la liste
      assert.ok(!ls.includes(idMovie), 'Le film n\'a pas été ajouté à la liste.');
    });
  });
});
