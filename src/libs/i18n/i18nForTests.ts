/* eslint-disable @typescript-eslint/no-require-imports */
const i18next = require("i18next");
const { initReactI18next } = require("react-i18next");

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["translationsNS"],
  defaultNS: "translationsNS",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {},
    de: {},
  },
});

export default i18next;
