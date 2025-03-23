import { view } from './view.js';
import { APIMovie } from './movie.js';
import { SearchResult } from './search-result.js';

const apiMovie = new APIMovie; 
const searchResult = new SearchResult;

document.addEventListener('DOMContentLoaded', async () => {
    // Fill the selection of the kind
    const kinds = await apiMovie.getKinds();
    view.displayKinds(kinds);  
    // Set the button for the research
    view.recherche.addEventListener('click', async () => {
        console.log('bonjour');
        await search();
        window.history.back();
    });
});
 
/**
 * Get the selected runtime in the right format (in minutes)
 * @returns the interval for the runtime
 */
function getRuntime() {
    // Get the selected radio button
    let selectedRuntime;
    view.btnRadioRuntime.forEach(btn => {
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

async function search() {
    // ------ Construct the url
    let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

    // --- Kinds
    const firstKindId = view.firstListKinds.options[view.firstListKinds.selectedIndex].value;
    const secondKindId = view.secondListKinds.options[view.secondListKinds.selectedIndex].value;
    if (firstKindId){
        url+=  '&with_genres=' + firstKindId; 
        if (secondKindId && secondKindId != firstKindId) {
            url+= ',' + secondKindId;
        }
    }
    // --- Keywords
    const firstKeyword = await apiMovie.getKeywordId(view.firstKeyword.value);
    const secondKeyword = await apiMovie.getKeywordId(view.secondKeyword.value);
    if (firstKeyword){
        url += '&with_keywords=' + firstKeyword;
        if (secondKeyword && secondKeyword != firstKeyword) {
            url+= ',' + secondKeyword;
        }
    }
    // --- Runtime
    const runtime = getRuntime();
    if (runtime) {
        url += '&with_runtime.gte=' + runtime.start + '&with_runtime.lte=' + runtime.end;
    }
    // --- Release Date
    const dateMin = view.dateMin.value;
    const dateMax = view.dateMax.value;
    if (dateMin) {
        url += '&primary_release_date.gte=' + dateMin;
    }
    if (dateMax) {
        url += '&primary_release_date.lte=' + dateMax;
    }

    // ------ Give the url to obtain the result of the search
    const moviesResult = await apiMovie.getMoviesSearch(url);
    console.log(moviesResult);

    // ------ Save the result in the localStorage
    searchResult.resetList();
    moviesResult.forEach(movie => {
        const movieId = movie.id;
        searchResult.add(movieId);
    });
    searchResult.save();
}


