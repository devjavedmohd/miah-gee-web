import type { Metadata } from 'next';
import EnquirySection from '@/components/EnquirySection';

export const metadata: Metadata = {
  title: 'Trade Enquiry & Quotation | Miah Gee Distributor Peshawar',
  description:
    'Review your selected products and submit a quotation request for price lists, minimum order quantities, and delivery schedules.',
};

export default function EnquiryPage() {
  return (
    <div className="enquiry-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Trade Desk</span>
          <h1 className="page-title">Submit Trade Enquiry &amp; Quotation</h1>
          <p className="page-desc">
            Review your selected inventory items, specify desired order volumes, and send directly to our commercial representatives in Peshawar.
          </p>
        </div>
      </div>

      <EnquirySection />
    </div>
  );
}
