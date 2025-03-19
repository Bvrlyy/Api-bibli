import * as empruntRepository from "../repositories/empruntRepository.js";
import { validateEmprunt } from "../Validator/empruntValidation.js"; // Assure-toi de bien importer le validator

export const getAllEmprunt = async () => {
  return await empruntRepository.getAllEmprunt();
};

export const createEmprunt = async (
  id_emprunt,
  id_membre,
  id_exemplaire,
  date_emprunt,
  date_retour_prevue,
  date_retour_effective,
) => {
  try {
    // Validation de l'emprunt
    const validation = await validateEmprunt({
      id_emprunt,
      id_membre,
      id_exemplaire,
      date_emprunt,
      date_retour_prevue,
      date_retour_effective,
    });

    // Si ce n'est pas valide, renvoyer les erreurs
    if (!validation.isValid) {
      const errorResponse = {
        status: "error",
        message: validation.errors.join(", "), // Joindre les erreurs en une chaîne
      };
      return errorResponse;
    }

    // Si tout est valide, on ajoute l'emprunt
    const result = await empruntRepository.addEmprunt(
      id_emprunt,
      id_membre,
      id_exemplaire,
      date_emprunt,
      date_retour_prevue,
      date_retour_effective,
    );

    return {
      status: "success",
      message: "L'emprunt a été créé avec succès.",
      data: result,
    };
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de l'emprunt ici laaaa:",
      error.message,
    );
    return {
      status: "error",
      message: "Une erreur est survenue lors de l'ajout de l'emprunt.",
      error: error.message,
    };
  }
};

export const getEmpruntById = async (id) => {
  return await empruntRepository.getEmpruntById(id);
};

export const deleteEmprunt = async (id_emprunt) => {
  return await empruntRepository.deleteEmprunt(id_emprunt);
};

export const updateEmprunt = async (
  id_emprunt,
  id_membre,
  id_exemplaire,
  date_emprunt,
  date_retour_prevue,
  date_retour_effective,
) => {
  console.log("Données reçues par le service :", {
    id_emprunt,
    id_membre,
    id_exemplaire,
    date_emprunt,
    date_retour_prevue,
    date_retour_effective,
  });

  return await empruntRepository.updateEmprunt(
    id_emprunt,
    id_membre,
    id_exemplaire,
    date_emprunt,
    date_retour_prevue,
    date_retour_effective,
  );
};
