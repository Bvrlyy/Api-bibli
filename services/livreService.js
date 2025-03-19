import {
  getAllBooks,
  addBook,
  getBookById,
  findByGenre,
  findByAuthor,
  getBooksPaginated,
} from "../repositories/livreRepository.js";
import { updateBook } from "../repositories/livreRepository.js";
import { validateLivre } from "../Validator/livreValidation.js";

// Fonction pour obtenir tous les livres
export const getBooks = async () => {
  try {
    const books = await getAllBooks();
    return books;
  } catch (err) {
    throw err;
  }
};

// Fonction pour ajouter un livre
export const createBook = async (book) => {
  try {
    // Vérification des données avant l'insertion
    const validation = await validateLivre(book); // Ajout de await ici pour obtenir la promesse résolue
    if (!validation.isValid) {
      console.log("Erreur validation :", validation.errors);
      // Lancer une erreur avec toutes les erreurs de validation
      const errorResponse = {
        status: "error",
        message: validation.errors.join(", "), // Joindre toutes les erreurs en une seule chaîne
      };
      return errorResponse; // Affiche toutes les erreurs sous forme de chaîne
    }

    // Ajouter le livre si tout est valide
    const result = await addBook(book);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre:", error.message);
    throw error; // Relancer l'erreur après l'avoir loggée
  }
};

// Fonction pour récupérer un livre par ID
export const getBookByIdService = async (id) => {
  try {
    const book = await getBookById(id); // Appel à la fonction du repository
    return book;
  } catch (err) {
    throw err;
  }
};
export const updateBookService = async (
  id_livre,
  titre,
  ISBN,
  annee_publication,
  editeur,
  id_genre,
) => {
  console.log("Données reçues par le service :", {
    id_livre,
    titre,
    ISBN,
    annee_publication,
    editeur,
    id_genre,
  });

  return await updateBook(
    id_livre,
    titre,
    ISBN,
    annee_publication,
    editeur,
    id_genre,
  );
};

export const getLivresByGenre = async (genreNom) => {
  console.log("entrée dnas le service");
  try {
    return await findByGenre(genreNom);
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération des livres : " + error.message,
    );
  }
};

export const getLivresByAuthor = async (id) => {
  console.log("entrée dnas le service");
  try {
    return await findByAuthor(id);
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération des livres : " + error.message,
    );
  }
};

// Dans livreService.js, ajoutez cette nouvelle fonction
// Service pour la pagination
export const getBooksPaginatedService = async (page, limit) => {
  try {
    console.log(
      `Service - Demande de pagination: page=${page}, limit=${limit}`,
    );
    return await getBooksPaginated(page, limit);
  } catch (err) {
    console.error("Erreur dans le service de pagination:", err);
    throw err;
  }
};
