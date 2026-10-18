'use client';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { CATEGORIES } from '@/data/categories';
import { MANUFACTURERS } from '@/data/manufacturers';
import { DOSAGE_FORMS, inferDosageForm } from '@/data/dosageForms';
import { useEnquiry } from './EnquiryContext';
import { Check, Plus, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpen?: () => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { has, toggleProduct } = useEnquiry();
  const added = has(product.name);
  const dosageKey = inferDosageForm(product);
  const dosageInfo = DOSAGE_FORMS[dosageKey];

  return (
    <article className={`product-card ${product.rx ? 'is-rx' : ''}`}>
      <Link href={`/products/${product.slug}`} className="product-card-link-wrapper">
        <div className="product-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            alt={product.name}
            src={product.image}
            className="product-card-img"
          />
          <div className="product-media-badges">
            <span className="card-category-badge">{CATEGORIES[product.category]}</span>
            {product.rx ? (
              <span className="card-rx-badge">Rx Trade</span>
            ) : (
              <span className="card-dosage-badge">
                {dosageInfo.label}
              </span>
            )}
          </div>
        </div>

        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
          <div className="product-card-pack">
            <Package size={13} strokeWidth={1.8} className="pack-bullet-icon" />
            <span>{product.pack}</span>
          </div>

          {product.tagline && (
            <p className="product-card-tagline">{product.tagline}</p>
          )}

          <div className="product-card-footer">
            <div className="manufacturer-info">
              <span className="m-label">Partner:</span>
              <span className="m-name">{MANUFACTURERS[product.manufacturer]?.name || product.manufacturer}</span>
            </div>

            <button
              type="button"
              className={`btn-card-add ${added ? 'is-added' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleProduct(product);
              }}
              aria-label={added ? `Remove ${product.name} from enquiry` : `Add ${product.name} to enquiry`}
            >
              {added ? (
                <span className="flex-inline-icon"><Check size={13} strokeWidth={2.4} /> Added</span>
              ) : (
                <span className="flex-inline-icon"><Plus size={13} strokeWidth={2.4} /> Add</span>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
