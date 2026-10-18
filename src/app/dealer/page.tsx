import type { Metadata } from 'next';
import DealerSection from '@/components/DealerSection';

export const metadata: Metadata = {
  title: 'Become an Authorized Dealer | Miah Gee Distributor Peshawar',
  description:
    'Register your retail pharmacy or wholesale clinic for direct distribution terms, competitive trade margins, and scheduled deliveries.',
};

export default function DealerPage() {
  return (
    <div className="dealer-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Trade Partnerships</span>
          <h1 className="page-title">Authorized Dealer &amp; Retailer Program</h1>
          <p className="page-desc">
            Partner with Miah Gee Distributor for reliable supply lines, high-turnover pharmacy lines, and direct commercial terms across KPK and Pakistan.
          </p>
        </div>
      </div>

      <DealerSection />
    </div>
  );
}
