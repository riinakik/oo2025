import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: {
      "nav": {
        "brand-name": "Webshop",
        "cart": "To cart",
        "arrays": "Arrays view",
        "orders": "Your orders",
        "map": "Our shops"
      },
      "home": {
        "all-categories": "All categories"
      }
    }
  },
  et: {
    translation: {
      "nav": {
        "brand-name": "Veebipood",
        "cart": "Ostukorv",
        "arrays": "Tsüklite vaade",
        "orders": "Sinu tellimused",
        "map": "Meie poed"
      },
      "home": {
        "all-categories": "Kõik kategooriad"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default keel
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
