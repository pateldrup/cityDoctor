export const formatFee = (amount, currency = 'INR') => {
  const symbol = currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$';
  return `${symbol}${amount}`;
};

export const formatDate = (dateStr) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
};

export const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const getRatingStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));
};

export const AVAILABILITY_MOCK = [
  { day: 'TODAY', date: 14, status: '4 SLOTS', type: 'active' },
  { day: 'WED', date: 15, status: '2 SLOTS', type: 'teal' },
  { day: 'THU', date: 16, status: 'FULL', type: 'full' }
];
