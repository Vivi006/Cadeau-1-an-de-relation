/* ============================================================
   TOUT CE QUE TU DOIS PERSONNALISER EST ICI
   ============================================================ */
const CONFIG = {
  prenomLui: "mon amour Bilal",
  code: "251025",                         // chiffres uniquement (4 à 6 chiffres conseillés)
  indice: "la date de notre rencontre (JJMMAA)",
  dateRencontre: "2025-10-25T00:00:00", // AAAA-MM-JJTHH:MM:SS, pour le compteur en direct
  titrePrincipal: "Nous deux, malgré la distance",

  /* Bibliothèque musicale : dépose tes fichiers mp3 dans assets/music/
     La musique joue en boucle : quand un titre finit, le suivant démarre,
     et le dernier renvoie au premier. Le 1er titre se lance à l'entrée.
     "spotify" est facultatif : colle le lien du titre pour afficher un bouton. */
  musiques: [
    { fichier: "assets/music/Elvis Presley - Cant Help Falling In Love (Official Audio).mp3", titre: "Can't Help Falling In Love",   artiste: "Elvis Presley", spotify: "" },
    { fichier: "assets/music/Olivia Newton-John - Hopelessly Devoted to You (Lyrics) But now theres nowhere to hide.mp3", titre: "Hopelessly Devoted to You",  artiste: "Olivia Newton-John", spotify: "" },
    { fichier: "assets/music/Sade - Kiss Of Life - Official - 1993.mp3", titre: "Kiss Of Life",  artiste: "Sade", spotify: "" },
    { fichier: "assets/music/Stardust - Music Sounds Better With You (Official Music Video).mp3", titre: "Music Sounds Better With You", artiste: "Stardust", spotify: "" }
  ],

  lettre: {
    titre: "Pour nos 1 an ensemble",
    paragraphes: [
      "Mon bébé que j’aime tant, ça fait maintenant un an que nous nous connaissons. Notre rencontre était inattendue… mais maintenant je ne peux plus me passer de toi, je sais pas j’aurai fais quoi dans ma vie amoureuse si je n'étais pas tombée sur toi. Tu m’as aidé à fermer mes blessures comme tu pouvais, et bien vrai qu’on ai eu des moments de turbulence entre nous, je n’ai jamais voulu te quitter une seule fois, parce que c’est toi que j’ai choisi. J’aurais vraiment été dévasté si tu m’avais abandonné… Bref c’est du passé tout ça et j’espère vraiment qu’on pourra rester ensemble pour toujours, comme on se l’était promis au début. Merci de bien vouloir de moi dans ta vie, je n’ai réellement que toi. J’espère que je te fais pas pitié ou quoi que ce soit, parce que ce n’est vraiment pas mon intention et desolée de t’écrire encore une lettre, je me débrouille comme je peux pour te faire des surprises🥲. Merci encore une fois d’être mon petit ami et bientôt de bien vouloir être mon mari, je t’aime❤️."
    ],
    signature: "Ta Vivi"
  },

  // Frise « Notre histoire » (supprime les lignes pour la cacher)
  histoire: [
    { date: "25 octobre 2025", titre: "Notre rencontre", texte: "Le jour où tout a commencé." },
    { date: "Un soir random", titre: "Notre premier appel", texte: "On a joué et discuté jusqu'au lever du soleil." },
    { date: "Bientôt", titre: "Enfin ensemble", texte: "Plus de distance, plus d'écran." }
  ],

  // Galerie : dépose les fichiers dans assets/photos/ et assets/videos/
  photos: [
    { src: "assets/photos/photo1.JPG", legende:"On était mignons ici" },
    { src: "assets/photos/photo2.JPG", legende: "Ce jour-là" },
    { src: "assets/photos/photo3.JPG", legende: "Deux tchaipos" }
  ],
  videos: [
    { src: "assets/videos/video1.MP4", legende: "Notre souvenir en vidéo" },
    { src: "assets/videos/video2.mp4", legende: "Un moment ensemble" },
    { src: "assets/videos/video3.mp4", legende: "Encore un beau souvenir" }
  ]
};
