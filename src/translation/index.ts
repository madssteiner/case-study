import i18n from 'i18next';
import { useCallback } from 'react';
import { initReactI18next, useTranslation as useTranslationI18next } from 'react-i18next';
import dk from './languages/dk.json';
import en from './languages/en.json';

export type Locale = 'dk' | 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    dk: {
      translation: dk,
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export type TranslationKey = keyof typeof en;

export type UseTranslationHook = {
  translateDynamic: (key: string) => string;
  translate: (key: TranslationKey) => string;
  changeLanguage: (language: Locale) => void;
};

export const Languages: Record<Locale, TranslationKey> = {
  dk: 'LANGUAGE_DK',
  en: 'LANGUAGE_EN',
};

export const useTranslation = () => {
  const { t } = useTranslationI18next();

  const translateDynamic = useCallback(
    (key: string) => {
      const translated = t(key);

      return translated;
    },
    [t],
  );

  const translate = useCallback(
    (key: TranslationKey) => {
      const translated = t(key);
      return translated;
    },
    [t],
  );

  const changeLanguage = useCallback((language: Locale) => {
    i18n.changeLanguage(language);
  }, []);

  return { translateDynamic, translate, changeLanguage } as const;
};
