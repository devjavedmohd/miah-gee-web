'use client';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { useEnquiry } from './EnquiryContext';
import { Check, Plus, Eye, ArrowRight } from 'lucide-react';

const FEATURED_IDS = [1, 3, 33, 48, 58, 62, 74, 78];

export default function FeaturedSection() {
  const { toggleProduct, has } = useEnquiry();

  const featuredProducts = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section className="featured-section section-padded alt-bg">
      <div className="w">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">High Demand In Pharmacies</span>
            <h2 className="section-title">Featured Retail &amp; Clinic Staples</h2>
            <p className="section-subtitle">
              Fast-moving supplements, skin formulations, and OTC lines frequently requested by Peshawar and KPK healthcare retailers.
            </p>
          </div>
          <Link href="/products" className="btn btn-outline view-all-link flex-inline-icon">
            View All 129 Products <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => {
            const isAdded = has(product.name);

            return (
              <div key={product.id} className="featured-card">
                <Link href={`/products/${product.slug}`} className="featured-card-link">
                  <div className="featured-image-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="featured-img"
                    />
                    <span className="featured-category-badge">{CATEGORIES[product.category]}</span>
                  </div>

                  <div className="featured-content">
                    <h3 className="featured-product-name">{product.name}</h3>
                    <div className="featured-pack-line">
                      <span className="pack-label">Pack:</span> {product.pack}
                    </div>
                    {product.tagline && (
                      <p className="featured-tagline">{product.tagline}</p>
                    )}
                  </div>
                </Link>

                <div className="featured-card-actions">
                  <button
                    type="button"
                    className={`btn btn-sm ${isAdded ? 'btn-added' : 'btn-add'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleProduct(product);
                    }}
                    aria-label={isAdded ? `Remove ${product.name} from enquiry list` : `Add ${product.name} to enquiry list`}
                  >
                    {isAdded ? (
                      <span className="flex-inline-icon"><Check size={14} strokeWidth={2.4} /> Added</span>
                    ) : (
                      <span className="flex-inline-icon"><Plus size={14} strokeWidth={2.4} /> Add</span>
                    )}
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="btn btn-sm btn-featured-details"
                    aria-label={`View trade details for ${product.name}`}
                  >
                    <span className="flex-inline-icon"><Eye size={14} strokeWidth={1.8} /> Details</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
