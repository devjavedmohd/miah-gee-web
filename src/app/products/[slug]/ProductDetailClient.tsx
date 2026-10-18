'use client';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { CATEGORIES } from '@/data/categories';
import { COMPANY, getWhatsAppUrl } from '@/data/company';
import { useEnquiry } from '@/components/EnquiryContext';
import ProductCard from '@/components/ProductCard';
import {
  Check,
  Plus,
  MessageCircle,
  Phone,
  AlertTriangle,
  Building2,
  Package,
  ShieldCheck,
  FileText,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: Product;
  dosageInfo: { label: string; iconName: string };
  manufacturer: { name: string; location: string; focus: string; badge: string };
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  dosageInfo,
  manufacturer,
  relatedProducts,
}: Props) {
  const { has, toggleProduct, openDrawer } = useEnquiry();
  const [copied, setCopied] = useState(false);
  const isAdded = has(product.name);

  const productWhatsAppText =
    `*PRODUCT TRADE INQUIRY — MIAH GEE DISTRIBUTOR*\n\n` +
    `*Product:* ${product.name}\n` +
    `*Pack / Presentation:* ${product.pack}\n` +
    `*Category:* ${CATEGORIES[product.category]}\n` +
    `*Manufacturer:* ${manufacturer?.name || product.manufacturer}\n\n` +
    `Please provide wholesale trade rates, minimum order quantity, and current batch expiry for Peshawar delivery.`;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="product-detail-view">
      {/* Top back button row */}
      <div className="detail-top-bar">
        <Link href="/products" className="back-link flex-inline-icon">
          <ArrowLeft size={16} strokeWidth={2} /> Back to Catalogue
        </Link>
        <button
          type="button"
          className="share-btn flex-inline-icon"
          onClick={handleShare}
          title="Share link"
        >
          <Share2 size={15} strokeWidth={2} /> {copied ? 'Link Copied!' : 'Share Product'}
        </button>
      </div>

      <div className="product-detail-grid">
        {/* Left Column: Image and Quick Badges */}
        <div className="product-media-column">
          <div className="product-main-image-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="product-page-main-img"
            />
          </div>

          <div className="product-meta-specs-card">
            <h4 className="meta-card-title flex-inline-icon">
              <FileText size={16} strokeWidth={2} /> Specification Summary
            </h4>
            <div className="spec-table">
              <div className="spec-item">
                <span className="spec-name">Dosage Form:</span>
                <span className="spec-value">{dosageInfo.label}</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Packaging Presentation:</span>
                <span className="spec-value">{product.pack}</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Category:</span>
                <span className="spec-value">{CATEGORIES[product.category]}</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Manufacturing Partner:</span>
                <span className="spec-value">{manufacturer?.name}</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Manufacturing Facility:</span>
                <span className="spec-value">{manufacturer?.location}</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Central Distributor:</span>
                <span className="spec-value">{COMPANY.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Actions, Indications, Usage */}
        <div className="product-info-column">
          <div className="product-badges-row">
            <span className="badge-category">{CATEGORIES[product.category]}</span>
            {product.rx ? (
              <span className="badge-rx">Restricted Rx Trade Item</span>
            ) : (
              <span className="badge-dosage">{dosageInfo.label}</span>
            )}
            <span className="badge-manufacturer">{manufacturer?.badge}</span>
          </div>

          <h1 className="product-main-title">{product.name}</h1>
          <div className="product-pack-subtitle flex-inline-icon">
            <Package size={16} strokeWidth={2} /> {product.pack}
          </div>

          {/* Rx Warning Notice */}
          {product.rx && (
            <div className="rx-alert-box">
              <div className="rx-alert-header flex-inline-icon">
                <AlertTriangle size={18} strokeWidth={2.4} /> Healthcare Professional Trade Notice
              </div>
              <p>
                This prescription pharmaceutical manufactured by Rasco Pharma is listed strictly for registered hospital
                pharmacies, medical clinics, and licensed retail dealers. Not intended for consumer self-medication or direct public purchase.
              </p>
            </div>
          )}

          {product.tagline && (
            <p className="product-tagline-text">{product.tagline}</p>
          )}

          {/* Actions Bar */}
          <div className="product-primary-actions">
            <button
              type="button"
              className={`btn btn-lg ${isAdded ? 'btn-added' : 'btn-primary'}`}
              onClick={() => {
                toggleProduct(product);
                if (!isAdded) openDrawer();
              }}
            >
              {isAdded ? (
                <span className="flex-inline-icon">
                  <Check size={18} strokeWidth={2.4} /> In Enquiry List (Tap to View)
                </span>
              ) : (
                <span className="flex-inline-icon">
                  <Plus size={18} strokeWidth={2.4} /> Add to Trade Enquiry List
                </span>
              )}
            </button>

            <a
              href={getWhatsAppUrl(productWhatsAppText)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-lg flex-inline-icon"
            >
              <MessageCircle size={18} strokeWidth={2} /> WhatsApp Inquiry
            </a>

            <a href={COMPANY.phoneHref} className="btn btn-outline btn-lg flex-inline-icon">
              <Phone size={16} strokeWidth={2} /> Call Sales Desk
            </a>
          </div>

          {/* Product Details Blocks */}
          {!product.rx && (
            <div className="product-clinical-blocks">
              {product.indications && product.indications.length > 0 && (
                <div className="detail-section-block">
                  <h3 className="block-title flex-inline-icon">
                    <ShieldCheck size={18} strokeWidth={2} /> Clinical &amp; Wellness Indications
                  </h3>
                  <ul className="block-bullet-list">
                    {product.indications.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.usage && (
                <div className="detail-section-block">
                  <h3 className="block-title flex-inline-icon">
                    <FileText size={18} strokeWidth={2} /> Recommended Administration &amp; Usage
                  </h3>
                  <p className="block-body-text">{product.usage}</p>
                </div>
              )}

              {product.benefits && product.benefits.length > 0 && (
                <div className="detail-section-block">
                  <h3 className="block-title flex-inline-icon text-success">
                    <Check size={18} strokeWidth={2.4} /> Key Product Benefits
                  </h3>
                  <ul className="block-bullet-list benefits">
                    {product.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Principal Credential Box */}
          <div className="principal-credential-card">
            <div className="cred-icon"><Building2 size={24} strokeWidth={1.8} /></div>
            <div className="cred-text">
              <b>Marketed By {COMPANY.name}</b>
              <p>
                Manufactured by <b>{manufacturer?.name}</b> ({manufacturer?.location}).
                Distributed from central Peshawar wholesale depot near Ibadat Hospital, Nishtarabad Road.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">Complementary Inventory</span>
              <h2 className="section-title">Related Trade Products</h2>
            </div>
            <Link href="/products" className="btn btn-outline flex-inline-icon">
              View Full Catalogue →
            </Link>
          </div>

          <div className="catalogue-grid">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
