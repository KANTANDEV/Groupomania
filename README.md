------------------------------------------------------------ VISUEL ------------------------------------------------------------


![Capture](https://user-images.githubusercontent.com/94462048/180648260-f8ba51f5-f9f9-46b3-be05-11220ee3f744.PNG)
![Capture1](https://user-images.githubusercontent.com/94462048/180648263-75933eef-e1b7-4e1f-a603-c9f1f2da3764.PNG)
![Capture3](https://user-images.githubusercontent.com/94462048/180648265-9e559a2c-f7a5-4ca2-a2df-b9ff3fc41fed.PNG)


------------------------------------------------------------ INSTALLATION ------------------------------------------------------------


------------------------------------------------------------ Pour le jury ------------------------------------------------------------

La base de donnee est hebergé en ligne vous y avait acces avec les variables d'environements celle ci sont deja incluse dans le projet
uploadé sur openclassrooms, vous pouvez donc sauté l'etape de la création de vaiables d'environement.

----------------------------------------------------------------------------------------------------------------------------------------


<!> Avant de commencer, assurez-vous d'avoir nodejs et npm installés sur votre système.
<!> Avant de commencer, assurez-vous d'avoir nodemon  sur votre système.
Si ce n'est pas le cas rendez vous dans le dossier du projet et executer la commande : npm install -g nodemon
Si vous avez une erreur powershell : Execution de scripts desactive. Ouvrez un powershell windows en mode administrateur et executer : 
Set-ExecutionPolicy -ExecutionPolicy Unrestricted

<!>Cree un fichier .env dans le dossier Backend comme ceci :

DB_LOG = identifiant + mot de passe de votre base de donnee mongoDB. Exemple : DB_LOG = admin:admin

TOKEN = cree un token avec un site comme " https://randomkeygen.com/"

FRONT_URL =http://localhost:3000

<!>Cree un fichier .env dans le dossier Backend comme ceci :

REACT_APP_API_URL=http://localhost:4000/

<!>Assurez-vous également d'avoir vos ports localhost:3000 et localhost:5000 non utilisés.

------------------------------------------------------------------------------------------------------------------------

1- Télécharger les fichiers.

Au dessus des fichiers présents sur le repository Git, vous pouvez télécharger ou cloner le dossier, je vous recommande
de télécharger le fichier ZIP tout simplement, et d'extraire son contenu à l'emplacement souhaité sur votre ordinateur,
sur le bureau par exemple.

------------------------------------------------------------------------------------------------------------------------

2- Installer l'application Backend.

Pour installer l'application backend, ouvrez un terminal (Git Bash, par exemple) et rendez-vous à l'aide du terminal
dans le dossier: (l'emplacementChoisi)/Backend

Executez la commande:

npm install

L'installation des différentes dépendances devrait s'effectuer automatiquement.

------------------------------------------------------------------------------------------------------------------------

3- Lancer l'application Backend.
Une fois l'application installée, dans votre terminal, toujours dans le dossier

(l'emplacementChoisi)/Backend

Executez la commande:

npm run start

L'application devrait se lancer, et si les précédentes étapes ont correctement fonctionné, le terminal devrait vous afficher
les informations suivantes:

[nodemon] starting `node server.js`
Listening on port 4000
Connexion à MongoDB Atlas réussie !

//Vous pouvez réduire ce terminal dans votre barre des tâches, ou bien le garder de côté,
//l'application backend est en fonctionnement.


------------------------------------------------------------------------------------------------------------------------


4- Installer l'application Frontend.
Pour installer l'application frontend, ouvrez un nouveau terminal, cette fois-ci rendez-vous dans le dossier

(l'emplacementChoisi)/frontend

Executez la commande:

npm install
L'installation des différentes dépendances de l'application frontend s'opèrera.


------------------------------------------------------------------------------------------------------------------------

5- Lancer l'application Frontend.
Comme pour l'application backend, une fois les dépendances installées, dans le dossier 
GroupomaniaReact-main/groupomania_front

Executez dans votre terminal la commande

npm run start

Si les précédentes étapes ont correctement fonctionné, le terminal affichera le message suivant:

Compiled successfully!

You can now view groupomania_front in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://*ipLocaleDeVotreMachine*:3000

Note that the development build is not optimized. 
To create a production build, use npm run build.

webpack compiled successfully

Un onglet devrait s'ouvrir dans votre navigateur, et vous mener directement sur la page d'accueil du site.
Si le message dans le terminal correspond, mais qu'aucun onglet ni fenêtre s'ouvre automatiquement, 
rendez-vous manuellement à l'adresse http://localhost:3000/ dans votre navigateur.

------------------------------------------------------------------------------------------------------------------------
 
