// Central configuration for the gym website
// All configurable values are defined here for easy maintenance

export const gymConfig = {
  name: "Samurai",
  tagline: "L'excellence du sport tunisien",
  siteUrl: "https://Samurai.vercel.app",

  // Contact
  phone: "+216 XX XX XX XX",
  whatsapp: "+216 XX XX XX XX",
  email: "contact@samurai.tn",
  address: "Tunis, Tunisie",

  // Social Media
  social: {
    facebook: "https://facebook.com/Samurai",
    instagram: "https://instagram.com/Samurai",
    youtube: "https://youtube.com/Samurai",
    tiktok: "https://tiktok.com/@Samurai",
    linkedin: "https://linkedin.com/company/Samurai",
  },

  // Brand — RED & WHITE
  accentColor: "#E11D2E",
  accentColorLight: "#FF3B4E",
  accentColorDark: "#B01020",

  // Hero
  heroVideo: "/videos/gym-hero.mp4",
  heroPoster: "/images/gym-hero-poster.jpg",

  // Opening Hours
  hours: {
    weekday: "07:00 – 22:00",
    saturday: "07:00 – 18:00",
    sunday: "08:00 – 14:00",
  },

  // WhatsApp default messages
  whatsappMessages: {
    default: "Bonjour, je souhaite avoir plus d'informations sur Samurai.",
    trial: "Bonjour, je souhaite réserver une séance d'essai à Samurai.",
    pricing:
      "Bonjour, je souhaite avoir plus d'informations sur les abonnements.",
  },
};

export default gymConfig;
