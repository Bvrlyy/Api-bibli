// routes.js
import {
  getAllBooksController,
  addBookController,
  getBookByIdController,
  updateBookController,
  getLivresByGenreController,
  getLivresByAuthorController,
  getBooksPaginatedController, // Ajouter la fonction pour récupérer un livre par ID
} from "../controllers/livreController.js"; // Importer les controllers des livres
import {
  getAllAuteursController,
  addAuteurController,
  getAuteurByIdController,
  updateAuteurController,
} from "../controllers/auteurController.js"; // Importer les controllers des auteurs
import {
  getAllEmpruntController,
  addEmpruntController,
  getEmpruntByIdController,
  updateEmpruntController,
} from "../controllers/empruntController.js";

// Fonction qui gère les routes
export const handleRoutes = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Set les en-têtes de la réponse
  res.setHeader("Content-Type", "application/json");

  // Gestion des routes pour les livres
  // get livres par genre
  if (req.method === "GET" && pathname.startsWith("/api/livres/genre/")) {
    const genre = decodeURIComponent(pathname.split("/").pop()); // Récupère le genre dans l'URL

    // Ajoute le genre à req.params
    req.params = { genre }; // Ceci permet à ton contrôleur de l'utiliser

    try {
      await getLivresByGenreController(req, res); // Passe req et res au contrôleur
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Erreur lors de la récupération des livres par genre",
        }),
      );
    }
  }
  // get livre par auteur
  else if (req.method === "GET" && pathname.startsWith("/api/livres/auteur/")) {
    const nom = decodeURIComponent(pathname.split("/").pop()); // Récupère le genre dans l'URL

    // Ajoute le genre à req.params
    req.params = { id }; // Ceci permet à ton contrôleur de l'utiliser

    try {
      await getLivresByAuthorController(req, res); // Passe req et res au contrôleur
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Erreur lors de la récupération des livres par auteur",
        }),
      );
    }
  }
  // Dans routes.js, importez d'abord la nouvelle fonction du controller

  // Puis modifiez votre route GET /api/livres pour gérer la pagination
  else if (
    req.method === "GET" &&
    pathname === "/api/livres" &&
    url.searchParams.has("page")
  ) {
    try {
      await getBooksPaginatedController(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Erreur lors de la pagination des livres",
          details: err.message,
        }),
      );
    }
  }

  //get tout les livers
  else if (req.method === "GET" && pathname === "/api/livres") {
    try {
      const books = await getAllBooksController();
      res.statusCode = 200;
      res.end(JSON.stringify(books));
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Erreur lors de la récupération des livres" }),
      );
    }
  }
  // Route pour récupérer un livre par ID
  else if (req.method === "GET" && pathname.startsWith("/api/livres/")) {
    const id = pathname.split("/").pop(); // Récupère l'ID dans l'URL
    try {
      const book = await getBookByIdController(id);
      if (!book) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Livre non trouvé" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(book));
      }
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Erreur lors de la récupération du livre" }),
      );
    }
  }
  //Ajoute nouveau Livre
  else if (req.method === "POST" && pathname === "/api/livres") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const auteur = JSON.parse(body);
        const result = await addBookController(auteur);
        res.statusCode = 201;
        res.end(JSON.stringify(result));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Erreur lors de l'ajout du livre" }));
      }
    });

    //route pour modifier un livre
  } else if (req.method === "PUT" && req.url.startsWith("/api/livres/")) {
    const id = pathname.split("/").pop(); // Récupère l'ID dans l'URL
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body); // Convertit le JSON reçu
        const result = await updateBookController(id, data);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (error) {
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            error: "Erreur lors de la mise à jour de l'emprunt",
            details: error.message,
          }),
        );
      }
    });
  }

  // Route pour récupérer les livres par genre

  // Gestion des routes pour les auteurs

  //get tout les auteurs
  else if (req.method === "GET" && pathname === "/api/auteurs") {
    try {
      const auteurs = await getAllAuteursController();
      res.statusCode = 200;
      res.end(JSON.stringify(auteurs));
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Erreur lors de la récupération des auteurs" }),
      );
    }
  }
  //Ajouter nouveau auteur
  else if (req.method === "POST" && pathname === "/api/auteur") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const auteur = JSON.parse(body);
        const result = await addAuteurController(auteur);
        res.statusCode = 201;
        res.end(JSON.stringify(result));
      } catch (err) {
        res.statusCode = 500;
        res.end(
          JSON.stringify({ error: "Erreur lors de l'ajout de l'auteur" }),
        );
      }
    });
  }

  // Route pour récupérer un auteur par ID
  else if (req.method === "GET" && pathname.startsWith("/api/auteurs/")) {
    const id = pathname.split("/").pop(); // Récupère l'ID dans l'URL
    try {
      const book = await getAuteurByIdController(id);
      if (!book) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Auteur non trouvé" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(book));
      }
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Erreur lors de la récupération de l'emprunt",
        }),
      );
    }

    //update auteur
  } else if (req.method === "PUT" && req.url.startsWith("/api/auteurs/")) {
    const id = pathname.split("/").pop(); // Récupère l'ID dans l'URL
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body); // Convertit le JSON reçu
        const result = await updateAuteurController(id, data);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (error) {
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            error: "Erreur lors de la mise à jour de l'auteur",
            details: error.message,
          }),
        );
      }
    });
  }

  //get tout les emprunts
  else if (req.method === "GET" && pathname === "/api/emprunts") {
    try {
      const emprunt = await getAllEmpruntController();
      res.statusCode = 200;
      res.end(JSON.stringify(emprunt));
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Erreur lors de la récupération des emprunt" }),
      );
    }
  } else if (req.method === "POST" && pathname === "/api/emprunt") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const emprunt = JSON.parse(body);
        console.log("Données reçues pour ajout :", emprunt);
        const result = await addEmpruntController(emprunt);
        res.statusCode = 201;
        res.end(JSON.stringify(result));
      } catch (err) {
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            error: "Erreur lors de l'ajout de l'emprunt", // Garder un message générique pour le front-end
            details: err.message, // Renvoyer les détails de l'erreur
          }),
        );
      }
    });
  }

  // Route pour récupérer un emprunt par ID
  else if (req.method === "GET" && pathname.startsWith("/api/emprunt/")) {
    const id = pathname.split("/").pop(); // Récupère l'ID dans l'URL
    try {
      const emprunt = await getEmpruntByIdController(id);
      if (!emprunt) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Emprunt non trouvé" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(emprunt));
      }
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Erreur lors de la récupération de l'emprunt",
        }),
      );
    }
  } else if (req.method === "DELETE" && pathname.startsWith("/api/emprunt/")) {
    const id = pathname.split("/").pop();
    try {
      const result = await deleteEmpruntController(id);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Erreur lors de la suppression de l'emprunt" }),
      );
    }
  } else if (req.method === "PUT" && req.url.startsWith("/api/emprunt/")) {
    console.log("Chemin de l'URL :", pathname);
    const id = pathname.split("/").pop(); // Récupère l'ID dans l'URL
    console.log("ID récupéré :", id); // Vérifie si l'ID est correct
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body); // Convertit le JSON reçu
        console.log("entrée dans route"); // Vérifie les données reçues
        const result = await updateEmpruntController(id, data);
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'emprunt :", error);
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            error: "Erreur lors de la mise à jour de l'emprunt",
            details: error.message,
          }),
        );
      }
    });
  }

  // Si la route n'existe pas
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route non trouvée" }));
  }
};
