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
├── clients.html        ← Registre des clients
├── dossiers.html       ← Dossiers judiciaires
├── foncier.html        ← Registre foncier
├── societes.html       ← Registre des sociétés
├── notariat.html       ← Bureau notarial
├── bibliotheque.html   ← Bibliothèque juridique
├── comptabilite.html   ← Livre de comptes
└── calendrier.html     ← Calendrier judiciaire
```

---

*Cabinet Grassoni & Associates — Établi Anno Domini 1889 — Saint Denis, Lemoyne*
