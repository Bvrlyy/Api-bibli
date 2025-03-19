import * as auteurRepository from "../repositories/auteurRepository.js";

export const validateAuteur = async (auteur) => {
  console.log("entrée dans la validation :", auteur);

  let errors = [];
  let isValid = true;

  // Vérifier que l'objet auteur est bien défini
  if (!auteur) {
    errors.push("L'objet auteur est obligatoire.");
    isValid = false;
  } else {
    if (!auteur.id_auteur || isNaN(auteur.id_auteur) || auteur.id_auteur <= 0) {
      errors.push("L'ID de l'auteur est obligatoire et doit être positif.");
    }
    if (!auteur.nom || auteur.nom.trim() === "") {
      errors.push("Le nom de l'auteur est obligatoire.");
    }
    if (!auteur.prenom || auteur.prenom.trim() === "") {
      errors.push("Le prénom de l'auteur est obligatoire.");
    }

    // Vérifier si l'ID de l'auteur existe déjà
    if (auteur.id_auteur) {
      const existsById = await auteurRepository.auteurExisteParId(
        auteur.id_auteur,
      );
      if (existsById) {
        errors.push(`Un auteur avec l'ID ${auteur.id_auteur} existe déjà.`);
        isValid = false;
      }
    }
  }

  return {
    isValid,
    errors,
  };
};
