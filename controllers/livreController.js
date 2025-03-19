import {
  getBooks,
  createBook,
  getBookByIdService,
  updateBookService,
  getLivresByGenre,
  getLivresByAuthor,
  getBooksPaginatedService,
} from "../services/livreService.js";

// Fonction pour gérer la récupération de tous les livres
export const getAllBooksController = async () => {
  try {
    return await getBooks();
  } catch (err) {
    throw err;
  }
};

// Fonction pour gérer la création d'un livre
export const addBookController = async (book) => {
  try {
    return await createBook(book);
  } catch (err) {
    throw err;
  }
};

// Récupérer un livre par ID
export async function getBookByIdController(id) {
  return await getBookByIdService(id);
}

// Mettre à jour un livre
export const updateBookController = async (id, bookData) => {
  console.log("entrée dans controller");
  try {
    return await updateBookService(
      id,
      bookData.titre,
      bookData.ISBN,
      bookData.annee_publication,
      bookData.editeur,
      bookData.id_genre,
    );
  } catch (err) {
    throw err;
  }
};

export const getLivresByGenreController = async (req, res) => {
  console.log("entrée dans le controller");

  const { genre } = req.params; // Récupérer le genre des params
  try {
    const livres = await getLivresByGenre(genre);
    if (livres.length === 0) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Aucun livre trouvé pour ce genre" }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(livres));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Erreur lors de la récupération des livres par genre",
      }),
    );
  }
};

export const getLivresByAuthorController = async (req, res) => {
  console.log("entrée dans le controller");

  const { nom } = req.params; // Récupérer le nom des params
  try {
    const livres = await getLivresByAuthor(nom);
    if (livres.length === 0) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Aucun livre trouvé pour cet auteur" }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Livres trouvés:", books: livres }));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Erreur lors de la récupération des livres par auteur",
      }),
    );
  }
};

// Dans livreController.js, importez la fonction du service

// Puis ajoutez cette nouvelle fonction
// Controller pour la pagination des livres
export const getBooksPaginatedController = async (req, res) => {
  try {
    // Extraire les paramètres de l'URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;

    console.log(
      `Controller - Pagination demandée: page=${page}, limit=${limit}`,
    );

    // Appeler le service
    const result = await getBooksPaginatedService(page, limit);

    // Envoyer la réponse
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } catch (err) {
    console.error("Erreur dans le controller de pagination:", err);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Erreur lors de la récupération des livres paginés",
        details: err.message,
      }),
    );
  }
};
