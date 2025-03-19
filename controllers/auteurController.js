import {
  getAllAuteurs,
  addAuteur,
  getAuteurById,
} from "../services/auteurService.js";
import { updateAuteurService } from "../services/auteurService.js"; // Import du service
// Récupérer tous les auteurs
// Récupérer tous les auteurs
export const getAllAuteursController = async () => {
  try {
    const auteurs = await getAllAuteurs(); // Appel au service, pas au repository !
    return auteurs;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des auteurs");
  }
};

// Ajouter un auteur
export const addAuteurController = async (auteur) => {
  try {
    console.log("Auteur reçu dans le controller :", auteur);

    // Vérification de l'objet auteur
    if (!auteur) {
      throw new Error("L'objet auteur est incomplet !");
    }

    // Appel du service en envoyant tout l'objet
    const newAuteur = await addAuteur(auteur);

    return newAuteur;
  } catch (error) {
    console.error("Erreur dans le controller :", error.message);
    return {
      status: "error",
      message: error.message || "Erreur lors de l'ajout de l'auteur",
    };
  }
};

// Récupérer un auteur par ID
export async function getAuteurByIdController(id) {
  return await getAuteurById(id); // Utilisation du service !
}

// Mettre à jour un auteur
export const updateAuteurController = async (id, auteurData) => {
  console.log("entrée dans controller");
  try {
    const result = await updateAuteurService(
      // Correction ici !
      id,
      auteurData.nom,
      auteurData.prenom,
      auteurData.naissance,
      auteurData.nationalite,
    );
    return result;
  } catch (err) {
    throw err;
  }
};
