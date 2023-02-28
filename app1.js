const fs = require('fs');
const readline = require('readline');

// Lire le fichier des utilisateurs
let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

// Définir les options du menu pour l'utilisateur
const menuOptions = [
  { name: '-- Pays', value: 'country' },
  { name: '-- Entreprise', value: 'company' },
  { name: '-- Quitter', value: 'quit' },
];

// Créer l'interface de ligne de commande pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Afficher le menu
function afficherMenu() {
  console.log('Que voulez-vous faire ?');
  menuOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option.name}`);
  });
}

// Lire l'entrée utilisateur
function getInput() {
  rl.question(`Entrez un chiffre entre 1 et ${menuOptions.length}: `, (answer) => {
    const optionIndex = parseInt(answer) - 1;
    if (optionIndex >= 0 && optionIndex < menuOptions.length) {
      const option = menuOptions[optionIndex];
      if (option.value === 'quit') {
        rl.close();
      } else {
        compteur(option.value);
      }
    } else {
      console.log(`Choix invalide. Entrez un chiffre entre 1 et ${menuOptions.length}.`);
      getInput();
    }
  });
}

// Compter les utilisateurs selon l'option sélectionnée
function compteur(option) {
  if (option === 'country') {
    const countByCountry = compteur_par_propriete('country');
    afficherCompteur(countByCountry);
  } else if (option === 'company') {
    const countByCompany = compteur_par_propriete('company');
    afficherCompteur(countByCompany);
  }
}

// Compter les utilisateurs par pays ou entreprise
function compteur_par_propriete(prop) {
  return users.reduce((acc, user) => {
    acc[user[prop]] = (acc[user[prop]] || 0) + 1;
    return acc;
  }, {});
}

// Afficher le comptage
function afficherCompteur(countObj) {
  const sortedCount = sortCount(countObj);
  sortedCount.forEach(([key, value]) => {
    console.log(`${key} - ${value}`);
  });
  getInput();
}

// Trier le comptage par ordre décroissant
function sortCount(countObj) {
  return Object.entries(countObj).sort((a, b) => b[1] - a[1]);
}

// Démarrer le programme en affichant le menu
afficherMenu();
getInput();