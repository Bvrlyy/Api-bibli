CREATE TABLE Livre (
  id_livre INTEGER PRIMARY KEY,
  titre TEXT,
  ISBN TEXT UNIQUE,
  annee_publication INTEGER,
  editeur TEXT,
  id_genre INTEGER,
  FOREIGN KEY (id_genre) REFERENCES Genre(id_genre)
);

CREATE TABLE Genre (
  id_genre INTEGER PRIMARY KEY,
  nom TEXT UNIQUE,
  description TEXT
);

CREATE TABLE Auteur (
  id_auteur INTEGER PRIMARY KEY,
  nom TEXT,
  prenom TEXT,
  naissance DATE,
  nationalite TEXT
);

CREATE TABLE Ecrit (
  id_livre INTEGER,
  id_auteur INTEGER,
  PRIMARY KEY (id_livre, id_auteur),
  FOREIGN KEY (id_livre) REFERENCES Livre(id_livre),
  FOREIGN KEY (id_auteur) REFERENCES Auteur(id_auteur)
);

CREATE TABLE Exemplaire (
  id_exemplaire INTEGER PRIMARY KEY,
  id_livre INTEGER,
  disponibilite BOOLEAN,
  FOREIGN KEY (id_livre) REFERENCES Livre(id_livre)
);

CREATE TABLE Membre (
  id_membre INTEGER PRIMARY KEY,
  nom TEXT,
  prenom TEXT,
  adresse TEXT,
  mail TEXT UNIQUE,
  numero TEXT UNIQUE
);

CREATE TABLE Emprunt (
  id_emprunt INTEGER PRIMARY KEY,
  id_membre INTEGER,
  id_exemplaire INTEGER,
  date_emprunt TEXT,
  date_retour_prevue TEXT,
  date_retour_effective TEXT,
  FOREIGN KEY (id_membre) REFERENCES Membre(id_membre),
  FOREIGN KEY (id_exemplaire) REFERENCES Exemplaire(id_exemplaire)
);

