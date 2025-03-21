const assert = require('assert');
const Favoris = require('../js/favoris.js');

describe('Favoris', function () {
  describe('#add()', function () {
    it('should add the id to the list', function () {
      let favoris = new Favoris();

      let idMovie = '1234';
      favoris.add(idMovie);

      let ls = JSON.parse(localStorage.getItem('listFavoris'));

      assert.equal(favoris, ls);
    });

    
  });
});
