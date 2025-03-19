import * as empruntService from "../services/empruntService.js";

// Récupérer tous les emprunts
export const getAllEmpruntController = async () => {
  try {
    return await empruntService.getAllEmprunt();
  } catch (err) {
    throw err;
  }
};

// Ajouter un emprunt
export const addEmpruntController = async (emprunt) => {
  try {
    const {
      id_emprunt,
      id_membre,
      id_exemplaire,
      date_emprunt,
      date_retour_prevue,
      date_retour_effective,
    } = emprunt;

    return await empruntService.createEmprunt(
      id_emprunt,
      id_membre,
      id_exemplaire,
      date_emprunt,
      date_retour_prevue,
      date_retour_effective,
    );
  } catch (err) {
    throw err;
  }
};

// Récupérer un emprunt par ID
export const getEmpruntByIdController = async (id) => {
  return await empruntService.getEmpruntById(id);
};

// Supprimer un emprunt
export const deleteEmpruntController = async (id_emprunt) => {
  try {
    return await empruntService.deleteEmprunt(id_emprunt);
  } catch (err) {
    throw err;
  }
};

// Mettre à jour un emprunt
export const updateEmpruntController = async (id, empruntData) => {
  console.log("entrée dans controller");
  try {
    return await empruntService.updateEmprunt(
      id,
      empruntData.id_membre,
      empruntData.id_exemplaire,
      empruntData.date_emprunt,
      empruntData.date_retour_prevue,
      empruntData.date_retour_effective,
    );
  } catch (err) {
    throw err;
  }
};
