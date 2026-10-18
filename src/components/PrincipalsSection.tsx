import Link from 'next/link';
import { MANUFACTURERS } from '@/data/manufacturers';
import { PRODUCTS } from '@/data/products';
import type { ManufacturerId } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function PrincipalsSection() {
  const mfKeys = Object.keys(MANUFACTURERS) as ManufacturerId[];

  const getProductCountByMf = (mfId: ManufacturerId) => {
    return PRODUCTS.filter((p) => p.manufacturer === mfId).length;
  };

  return (
    <section id="principals" className="principals-section section-padded">
      <div className="w">
        <div className="section-header-center">
          <span className="section-eyebrow">Manufacturing Excellence</span>
          <h2 className="section-title">Our Manufacturing Principals &amp; Partners</h2>
          <p className="section-subtitle">
            Miah Gee Distributor markets products produced by recognized pharmaceutical and cosmeceutical manufacturers in Lahore, Karachi, and Multan.
          </p>
        </div>

        <div className="principals-grid">
          {mfKeys.map((key) => {
            const mf = MANUFACTURERS[key];
            const count = getProductCountByMf(key);

            return (
              <div key={key} className="principal-card">
                <div className="principal-card-header">
                  <span className="principal-badge">{mf.badge}</span>
                  <span className="principal-count">{count} {count === 1 ? 'item' : 'items'}</span>
                </div>

                <h3 className="principal-name">{mf.name}</h3>
                <div className="principal-location">
                  <span className="loc-pin">📍</span> {mf.location}
                </div>
                <p className="principal-focus">{mf.focus}</p>

                <div className="principal-card-footer">
                  <Link href={`/products?manufacturer=${key}`} className="principal-link flex-inline-icon">
                    View Products <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="principals-trust-banner">
          <div className="trust-banner-badge">Quality Commitment</div>
          <div className="trust-banner-text">
            All partner facilities adhere to strict cGMP manufacturing standards, registered batch releases, and quality assurance protocols.
          </div>
        </div>
      </div>
    </section>
  );
}
