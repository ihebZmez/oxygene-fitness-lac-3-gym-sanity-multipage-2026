// constants/index.js
const navLinks = [
  { id: "espaces", title: "Nos espaces" },
  { id: "activites", title: "Activités" },
  { id: "tarifs", title: "Tarifs" },
  { id: "planning", title: "Planning" },
  { id: "contact", title: "Contact" },
];

// Gym Equipment & Activities
const gymEquipment = [
  {
    name: "Cardio",
    country: "Technogym",
    detail: "Un espace dédié incontournable pour une bonne préparation.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
  {
    name: "Force",
    country: "Technogym",
    detail: "Parmi les salles les mieux équipées au monde.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
  {
    name: "Étirements",
    country: "Guidé",
    detail: "Optimisez le capital performance acquis lors de votre séance.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
  {
    name: "TRX",
    country: "Collectif",
    detail: "Un esprit collectif pour partager un bon moment.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
];

// Junior Activities & Special Programs
const juniorActivities = [
  {
    name: "Cours Collectifs",
    country: "Reebok Les Mills",
    detail: "Zumba, Salsa, Danse orientale et contemporaine.",
    price: "Sur mesure",
    skill: "Tous âges",
  },
  {
    name: "Gymnastique Loisirs-Santé",
    country: "Encadré",
    detail:
      "Programme spécifique pour la tonicité musculaire et l'amincissement.",
    price: "Sur mesure",
    skill: "Débutant",
  },
  {
    name: "Programme Enfants & Ados",
    country: "Encadré",
    detail: "Cours adaptés pour les plus jeunes.",
    price: "Sur mesure",
    skill: "Enfants/Ados",
  },
  {
    name: "Coaching Personnalisé",
    country: "Premium",
    detail:
      "Un coach élabore avec vous un programme sur mesure selon vos objectifs.",
    price: "Sur mesure",
    skill: "Avancé",
  },
];

// Coach Profiles
const coachProfiles = [
  {
    imgPath: "/images/coach1.png",
    name: "Nour Ben Amor",
    role: "Coach Cardio & Force",
  },
  {
    imgPath: "/images/coach2.png",
    name: "Yassine Trabelsi",
    role: "Coach TRX & Étirements",
  },
  {
    imgPath: "/images/coach3.png",
    name: "Meriem Gharbi",
    role: "Coach Cours Collectifs",
  },
  {
    imgPath: "/images/coach4.png",
    name: "Ahmed Mansour",
    role: "Préparateur Physique",
  },
];

// Gym Features
const gymFeatures = [
  "Équipements Technogym dernière génération",
  "Espace Indoor et Out-door de 2500m²",
  "Coachs impliqués et à l'écoute",
  "Cours professionnels agrées Reebok Les Mills",
];

// Gym Benefits
const gymBenefits = [
  "Un suivi personnalisé pour vos objectifs",
  "Des coachs certifiés et disponibles",
  "Une énergie collective motivante",
  "Des résultats mesurables semaine après semaine",
];

// Club Info
const clubInfo = {
  heading: "Visitez Samurai Nouvelle Madina et découvrez nos espaces",
  address: "Samurai Nouvelle Madina, Tunis, Tunisie",
  contact: {
    phone: "(+216) 53 85 31 55",
    email: "contact@samurainodevillamadina.tn",
  },
};

// Club Hours (Updated to match Samurai Nouvelle Madina)
const clubHours = [
  { day: "Lun–Ven", time: "07:00 – 22:00" },
  { day: "Samedi", time: "07:00 – 18:00" },
  { day: "Dimanche", time: "08:00 – 14:00" },
];

// Social Media
const socials = [
  {
    name: "Instagram",
    icon: "/images/insta.png",
    url: "https://instagram.com/samurainodevillamadina",
  },
  {
    name: "Facebook",
    icon: "/images/fb.png",
    url: "https://facebook.com/samurainodevillamadina",
  },
];

// Featured Equipment (Gym Activities)
const featuredEquipment = [
  {
    id: 1,
    name: "Cardio",
    image: "/images/equipment1.png",
    title: "Préparez-vous",
    description:
      "Un espace dédié incontournable pour une bonne préparation cardiovasculaire.",
    skill: "Tous niveaux",
    carbon: "Endurance",
    shape: "Performance",
    weight: "Technogym",
  },
  {
    id: 2,
    name: "Force",
    image: "/images/equipment2.png",
    title: "Repoussez vos limites",
    description:
      "Samurai Nouvelle Madina compte parmi les salles les mieux équipées au monde pour la force.",
    skill: "Tous niveaux",
    carbon: "Puissance",
    shape: "Intensité",
    weight: "Technogym",
  },
  {
    id: 3,
    name: "TRX",
    image: "/images/equipment3.png",
    title: "Défiez votre équilibre",
    description:
      "Un esprit collectif pour partager un bon moment et renforcer votre corps.",
    skill: "Intermédiaire",
    carbon: "Stabilité",
    shape: "Fonctionnel",
    weight: "Collectif",
  },
  {
    id: 4,
    name: "Étirements",
    image: "/images/equipment4.png",
    title: "Récupérez et progressez",
    description:
      "Optimisez le 'capital performance' acquis lors de votre séance.",
    skill: "Tous niveaux",
    carbon: "Souplesse",
    shape: "Récupération",
    weight: "Guidé",
  },
];

export {
  navLinks,
  gymEquipment,
  juniorActivities,
  coachProfiles,
  gymFeatures,
  gymBenefits,
  clubHours,
  clubInfo,
  socials,
  featuredEquipment,
};
