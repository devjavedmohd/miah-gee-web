import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import EnquirySection from '@/components/EnquirySection';

export const metadata: Metadata = {
  title: 'Contact Us | Miah Gee Distributor (Pvt) Ltd. Peshawar',
  description:
    'Visit our headquarters near Ibadat Hospital, Nishtarabad Road, Peshawar. Direct trade telephone 091-3097792 and WhatsApp desk.',
};

export default function ContactPage() {
  return (
    <div className="contact-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Trade Desk &amp; Warehouse</span>
          <h1 className="page-title">Contact &amp; Headquarters</h1>
          <p className="page-desc">
            Connect with our Peshawar dispatch team for urgent stock availability, quotation requests, and wholesale orders.
          </p>
        </div>
      </div>

      <ContactSection />
      <EnquirySection />
    </div>
  );
}
