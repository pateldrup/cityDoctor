export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const getLanguageLabel = (code) => {
  const languages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    zh: 'Chinese',
  };
  return languages[code] || code;
};

export const SPECIALTIES = [
  'General Practitioner',
  'Pediatrician',
  'Cardiologist',
  'Dermatologist',
  'Gastroenterologist',
  'Orthopedic Surgeon',
  'Gynecologist',
  'Ophthalmologist',
  'Psychiatrist',
  'Dentist'
];

export const CITIES = [
  'Paris',
  'Tokyo',
  'New York',
  'London',
  'Rome',
  'Barcelona',
  'Amsterdam',
  'Dubai'
];
