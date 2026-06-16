// shared.js — Grassoni & Associates
// Common Firebase init, auth guard, sidebar render

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyB0noV2hEom7l9UDnhf9yq7Xz_q0t8m8DU",
  authDomain:        "grassoni-ec6fd.firebaseapp.com",
  projectId:         "grassoni-ec6fd",
  storageBucket:     "grassoni-ec6fd.firebasestorage.app",
  messagingSenderId: "600909811196",
  appId:             "1:600909811196:web:6031c8d0a0e85205c03679",
  measurementId:     "G-GMM7S0D1YL"
};

const NAV_ITEMS = [
  { href:"dashboard.html",    icon:"📋", label:"Tableau de Bord",        section:"Registres Principaux" },
  { href:"clients.html",      icon:"👤", label:"Registre des Clients",    section:"Registres Principaux" },
  { href:"dossiers.html",     icon:"📁", label:"Dossiers Judiciaires",    section:"Registres Principaux" },
  { href:"foncier.html",      icon:"🏡", label:"Registre Foncier",        section:"Registres Officiels" },
  { href:"societes.html",     icon:"🏢", label:"Registre des Sociétés",   section:"Registres Officiels" },
  { href:"notariat.html",     icon:"✒️", label:"Bureau Notarial",         section:"Registres Officiels" },
  { href:"bibliotheque.html", icon:"📚", label:"Bibliothèque Juridique",  section:"Administration" },
  { href:"comptabilite.html", icon:"💰", label:"Livre de Comptes",        section:"Administration" },
  { href:"calendrier.html",   icon:"📅", label:"Calendrier Judiciaire",   section:"Administration" },
];

window.GRASSONI = { FIREBASE_CONFIG, NAV_ITEMS };
