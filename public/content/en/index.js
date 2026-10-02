// ============================================================
// Navigation
// Static structure only.
// Client-specific visibility can still be controlled elsewhere.
// ============================================================

const navLinks = [
  { id: "espaces", title: "Nos espaces" },
  { id: "activites", title: "Activités" },
  { id: "tarifs", title: "Tarifs" },
  { id: "planning", title: "Planning" },
  { id: "contact", title: "Contact" },
];

// ============================================================
// Gym Equipment
// Generic fallback content.
// Prefer Sanity data when available.
// ============================================================

const gymEquipment = [
  {
    name: "Cardio",
    country: "Équipement cardio",
    detail:
      "Un espace dédié à l'entraînement cardiovasculaire et à l'amélioration de votre endurance.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
  {
    name: "Musculation",
    country: "Espace musculation",
    detail:
      "Un espace adapté au développement de la force, de la tonicité et de la condition physique.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
  {
    name: "Fonctionnel",
    country: "Entraînement fonctionnel",
    detail:
      "Des exercices variés pour améliorer mobilité, force, équilibre et performance.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
  {
    name: "Étirements",
    country: "Récupération",
    detail:
      "Un espace pour favoriser la mobilité, la récupération et le bien-être après l'entraînement.",
    price: "Inclus",
    skill: "Tous niveaux",
  },
];

// ============================================================
// Junior Activities & Special Programs
// Generic fallback content.
// ============================================================

const juniorActivities = [
  {
    name: "Cours Collectifs",
    country: "Encadré",
    detail:
      "Des séances collectives variées pour bouger, progresser et partager une expérience sportive.",
    price: "Sur mesure",
    skill: "Tous niveaux",
  },
  {
    name: "Kids & Junior",
    country: "Encadré",
    detail:
      "Des activités adaptées aux enfants et aux adolescents dans un environnement sportif.",
    price: "Sur mesure",
    skill: "Enfants / Ados",
  },
  {
    name: "Coaching Personnalisé",
    country: "Accompagnement",
    detail: "Un accompagnement adapté à vos objectifs et à votre niveau.",
    price: "Sur mesure",
    skill: "Tous niveaux",
  },
];

// ============================================================
// Coach Profiles
// Empty by default.
// Populate from Sanity or replace only with verified client data.
// ============================================================

const coachProfiles = [];

// ============================================================
// Gym Features
// Generic fallback content.
// Avoid unsupported claims about equipment, size or certifications.
// ============================================================

const gymFeatures = [
  "Large choix d'activités sportives",
  "Cours collectifs variés",
  "Accompagnement sportif",
  "Espace adapté à différents objectifs",
];

// ============================================================
// Gym Benefits
// Generic marketing benefits.
// ============================================================

const gymBenefits = [
  "Un accompagnement adapté à vos objectifs",
  "Une variété d'activités sportives",
  "Une énergie collective motivante",
  "Un environnement pensé pour votre progression",
];

// ============================================================
// Club Information
// Static fallback.
// If siteSettings in Sanity provides these values, prefer Sanity.
// ============================================================

const clubInfo = {
  heading: "Visitez Oxygene Fitness Lac 3 et découvrez nos espaces",
  address: "Zone industrielle Khaireddine Lac III, 2089, Tunis, Tunisie",
  contact: {
    phone: "+216 71 727 189",
    email: "",
  },
};

// ============================================================
// Club Hours
// Static fallback based on the current business information.
// Prefer Sanity siteSettings when available.
// ============================================================

const clubHours = [
  { day: "Lundi", time: "06:30 – 22:00" },
  { day: "Mardi", time: "06:30 – 22:00" },
  { day: "Mercredi", time: "06:30 – 22:00" },
  { day: "Jeudi", time: "06:30 – 22:00" },
  { day: "Vendredi", time: "06:30 – 22:00" },
  { day: "Samedi", time: "07:00 – 18:00" },
  { day: "Dimanche", time: "07:00 – 15:00" },
];

// ============================================================
// Social Media
// Static fallback.
// Prefer Sanity siteSettings when available.
// ============================================================

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/oxy.fit.lac3",
    icon: "instagram",
  },
];

// ============================================================
// Featured Equipment / Spaces
// Generic fallback content.
// Replace with Sanity content when available.
// ============================================================

const featuredEquipment = [
  {
    id: 1,
    name: "Cardio",
    image: "/images/equipment1.png",
    title: "Bougez et améliorez votre endurance",
    description:
      "Un espace dédié à l'entraînement cardiovasculaire et à l'amélioration de votre condition physique.",
    skill: "Tous niveaux",
    carbon: "Endurance",
    shape: "Cardio",
    weight: "Entraînement",
  },
  {
    id: 2,
    name: "Musculation",
    image: "/images/equipment2.png",
    title: "Développez votre force",
    description:
      "Un espace consacré au renforcement musculaire et à la progression selon vos objectifs.",
    skill: "Tous niveaux",
    carbon: "Force",
    shape: "Musculation",
    weight: "Performance",
  },
  {
    id: 3,
    name: "Fonctionnel",
    image: "/images/equipment3.png",
    title: "Améliorez votre mobilité",
    description:
      "Des exercices fonctionnels pour travailler la mobilité, la stabilité, la coordination et la condition physique.",
    skill: "Tous niveaux",
    carbon: "Mobilité",
    shape: "Fonctionnel",
    weight: "Performance",
  },
  {
    id: 4,
    name: "Récupération",
    image: "/images/equipment4.png",
    title: "Récupérez et progressez",
    description:
      "Prenez soin de votre mobilité et favorisez votre récupération après vos séances.",
    skill: "Tous niveaux",
    carbon: "Souplesse",
    shape: "Récupération",
    weight: "Bien-être",
  },
];

// ============================================================
// Export
// ============================================================

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
