import * as auteurRepository from "../repositories/auteurRepository.js";
import { validateAuteur } from "../Validator/auteurValidation.js"; // Assure-toi d'avoir ton fichier de validation

// Fonction pour obtenir tous les auteurs
export const getAllAuteurs = async () => {
  return await auteurRepository.getAllAuteurs();
};

// Fonction pour ajouter un auteur
export const addAuteur = async (
  id_auteur,
  nom,
  prenom,
  naissance,
  nationalite,
) => {
  try {
    console.log(
      "entrée try du add Auteur, on vas verifier la valdiation.",
      id_auteur,
    );

    // Validation de l'auteur
    const validation = await validateAuteur(id_auteur, nom, prenom); // Vérifie si l'auteur existe déjà par ID, nom ou prénom

    // Si ce n'est pas valide, renvoyer les erreurs
    if (!validation.isValid) {
      const errorResponse = {
        status: "error",
        message: validation.errors.join(", "), // Joindre les erreurs en une chaîne
      };
      return errorResponse;
    }

    // Si tout est valide, on ajoute l'auteur
    const result = await auteurRepository.addAuteur(
      id_auteur,
      nom,
      prenom,
      naissance,
      nationalite,
    );

    return {
      status: "success",
      message: "L'auteur a été ajouté avec succès.",
      data: result,
    };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'auteur:", error.message);
    return {
      status: "error",
      message: "Une erreur est survenue lors de l'ajout de l'auteur.",
      error: error.message,
    };
  }
};
// Fonction pour récupérer un auteur par son ID
export const getAuteurById = async (id) => {
  return await auteurRepository.getAuteurById(id);
};

export const updateAuteurService = async (
  id_auteur,
  nom,
  prenom,
  naissance,
  editeur,
) => {
  console.log("Données reçues par le service :", {
    id_auteur,
    nom,
    prenom,
    naissance,
    editeur,
  });

  return await auteurRepository.updateAuteur(
    id_auteur,
    nom,
    prenom,
    naissance,
    editeur,
  );
};
