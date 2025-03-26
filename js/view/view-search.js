/**
 * Constant objet for the view.
 */
export const viewSearch = {
    /* ----------- Search Page ---------- */
    // Kinds
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

    /**
     * Initialize the choice box for the kinds
     * @param {*} kinds 
     */
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
    }
}