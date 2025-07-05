import { computed } from 'vue';
import { i18n } from './index';

export const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
] as const;

type AvailableLocale = typeof availableLocales[number];

export function useI18nManager() {
  const { t, locale } = i18n.global;

  const currentLocale = computed({
    get(): AvailableLocale {
      return availableLocales.find(l => l.code === locale.value) || availableLocales[0];
    },
    set(newLocale: AvailableLocale) {
      locale.value = newLocale.code;
    }
  });

  const localeOptions = computed(() => {
    return availableLocales.map(l => ({ label: l.name, value: l }));
  });

  return {
    t,
    currentLocale,
    localeOptions
  };
}