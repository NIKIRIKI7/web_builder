import { type ComputedRef, computed } from 'vue';
import { useI18n, type Composer } from 'vue-i18n';

import type { AvailableLocales, MessageSchema } from './index';

export const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' }
] as const;

type AvailableLocale = (typeof availableLocales)[number];
type LocaleOption = { label: string; value: AvailableLocale };

interface UseI18nManagerReturn {
  t: Composer<[MessageSchema], object, object, AvailableLocales>['t'];
  currentLocale: ComputedRef<AvailableLocale>;
  localeOptions: ComputedRef<LocaleOption[]>;
}

export function useI18nManager(): UseI18nManagerReturn {
  const { t, locale } = useI18n();

  const currentLocale = computed({
    get(): AvailableLocale {
      return availableLocales.find((l) => l.code === locale.value) || availableLocales[0];
    },
    set(newLocale: AvailableLocale): void {
      locale.value = newLocale.code;
    }
  });

  const localeOptions = computed((): LocaleOption[] => {
    return availableLocales.map((l) => ({ label: l.name, value: l }));
  });

  return {
    t,
    currentLocale,
    localeOptions
  };
}