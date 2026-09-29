import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// French translations
import frTranslation from "./locales/fr/translation.json";
import enTranslation from "./locales/en/translation.json";
// import arTranslation from "./locales/ar/translation.json";

const resources = {
  fr: { translation: frTranslation },
  en: { translation: enTranslation },
  // ar: { translation: arTranslation },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
