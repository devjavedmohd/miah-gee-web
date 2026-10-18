'use client';
import { useEffect } from 'react';
import type { Product } from '@/lib/types';
import { CATEGORIES } from '@/data/categories';
import { MANUFACTURERS } from '@/data/manufacturers';
import { DOSAGE_FORMS, inferDosageForm } from '@/data/dosageForms';
import { COMPANY, getWhatsAppUrl } from '@/data/company';
import { PRODUCTS } from '@/data/products';
import { useEnquiry } from './EnquiryContext';
import { X, Check, Plus, MessageCircle, Phone, AlertTriangle } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onSelectProduct }: ProductModalProps) {
  const { has, toggleProduct, openDrawer } = useEnquiry();

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;
  const p = product;
  const isAdded = has(p.name);
  const dosageKey = inferDosageForm(p);
  const dosageInfo = DOSAGE_FORMS[dosageKey];

  const relatedProducts = PRODUCTS.filter(
    (item) => item.id !== p.id && (item.category === p.category || item.manufacturer === p.manufacturer)
  ).slice(0, 3);

  const productWhatsAppText = `Hello Miah Gee Distributor,\nI am interested in trade availability, minimum order quantity, and pricing for:\n*Product:* ${p.name}\n*Pack / Spec:* ${p.pack}\n*Category:* ${CATEGORIES[p.category]}\nPlease provide current stock status and wholesale dealer rates.`;

  return (
    <div
      className="modal-backdrop open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div className="modal-sheet">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close product details">
          <X size={18} strokeWidth={2} />
        </button>

        <div className="modal-content-grid">
          <div className="modal-image-col">
            <div className="modal-image-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="modal-main-img" />
            </div>

            <div className="modal-quick-specs">
              <div className="spec-row">
                <span className="spec-key">Category</span>
                <span className="spec-val">{CATEGORIES[p.category]}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Dosage Form</span>
                <span className="spec-val">{dosageInfo.label}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Presentation</span>
                <span className="spec-val">{p.pack}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Principal Partner</span>
                <span className="spec-val">{MANUFACTURERS[p.manufacturer]?.name}</span>
              </div>
            </div>
          </div>

          <div className="modal-details-col">
            <div className="modal-header-meta">
              <span className="category-pill-sm">{CATEGORIES[p.category]}</span>
              {p.rx && <span className="rx-pill-sm">Healthcare Professional Trade Only</span>}
            </div>

            <h2 id="modal-product-title" className="modal-title">{p.name}</h2>
            <div className="modal-pack-badge">
              <span>Packaging / Dosage:</span> <b>{p.pack}</b>
            </div>

            {p.rx ? (
              <div className="rx-warning-card">
                <div className="rx-warning-title flex-inline-icon">
                  <AlertTriangle size={16} strokeWidth={2.2} /> Restricted Prescription Medicine
                </div>
                <p>
                  This product is manufactured by Rasco Pharma and distributed strictly for registered hospitals,
                  licensed retail pharmacies, and medical clinics. Not advertised or sold directly to consumers. Use strictly under registered physician supervision.
                </p>
              </div>
            ) : (
              <>
                {p.tagline && <p className="modal-tagline">{p.tagline}</p>}

                {p.indications && p.indications.length > 0 && (
                  <div className="modal-section-block">
                    <h4>Clinical &amp; Health Indications</h4>
                    <ul className="modal-bullet-list">
                      {p.indications.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {p.usage && (
                  <div className="modal-section-block">
                    <h4>Recommended Administration &amp; Usage</h4>
                    <p className="modal-text">{p.usage}</p>
                  </div>
                )}

                {p.benefits && p.benefits.length > 0 && (
                  <div className="modal-section-block">
                    <h4>Key Product Benefits</h4>
                    <ul className="modal-bullet-list benefits">
                      {p.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="partner-cred-box">
              <div>
                <b>Marketed By:</b> {COMPANY.name} (Peshawar)
              </div>
              <div>
                <b>Manufactured By:</b> {MANUFACTURERS[p.manufacturer]?.name} ({MANUFACTURERS[p.manufacturer]?.location})
              </div>
            </div>

            <div className="modal-actions-bar">
              <button
                type="button"
                className={`btn btn-lg ${isAdded ? 'btn-added' : 'btn-primary'}`}
                onClick={() => {
                  toggleProduct(p);
                  if (!isAdded) openDrawer();
                }}
              >
                {isAdded ? (
                  <span className="flex-inline-icon"><Check size={16} strokeWidth={2.4} /> Added to Enquiry List</span>
                ) : (
                  <span className="flex-inline-icon"><Plus size={16} strokeWidth={2.4} /> Add to Trade Enquiry</span>
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
                <Phone size={16} strokeWidth={2} /> Call Office
              </a>
            </div>

            {/* Related Products F3 */}
            {relatedProducts.length > 0 && (
              <div className="modal-related-section">
                <h4>Related Catalogue Items</h4>
                <div className="related-items-row">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      className="related-item-chip"
                      onClick={() => onSelectProduct ? onSelectProduct(rel) : null}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rel.image} alt={rel.name} className="related-item-thumb" />
                      <div>
                        <div className="related-item-name">{rel.name}</div>
                        <div className="related-item-pack">{rel.pack}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
