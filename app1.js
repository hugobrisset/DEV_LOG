const fs = require('fs');


function readUserFile(){
  let rawdata = fs.readFileSync('users.json');
  return users = JSON.parse(rawdata);
}

function getInput(){
  let input = process.argv[2];
  return input;
}

function compteur(users, propriete){
  return users.reduce((acc, user) => {
    acc[user[propriete]] = (acc[user[propriete]] || 0) + 1;
    return acc;
  },{});
}

function trier_ordre_decroissant(compteur_par_propriete){
  return Object.entries(compteur_par_propriete).sort((a,b) => b[1] - a[1]);
}

function afficher_liste(compteur_par_propriete_trier,propriete){
  compteur_par_propriete_trier.forEach(([propriete,count]) => {
    console.log(`${propriete} - ${count}`);
  });
}


let input = getInput();
const user = readUserFile();
if(input === 'country')
{
  const compteur_par_pays = compteur(user,'country');
  const compteur_par_pays_trier = trier_ordre_decroissant(compteur_par_pays);
  afficher_liste(compteur_par_pays_trier,'country');
}

else if(input === 'company')
{
  const compteur_par_company = compteur(user,'company');
  const compteur_par_company_trier = trier_ordre_decroissant(compteur_par_company);
  afficher_liste(compteur_par_company_trier,'company');
}