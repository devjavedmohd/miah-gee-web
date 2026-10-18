export const COMPANY = {
  name: 'Miah Gee Distributor (Pvt) Ltd.',
  short: 'MIAH GEE',
  tagline: 'Healthcare & Pharmaceutical Distribution Across Pakistan',
  phone: '091-3097792',
  phoneHref: 'tel:0913097792',
  whatsappNumber: '923097792000',
  whatsappFormatted: '+92 309 7792000',
  email: 'trade@miahgee.com',
  address: [
    'Mohallah Islamabad, Near Ibadat Hospital,',
    'Nishtarabad Road, Peshawar, Khyber Pakhtunkhwa, Pakistan',
  ],
  workingHours: 'Monday – Saturday: 9:00 AM – 7:30 PM',
  coverageAreas: [
    'Peshawar & Nowshera',
    'Mardan & Swabi',
    'Swat, Malakand & Dir',
    'Kohat, Bannu & D.I. Khan',
    'Abbottabad & Hazara Region',
    'Rawalpindi & Islamabad Trade Hubs',
    'Punjab & Sindh Supply Lines',
  ],
};

export const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/principals', label: 'Principals' },
  { href: '/trade-rx', label: 'Trade (Rx)' },
  { href: '/about', label: 'About Us' },
  { href: '/dealer', label: 'Become a Dealer' },
  { href: '/contact', label: 'Contact' },
];

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
