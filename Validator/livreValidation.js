import { livreExiste } from "../repositories/livreRepository.js";

export const validateLivre = async (livre) => {
  console.log("entrée dans le validator");
  console.log("Livre reçu dans la validation :", livre);

  let errors = [];
  if (!livre.id_livre || isNaN(livre.id_livre)) {
    errors.push("L'id doit être un nombre valide.");
  }
  // Validation de l'ID du livre
  try {
    const existe = await livreExiste(livre.id_livre);
    console.log("Résultat de livreExiste :", existe);
    // Assure-toi que tu passes bien livre.id_livre
    if (existe) {
      errors.push(`L'ID ${livre.id_livre} est déjà utilisé.`);
    }
  } catch (error) {
    errors.push("Erreur lors de la validation de l'ID.");
    console.error(error);
  }

  // Validation des autres champs du livre

  if (!livre.titre || livre.titre.trim() === "") {
    errors.push("Le titre du livre est obligatoire.");
  }
  if (!livre.ISBN || isNaN(livre.ISBN)) {
    errors.push("L'ISBN doit être un nombre valide.");
  }
  if (!livre.annee_publication || isNaN(livre.annee_publication)) {
    errors.push("L'année de publication doit être un nombre valide.");
  }
  if (!livre.editeur || livre.editeur.trim() === "") {
    errors.push("L'editeur du livre est obligatoire.");
  }
  if (!livre.id_genre || livre.id_genre.trim() === "") {
    errors.push("L'id_genre du livre est obligatoire.");
  }

  return {
    isValid: errors.length === 0, // Si le tableau des erreurs est vide, c'est valide
    errors,
  };
};
