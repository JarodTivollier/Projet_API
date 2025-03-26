import { viewSearch } from '../view/view-search.js';
import { APIMovie } from '../model/APIMovie.js';
import { SearchResult } from '../model/search-result.js';

export class ControllerSearch {
    constructor() {
        this.apiMovie = new APIMovie;
        this.searchResult = new SearchResult;
    }

    async initialize() {
        // Fill the selection of the kind
        const kinds = await this.apiMovie.getKinds();
        viewSearch.displayKinds(kinds);  
        // Set the button for the research
        viewSearch.recherche.addEventListener('click', async () => {
            console.log('bonjour');
            await this.search();
            const previousPage = document.referrer;
            window.location.href = previousPage;
            //window.history.go(-1);
        });
    }

    /**
     * Get the selected runtime in the right format (in minutes)
     * @returns the interval for the runtime
     */
    getRuntime() {
        // Get the selected radio button
        let selectedRuntime;
        viewSearch.btnRadioRuntime.forEach(btn => {
            if (btn.checked) {
                selectedRuntime = btn;
            }
        });

        if (selectedRuntime) {
            // Get the value (for example : "1-1.5" or "1h30")
            const runtimeValue = selectedRuntime.value;
            // If the interval is "More than 3h"
            if (runtimeValue === '>3') {
                return { start: 180, end: Infinity }; // 180 minutes to the infinite
            } else if (runtimeValue.includes('-')) { // If it's another interval (for example : "1-1.5")
                const [start, end] = runtimeValue.split('-').map(Number);
                return { start: start * 60, end: end * 60 }; // Convert in minutes
            } else {
                console.log("Invalide runtime");
                return null;
            }
        } else {
            console.log("No runtime was selected");
            return null;
        }
    }

    async search() {
        // ------ Construct the url
        let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    
        // --- Kinds
        const firstKindId = viewSearch.firstListKinds.options[viewSearch.firstListKinds.selectedIndex].value;
        const secondKindId = viewSearch.secondListKinds.options[viewSearch.secondListKinds.selectedIndex].value;
        if (firstKindId){
            url+=  '&with_genres=' + firstKindId; 
            if (secondKindId && secondKindId != firstKindId) {
                url+= ',' + secondKindId;
            }
        }
        // --- Keywords
        const firstKeyword = await this.apiMovie.getKeywordId(viewSearch.firstKeyword.value);
        const secondKeyword = await this.apiMovie.getKeywordId(viewSearch.secondKeyword.value);
        if (firstKeyword){
            url += '&with_keywords=' + firstKeyword;
            if (secondKeyword && secondKeyword != firstKeyword) {
                url+= ',' + secondKeyword;
            }
        }
        // --- Runtime
        const runtime = this.getRuntime();
        if (runtime) {
            url += '&with_runtime.gte=' + runtime.start + '&with_runtime.lte=' + runtime.end;
        }
        // --- Release Date
        const dateMin = viewSearch.dateMin.value;
        const dateMax = viewSearch.dateMax.value;
        if (dateMin) {
            url += '&primary_release_date.gte=' + dateMin;
        }
        if (dateMax) {
            url += '&primary_release_date.lte=' + dateMax;
        }
    
        // ------ Give the url to obtain the result of the search
        const moviesResult = await this.apiMovie.getMoviesSearch(url);
        console.log(moviesResult);
    
        // ------ Save the result in the localStorage
        this.searchResult.resetList();
        moviesResult.forEach(movie => {
            const movieId = movie.id;
            this.searchResult.add(movieId);
        });
        this.searchResult.save();
    }
}
 





