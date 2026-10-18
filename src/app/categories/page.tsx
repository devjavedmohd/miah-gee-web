import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Therapeutic Categories | Miah Gee Distributor Peshawar',
  description:
    'Explore our 9 specialized categories spanning vitamins, hematinics, bone support, women’s health, respiratory, and dermatology.',
};

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

export default function CategoriesPage() {
  const categoryKeys = Object.keys(CATEGORIES) as CategoryId[];

  const getProductCount = (catId: CategoryId) => {
    return PRODUCTS.filter((p) => p.category === catId).length;
  };

  return (
    <div className="categories-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Therapeutic Areas</span>
          <h1 className="page-title">Healthcare &amp; Wellness Categories</h1>
          <p className="page-desc">
            Browse our comprehensive portfolio grouped by therapeutic focus. Each category features products sourced from licensed cGMP manufacturing principals.
          </p>
        </div>
      </div>

      <div className="w section-padded">
        <div className="category-tiles-grid">
          {categoryKeys.map((catKey) => {
            const details = CATEGORY_DETAILS[catKey];
            const count = getProductCount(catKey);
            const isRx = catKey === 'rx';
            const IconComponent = CATEGORY_ICONS[catKey] || Sparkles;

            return (
              <Link
                key={catKey}
                href={isRx ? '/trade-rx' : `/products?category=${catKey}`}
                className={`category-tile-card ${isRx ? 'category-tile-rx' : ''}`}
              >
                <div className="category-tile-top">
                  <div className="category-icon-bubble">
                    <IconComponent size={24} strokeWidth={1.8} className="lucide-cat-icon" />
                  </div>
                  <span className="category-count-badge">
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>

                <h2 className="category-tile-title">{CATEGORIES[catKey]}</h2>
                <p className="category-tile-desc">{details?.shortDesc}</p>

                {details?.sampleItems && (
                  <div className="category-sample-pills">
                    {details.sampleItems.map((item) => (
                      <span key={item} className="sample-mini-tag">{item}</span>
                    ))}
                  </div>
                )}

                <div className="category-tile-action">
                  <span>View All {CATEGORIES[catKey]}</span>
                  <ArrowRight size={15} strokeWidth={2.2} className="arrow-icon" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
