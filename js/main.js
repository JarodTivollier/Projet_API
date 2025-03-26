import { Controleur } from "./controller/controller.js";
import { ControllerSearch } from "./controller/controller-search.js";

document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on est sur la page d'accueil
    if (window.location.pathname.includes("index.html")) {
      const controller = new Controleur();
      controller.initialize();
    }
    
    // Vérifier si on est sur la page de recherche
    if (window.location.pathname.includes("search.html")) {
        const controllerSearch = new ControllerSearch();
        controllerSearch.initialize();
    }
  });