import { empruntExiste } from "../repositories/empruntRepository.js";
import { membreExiste } from "../repositories/empruntRepository.js";
import { exemplaireExiste } from "../repositories/empruntRepository.js";

export const validateEmprunt = async (emprunt) => {
  console.log("Données reçues pour validation de l'emprunt :", emprunt);

  let errors = [];

  if (!emprunt.id_emprunt || isNaN(emprunt.id_emprunt)) {
    errors.push("L'id emprunt doit être un nombre valide.");
  }
  if (!emprunt.id_exemplaire || isNaN(emprunt.id_exemplaire)) {
    errors.push("L'id exemplaire doit être un nombre valide.");
  }

  // Vérifier si l'emprunt existe
  try {
    const empruntExist = await empruntExiste(emprunt.id_emprunt);
    if (empruntExist) {
      errors.push("L'emprunt existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'emprunt :", error);
    errors.push("Erreur lors de la vérification de l'emprunt.");
  }

  // Vérifier si le membre existe
  try {
    const membreValid = await membreExiste(emprunt.id_membre);
    if (!membreValid) {
      errors.push("Le membre n'existe pas.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du membre :", error);
    errors.push("Erreur lors de la vérification du membre.");
  }

  // Vérifier si l'exemplaire existe
  try {
    const exemplaireValid = await exemplaireExiste(emprunt.id_exemplaire);
    if (!exemplaireValid) {
      errors.push("Cet exemplaire n'existe pas.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'exemplaire :", error);
    errors.push("Erreur lors de la vérification de l'exemplaire.");
  }
  if (!emprunt.date_emprunt || emprunt.date_emprunt.trim() === "") {
    errors.push("La date d'emprunt du livre est obligatoire.");
  }
  if (!emprunt.date_retour_prevue || emprunt.date_retour_prevue.trim() === "") {
    errors.push("La date du retour effective du livre est obligatoire.");
  }
  if (
    !emprunt.date_retour_effective ||
    emprunt.date_retour_prevue.trim() === ""
  ) {
    errors.push("La date du retour prevu du livre est obligatoire.");
  }
  return {
    isValid: errors.length === 0, // Si aucune erreur n'est présente
    errors,
  };
};

//if (!livre.titre || livre.titre.trim() === "") {
//   errors.push("Le titre du livre est obligatoire.");
// }
// if (!livre.ISBN || isNaN(livre.ISBN)) {
//   errors.push("L'ISBN doit être un nombre valide.");
// }
