import i18next from "i18next";
import { initReactI18next } from 'react-i18next'
import localeJson from '@locales/index'

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: localeJson.en
      },
      zh: {
        translation: localeJson.zh
      }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  })

export default i18next
