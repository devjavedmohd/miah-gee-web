'use client';
import Link from 'next/link';
import { CATEGORIES, CATEGORY_DETAILS } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import type { CategoryId } from '@/lib/types';
import {
  Zap,
  Activity,
  ShieldCheck,
  Heart,
  Brain,
  UtensilsCrossed,
  Wind,
  Sparkles,
  Stethoscope,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  vitamins: Zap,
  blood: Activity,
  bones: ShieldCheck,
  women: Heart,
  brain: Brain,
  digestive: UtensilsCrossed,
  respiratory: Wind,
  skin: Sparkles,
  rx: Stethoscope,
};

export default function CategoriesSection() {
  const categoryKeys = Object.keys(CATEGORIES) as CategoryId[];

  const getProductCount = (catId: CategoryId) => {
    return PRODUCTS.filter((p) => p.category === catId).length;
  };

  return (
    <section className="categories-section section-padded">
      <div className="w">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Therapeutic Areas &amp; Categories</span>
            <h2 className="section-title">Explore Our Distribution Portfolio</h2>
            <p className="section-subtitle">
              Targeted solutions spanning daily family wellness, clinical therapeutics, dermatological care, and hospital supply.
            </p>
          </div>
          <Link href="/categories" className="btn btn-outline view-all-link flex-inline-icon">
            View All Categories <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>

        <div className="category-tiles-grid">
          {categoryKeys.map((catKey) => {
            const details = CATEGORY_DETAILS[catKey];
            const count = getProductCount(catKey);
            const isRx = catKey === 'rx';
            const IconComponent = CATEGORY_ICONS[catKey] || Sparkles;
            const targetHref = isRx ? '/trade-rx' : `/products?category=${catKey}`;

            return (
              <Link
                key={catKey}
                href={targetHref}
                className={`category-tile-card ${isRx ? 'category-tile-rx' : ''}`}
              >
                <div className="category-tile-top">
                  <div className="category-icon-bubble">
                    <IconComponent size={22} strokeWidth={1.8} className="lucide-cat-icon" />
                  </div>
                  <span className="category-count-badge">
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>

                <h3 className="category-tile-title">{CATEGORIES[catKey]}</h3>
                <p className="category-tile-desc">{details?.shortDesc}</p>

                {details?.sampleItems && (
                  <div className="category-sample-pills">
                    {details.sampleItems.slice(0, 3).map((item) => (
                      <span key={item} className="sample-mini-tag">{item}</span>
                    ))}
                    {details.sampleItems.length > 3 && (
                      <span className="sample-mini-tag more">+{details.sampleItems.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="category-tile-action">
                  <span>Browse Products</span>
                  <ArrowRight size={15} strokeWidth={2.2} className="arrow-icon" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
