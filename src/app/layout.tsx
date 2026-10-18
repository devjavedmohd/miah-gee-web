import type { Metadata, Viewport } from 'next';
import './globals.css';
import { COMPANY } from '@/data/company';
import { EnquiryProvider } from '@/components/EnquiryContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallButton from '@/components/CallButton';
import EnquiryDrawer from '@/components/EnquiryDrawer';

export const metadata: Metadata = {
  metadataBase: new URL('https://miahgee.com'),
  title: 'Miah Gee Distributor (Pvt) Ltd. | Healthcare & Pharmaceutical Distribution Peshawar',
  description:
    'Peshawar-based distributor of high-quality nutraceuticals, vitamins, personal care, dermocosmetics, and Rasco Pharma Rx products. Serving pharmacies, hospitals, and clinics across Pakistan.',
  keywords: [
    'Miah Gee Distributor',
    'Pharmaceutical Distributor Peshawar',
    'Healthcare Distribution Pakistan',
    'Wholesale Medicine Peshawar',
    'Medikeen Pharma Peshawar',
    'Laven Rose Cosmeceuticals',
    'Rasco Pharma distributor',
    'Nishtarabad Road Peshawar Pharmacy',
    'Nutraceuticals Supplier KPK',
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    title: 'Miah Gee Distributor (Pvt) Ltd. | Healthcare & Pharmaceutical Distribution',
    description:
      'Browse our 120+ product catalogue. Sourced directly from premier manufacturing partners in Lahore, Karachi, and Multan. Dedicated trade supply across KP & Pakistan.',
    type: 'website',
    locale: 'en_PK',
    siteName: COMPANY.name,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#990011',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: COMPANY.name,
  alternateName: COMPANY.short,
  description:
    'Wholesale distributor of pharmaceutical, nutraceutical, and skincare products based in Peshawar, Pakistan.',
  telephone: COMPANY.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mohallah Islamabad, Near Ibadat Hospital, Nishtarabad Road',
    addressLocality: 'Peshawar',
    addressRegion: 'Khyber Pakhtunkhwa',
    addressCountry: 'PK',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:30',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <EnquiryProvider>
          <Header />
          <EnquiryDrawer />
          <main id="top">{children}</main>
          <Footer />
          <CallButton />
        </EnquiryProvider>
      </body>
    </html>
  );
}
