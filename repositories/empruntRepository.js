import db from "../config/database.js"; // Assurer que la connexion à la base de données est correctement configurée

// Récupérer tous les auteurs
export const getAllEmprunt = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Emprunt", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Ajouter un Emprunt
export const addEmprunt = async (
  id_emprunt,
  id_membre,
  id_exemplaire,
  date_emprunt,
  date_retour_prevue,
  date_retour_effective,
) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Emprunt (id_emprunt, id_membre, id_exemplaire, date_emprunt, date_retour_prevue, date_retour_effective ) VALUES (?, ?, ?, ?,?,?)";
    db.run(
      sql,
      [
        id_emprunt,
        id_membre,
        id_exemplaire,
        date_emprunt,
        date_retour_prevue,
        date_retour_effective,
      ],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};

export async function getEmpruntById(id) {
  console.log("Requête en cours pour l'ID :", id);

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM Emprunt WHERE id_emprunt = ?",
      [Number(id)],
      (err, row) => {
        if (err) {
          console.error("Erreur SQL :", err);
          reject(err);
        } else {
          console.log("Résultat SQL :", row);
          resolve(row);
        }
      },
    );
  });
}

export const deleteEmprunt = async (id_emprunt) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Emprunt WHERE id_emprunt = ?";
    db.run(sql, [id_emprunt], function (err) {
      if (err) reject(err);
      else resolve({ message: "Emprunt supprimé avec succès !" });
    });
  });
};

export const updateEmprunt = async (
  id_emprunt,
  id_membre,
  id_exemplaire,
  date_emprunt,
  date_retour_prevue,
  date_retour_effective,
) => {
  return new Promise((resolve, reject) => {
    console.log("Paramètres de la requête SQL :", {
      id_emprunt,
      id_membre,
      id_exemplaire,
      date_emprunt,
      date_retour_prevue,
      date_retour_effective,
    });

    const sql = `
      UPDATE Emprunt
      SET id_membre = ?, id_exemplaire = ?, date_emprunt = ?, 
          date_retour_prevue = ?, date_retour_effective = ?
      WHERE id_emprunt = ?`;

    db.run(
      sql,
      [
        id_membre,
        id_exemplaire,
        date_emprunt,
        date_retour_prevue,
        date_retour_effective,
        id_emprunt,
      ],
      function (err) {
        if (err) {
          console.error("Erreur SQL :", err); // Log l'erreur SQL
          reject(err);
        } else {
          resolve({ message: "Emprunt mis à jour avec succès !" });
        }
      },
    );
  });
};

export const empruntExiste = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id_emprunt FROM Emprunt WHERE id_emprunt = ?",
      [id],
      (err, row) => {
        if (err) {
          console.error("Erreur lors de la vérification de l'emprunt :", err);
          reject(err);
        } else {
          resolve(!!row); // Retourne true si l'emprunt existe
        }
      },
    );
  });
};
export const membreExiste = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id_membre FROM Membre WHERE id_membre = ?",
      [id],
      (err, row) => {
        if (err) {
          console.error("Erreur lors de la vérification du membre :", err);
          reject(err);
        } else {
          resolve(!!row); // Retourne true si le membre existe
        }
      },
    );
  });
};

export const exemplaireExiste = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id_exemplaire FROM Exemplaire WHERE id_exemplaire = ?",
      [id],
      (err, row) => {
        if (err) {
          console.error(
            "Erreur lors de la vérification de l'exemplaire :",
            err,
          );
          reject(err);
        } else {
          resolve(!!row); // Retourne true si l'exemplaire existe
        }
      },
    );
  });
};
