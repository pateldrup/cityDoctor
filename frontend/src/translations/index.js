import en from './en';
import hi from './hi';
import es from './es';

const translations = { EN: en, HI: hi, ES: es };

export const useTranslation = (lang = 'EN') => {
  return { t: translations[lang] || translations.EN };
};
