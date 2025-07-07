import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import ru from './locales/ru.json';

export type MessageSchema = typeof en;

export type AvailableLocales = 'en' | 'ru';

const i18nOptions = {
  legacy: false,
  locale: 'en' as AvailableLocales,
  fallbackLocale: 'en' as AvailableLocales,
  messages: {
    en,
    ru
  }
};

export const i18n = createI18n<[MessageSchema], AvailableLocales>(i18nOptions);