import { Controleur } from "./controller/controller.js";
import { ControllerSearch } from "./controller/controller-search.js";

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the search page
    if (window.location.pathname.includes("search.html")) {
        const controllerSearch = new ControllerSearch();
        controllerSearch.initialize();
    } else { // We are on the index
      const controller = new Controleur();
      controller.initialize();
    }
  });