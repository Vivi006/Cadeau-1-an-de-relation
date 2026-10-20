# Cadeau digital

1. Ouvre `js/config.js` : code secret (chiffres), lettre, frise, légendes, date, titres des musiques.
2. Mets tes fichiers mp3 dans `assets/music/` (`son1.mp3`, `son2.mp3`...), tes trois photos dans `assets/photos/` et tes trois vidéos MP4 dans `assets/videos/`. Les noms doivent être identiques à ceux de `js/config.js` (`photo1.jpg` à `photo3.jpg` et `video1.mp4` à `video3.mp4`).
3. Teste avec « Live Server » de VSCode, ou en ouvrant `index.html`. Les cartes de l'accueil et les boutons en bas des pages permettent de parcourir le cadeau sans barre de navigation ; touche une photo pour l'agrandir, puis touche-la une deuxième fois pour la réduire. Les vidéos se lisent depuis leur lecteur intégré.
4. Pour envoyer le projet sur GitHub depuis le terminal intégré de VS Code, crée d’abord un dépôt vide sur GitHub, puis lance ces commandes à la racine du dossier (remplace l’adresse par celle de ton dépôt) :

   ```powershell
   git init
   git add .
   git commit -m "Ajout du cadeau digital"
   git branch -M main
   git remote add origin https://github.com/TON-UTILISATEUR/TON-DEPOT.git
   git push -u origin main
   ```

   Si le dépôt Git est déjà initialisé et que `origin` existe, utilise plutôt `git add .`, `git commit -m "Mise à jour du cadeau"` puis `git push`. Ces commandes déposent le code sur GitHub ; elles ne publient pas le site sur GitHub Pages.

La musique démarre automatiquement à l'ouverture si le navigateur l'autorise. Certains navigateurs bloquent la lecture automatique avec le son : dans ce cas, elle démarre dès que le code secret est correctement saisi. Le bouton du lecteur permet ensuite de la mettre en pause ou de la relancer.

La bibliothèque contient quatre emplacements audio : ajoute tes fichiers `son1.mp3` à `son4.mp3` dans `assets/music/` et modifie leurs titres/artistes dans `js/config.js`. Le fond pastel et les polices décoratives sont définis dans `css/style.css` et chargés depuis Google Fonts.

Les effets incluent des étoiles filantes, une traînée de cœurs et des étincelles au toucher/clic. Ils sont désactivés lorsque la préférence de réduction des animations est activée.

Le code secret est lisible dans `config.js` : il garde la surprise, il ne protège pas des données sensibles.
Les mp3 lourds ralentissent le chargement : vise 3 à 5 Mo par titre.
