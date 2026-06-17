# Grassoni & Associates
## Attorneys, Counselors & Notaries — Saint Denis, 1905

Application web de gestion juridique RP pour Red Dead Redemption 2.

---

## 🚀 Déploiement sur GitHub Pages

1. Créez un repository GitHub (ex: `grassoni-associates`)
2. Uploadez tous les fichiers `.html` à la racine
3. Allez dans **Settings → Pages → Source → main branch / root**
4. Votre site sera disponible sur : `https://votre-pseudo.github.io/grassoni-associates/`

---

## 🔐 Système d'authentification Firebase

### Configuration Firebase requise

Dans la console Firebase (`console.firebase.google.com`) :

1. **Authentication → Sign-in method → Email/Password → Activer**
2. **Firestore Database → Créer une base de données** (mode production)
3. **Firestore → Règles** — coller ces règles :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Créer les comptes utilisateurs

Dans **Firebase Console → Authentication → Users → Ajouter un utilisateur** :

| Rôle              | Email exemple                    | Mot de passe |
|-------------------|----------------------------------|--------------|
| Associé Principal | grassoni@cabinet.law             | (votre choix)|
| Associé           | dupont@cabinet.law               | (votre choix)|
| Clerc             | martin@cabinet.law               | (votre choix)|

> Les rôles sont assignés lors de la **première connexion** via le sélecteur sur la page de login.

---

## 🖼 Photos de profil via Postimage

1. Allez sur **postimage.org**
2. Uploadez votre photo
3. Copiez le **lien direct** (Direct Link)
4. Dans le dashboard → "Modifier la Photo" → collez le lien

---

## 📁 Structure des fichiers

```
├── index.html          ← Redirection automatique
├── login.html          ← Page de connexion (1905)
├── dashboard.html      ← Tableau de bord principal
├── clients.html        ← Registre des clients (N° personnalisé)
├── dossiers.html       ← Dossiers judiciaires
├── contrats.html       ← Registre des contrats (2 parties)
├── foncier.html        ← Registre foncier
├── societes.html       ← Registre des sociétés
├── notariat.html       ← Bureau notarial (export PNG)
├── bibliotheque.html   ← Bibliothèque juridique
├── comptabilite.html   ← Livre de comptes
├── calendrier.html     ← Calendrier judiciaire
├── shared.css           ← Styles communs
├── shared.js             ← Config Firebase partagée
└── widgets.js           ← Éditeur riche, sélecteur clients, export PNG
```

---

## ✨ Fonctionnalités avancées

### Numéro de client personnalisé
Chaque client reçoit un identifiant unique choisi librement (ex: `CLI-A.MORGAN-01`) lors de sa création dans **clients.html**. Ce numéro :
- Est vérifié pour son unicité avant l'enregistrement
- Apparaît automatiquement dans tous les registres où le client est sélectionné (Dossiers, Contrats, Foncier, Sociétés, Comptabilité, Calendrier, Notariat)

### Sélecteur de clients (auto-complétion)
Dans les formulaires de Dossiers, Contrats, Foncier, Sociétés, Comptabilité, Calendrier et Notariat, les champs liés à un client (Client Principal, Propriétaire, Dirigeant, Partie A/B…) proposent une liste déroulante alimentée en temps réel par le Registre des Clients. Taper du texte filtre la liste ; cliquer sur un résultat associe automatiquement le N° de client.

### Éditeur de texte riche
Les champs longs (Description, Notes, Clauses, Contenu d'acte, Objet social…) disposent d'une barre d'outils : gras, italique, souligné, listes, citation, alignement. Le contenu est stocké en HTML dans Firestore et s'affiche fidèlement dans les fiches de détail.

### Registre des Contrats (nouveau module)
Permet de rédiger des contrats entre deux parties (personnes physiques ou morales), avec sélection des parties depuis le Registre des Clients, valeur, échéance, clauses en éditeur riche, et export PNG.

### Export PNG dynamique
Dans **Bureau Notarial** et **Registre des Contrats**, chaque fiche de détail propose un bouton "🖼 Exporter en PNG" qui génère une image fidèle au document (acte ou contrat), prête à être partagée ou imprimée, avec mise en page parchemin et zones de signature.

---

*Cabinet Grassoni & Associates — Établi Anno Domini 1889 — Saint Denis, Lemoyne*
