import type { Metadata } from 'next';
import Link from 'next/link';
import { MANUFACTURERS } from '@/data/manufacturers';
import { PRODUCTS } from '@/data/products';
import type { ManufacturerId } from '@/lib/types';
import { Building2, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manufacturing Principals & Partners | Miah Gee Distributor Peshawar',
  description:
    'Our licensed manufacturing partners in Lahore, Karachi, and Multan. Medikeen Pharma, Rasco Pharma, Laven Rose, and more.',
};

export default function PrincipalsPage() {
  const mfKeys = Object.keys(MANUFACTURERS) as ManufacturerId[];

  const getProductCount = (mfId: ManufacturerId) => {
    return PRODUCTS.filter((p) => p.manufacturer === mfId).length;
  };

  return (
    <div className="principals-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Manufacturing Partners</span>
          <h1 className="page-title">Our Manufacturing Principals</h1>
          <p className="page-desc">
            Miah Gee Distributor markets products manufactured by reputable pharmaceutical and cosmeceutical companies across Lahore, Karachi, and Multan. All partner facilities operate under approved cGMP guidelines.
          </p>
        </div>
      </div>

      <div className="w section-padded">
        <div className="principals-grid">
          {mfKeys.map((key) => {
            const mf = MANUFACTURERS[key];
            const count = getProductCount(key);

            return (
              <div key={key} className="principal-card">
                <div className="principal-card-header">
                  <span className="principal-badge">{mf.badge}</span>
                  <span className="principal-count">{count} {count === 1 ? 'item' : 'items'}</span>
                </div>

                <h2 className="principal-name">{mf.name}</h2>
                <div className="principal-location flex-inline-icon">
                  <MapPin size={14} strokeWidth={2} className="loc-pin" /> {mf.location}
                </div>
                <p className="principal-focus">{mf.focus}</p>

                <div className="principal-card-footer">
                  <Link href={`/products?manufacturer=${key}`} className="principal-link flex-inline-icon">
                    View Formulations <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="principals-trust-banner mt-4">
          <div className="trust-banner-badge flex-inline-icon">
            <CheckCircle2 size={16} strokeWidth={2.4} /> cGMP Standard
          </div>
          <div className="trust-banner-text">
            Every batch distributed by Miah Gee is manufactured under verified current Good Manufacturing Practices (cGMP), with strict quality control testing, stability evaluations, and tamper-evident packaging.
          </div>
        </div>
      </div>
    </div>
  );
}
