import assert from 'assert';
import { Favoris } from '../js/favoris.js';

describe('Favoris', function () {
  describe('#add()', function () {
    it('should add the id to the list', function () {
      let favoris = new Favoris();

      let idMovie = '1234';
      favoris.add(idMovie);

      // On récupère la liste depuis localStorage
      let ls = JSON.parse(localStorage.getItem('listFavoris'));

      // On vérifie si l'élément a bien été ajouté à la liste
      assert.ok(ls.includes(idMovie), 'Le film n\'a pas été ajouté à la liste.');
    });
  });
});
