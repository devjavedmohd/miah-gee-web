'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ShieldAlert, Lock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function TradeRxPage() {
  const [accepted, setAccepted] = useState(false);
  const rxProducts = PRODUCTS.filter((p) => p.rx);

  return (
    <div className="trade-rx-page-wrapper">
      <div className="page-hero-banner banner-rx">
        <div className="w">
          <div className="flex-inline-icon mb-2">
            <span className="badge-pill bg-danger"><Lock size={12} strokeWidth={2} /> Trade Only</span>
          </div>
          <h1 className="page-title">Hospital &amp; Trade Prescription (Rx) Range</h1>
          <p className="page-desc">
            Manufactured by Rasco Pharma (Raiwind Road, Lahore) and distributed exclusively to licensed retail pharmacies, clinics, and tertiary healthcare hospitals.
          </p>
        </div>
      </div>

      <div className="w section-padded">
        {/* Verification Card */}
        {!accepted ? (
          <div className="rx-gate-container-card">
            <div className="rx-gate-icon-large">
              <ShieldAlert size={48} strokeWidth={1.8} className="text-danger" />
            </div>
            <h2>Healthcare Professional &amp; Licensed Pharmacy Verification</h2>
            <p className="rx-gate-legal-text">
              Under Drug Regulatory Authority of Pakistan (DRAP) regulations, prescription pharmaceuticals cannot be advertised, promoted, or sold directly to consumers for self-medication. This digital trade section is strictly intended for registered doctors, hospital procurement officers, and licensed pharmacy proprietors.
            </p>

            <div className="rx-guidelines-box">
              <div className="guideline-row flex-inline-icon">
                <CheckCircle2 size={16} strokeWidth={2.2} className="text-primary" />
                <span>Valid Drug Sale License (DSL) required for order fulfillment</span>
              </div>
              <div className="guideline-row flex-inline-icon">
                <CheckCircle2 size={16} strokeWidth={2.2} className="text-primary" />
                <span>Hospital supplies issued against institutional purchase orders</span>
              </div>
              <div className="guideline-row flex-inline-icon">
                <CheckCircle2 size={16} strokeWidth={2.2} className="text-primary" />
                <span>Cold-chain and temperature-controlled storage maintained at our Peshawar depot</span>
              </div>
            </div>

            <div className="gate-actions-row">
              <button
                type="button"
                className="btn btn-primary btn-lg flex-inline-icon"
                onClick={() => setAccepted(true)}
              >
                I Confirm I Am A Registered Healthcare Professional / Pharmacy Buyer
              </button>
              <Link href="/products" className="btn btn-outline btn-lg">
                Return to Wellness Products
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="rx-unlocked-banner mb-4">
              <div className="flex-inline-icon">
                <CheckCircle2 size={18} strokeWidth={2.2} className="text-success" />
                <span>
                  <b>Verified Professional View:</b> Displaying all {rxProducts.length} Rasco Pharma prescription formulations.
                </span>
              </div>
            </div>

            <div className="catalogue-grid">
              {rxProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
