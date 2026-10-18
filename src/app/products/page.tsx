import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsSection from '@/components/ProductsSection';

export const metadata: Metadata = {
  title: 'Full Products Catalogue | Miah Gee Distributor (Pvt) Ltd. Peshawar',
  description:
    'Search and filter all 129 pharmaceutical, nutraceutical, and cosmeceutical products. Pack sizes, dosage forms, and trade availability.',
};

export default function ProductsPage() {
  return (
    <div className="catalogue-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Inventory &amp; Formulations</span>
          <h1 className="page-title">Trade Product Catalogue</h1>
          <p className="page-desc">
            Explore 129 registered formulations across 9 therapeutic categories. Filter by principal manufacturer or dosage form, and add items directly to your trade enquiry list.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="w section-padded text-center">Loading catalogue...</div>}>
        <ProductsSection />
      </Suspense>
    </div>
  );
}
