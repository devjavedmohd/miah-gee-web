'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { MANUFACTURERS } from '@/data/manufacturers';
import { DOSAGE_FORMS, inferDosageForm } from '@/data/dosageForms';
import type { CategoryId, ManufacturerId, DosageFormId } from '@/lib/types';
import ProductCard from './ProductCard';
import { Search, X, Lock, ShieldAlert, RotateCcw } from 'lucide-react';

export default function ProductsSection() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('category') as CategoryId) || '';
  const initialMf = (searchParams.get('manufacturer') as ManufacturerId) || '';

  const [cat, setCat] = useState<CategoryId | ''>(initialCat);
  const [mf, setMf] = useState<ManufacturerId | ''>(initialMf);
  const [form, setForm] = useState<DosageFormId | ''>('');
  const [q, setQ] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'wellness' | 'rx'>(
    initialCat === 'rx' ? 'rx' : 'all'
  );
  const [hcpAccepted, setHcpAccepted] = useState(false);

  useEffect(() => {
    const qCat = (searchParams.get('category') as CategoryId) || '';
    const qMf = (searchParams.get('manufacturer') as ManufacturerId) || '';
    if (qCat) {
      setCat(qCat);
      if (qCat === 'rx') setActiveTab('rx');
      else setActiveTab('wellness');
    }
    if (qMf) setMf(qMf);
  }, [searchParams]);

  const handleTabChange = (tab: 'all' | 'wellness' | 'rx') => {
    setActiveTab(tab);
    if (tab === 'rx') {
      setCat('rx');
    } else if (tab === 'wellness') {
      if (cat === 'rx') setCat('');
    } else {
      setCat('');
    }
  };

  const filteredList = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (activeTab === 'wellness' && p.rx) return false;
      if (activeTab === 'rx' && !p.rx) return false;
      if (cat && p.category !== cat) return false;
      if (mf && p.manufacturer !== mf) return false;

      if (form) {
        const pForm = inferDosageForm(p);
        if (pForm !== form) return false;
      }

      if (s) {
        const searchTarget = `${p.name} ${p.pack} ${p.tagline ?? ''} ${CATEGORIES[p.category]} ${MANUFACTURERS[p.manufacturer]?.name ?? ''}`.toLowerCase();
        if (!searchTarget.includes(s)) return false;
      }

      return true;
    });
  }, [cat, mf, form, q, activeTab]);

  const hasActiveFilters = Boolean(cat || mf || form || q || activeTab !== 'all');

  const clearAllFilters = () => {
    setCat('');
    setMf('');
    setForm('');
    setQ('');
    setActiveTab('all');
  };

  return (
    <section className="catalogue-section section-padded">
      <div className="w">
        <div className="catalogue-header-top">
          <div>
            <span className="section-eyebrow">Comprehensive Inventory</span>
            <h2 className="section-title">Trade Product Catalogue</h2>
            <p className="section-subtitle">
              Browse, filter by dosage or principal, inspect packaging specs, and add items directly to your trade enquiry list.
            </p>
          </div>

          {/* Section Tabs (F9 HCP separation) */}
          <div className="catalogue-tabs">
            <button
              className={`catalogue-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              All Products ({PRODUCTS.length})
            </button>
            <button
              className={`catalogue-tab-btn ${activeTab === 'wellness' ? 'active' : ''}`}
              onClick={() => handleTabChange('wellness')}
            >
              Wellness &amp; Personal Care ({PRODUCTS.filter((p) => !p.rx).length})
            </button>
            <button
              className={`catalogue-tab-btn tab-rx ${activeTab === 'rx' ? 'active' : ''}`}
              onClick={() => handleTabChange('rx')}
            >
              <span className="flex-inline-icon">
                <Lock size={12} strokeWidth={2} /> Rx Range (Trade Only) ({PRODUCTS.filter((p) => p.rx).length})
              </span>
            </button>
          </div>
        </div>

        {/* Trade Rx Gate Notification if on Rx tab */}
        {activeTab === 'rx' && !hcpAccepted && (
          <div className="rx-gate-notice">
            <div className="rx-gate-icon">
              <ShieldAlert size={28} strokeWidth={1.8} className="text-danger" />
            </div>
            <div className="rx-gate-content">
              <h4>Healthcare Professional &amp; Licensed Trade Verification</h4>
              <p>
                Products in this section include Rasco Pharma prescription pharmaceuticals (antibiotics, analgesics, injectables, and cardiovascular medicines). In compliance with DRAP regulations, these products are not for consumer self-medication.
              </p>
              <button
                type="button"
                className="btn btn-sm btn-primary mt-2"
                onClick={() => setHcpAccepted(true)}
              >
                I confirm I am a Healthcare Professional or Licensed Pharmacy Buyer
              </button>
            </div>
          </div>
        )}

        {/* Search and Dropdown Controls Bar */}
        <div className="catalogue-control-bar">
          <div className="search-input-wrapper">
            <Search size={16} strokeWidth={2} className="search-icon" />
            <input
              type="search"
              placeholder="Search by product name, generic formula, pack..."
              aria-label="Search catalogue"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="catalogue-search-input"
            />
            {q && (
              <button
                className="clear-search-btn"
                onClick={() => setQ('')}
                aria-label="Clear search"
              >
                <X size={12} strokeWidth={2.4} />
              </button>
            )}
          </div>

          <div className="filter-selects-row">
            {/* Manufacturer Filter */}
            <select
              aria-label="Filter by Manufacturer"
              value={mf}
              onChange={(e) => setMf(e.target.value as ManufacturerId | '')}
              className="catalogue-select"
            >
              <option value="">All Principals / Manufacturers</option>
              {(Object.keys(MANUFACTURERS) as ManufacturerId[]).map((k) => (
                <option key={k} value={k}>
                  {MANUFACTURERS[k].name} ({MANUFACTURERS[k].location})
                </option>
              ))}
            </select>

            {/* Dosage Form Filter (F2 requirement) */}
            <select
              aria-label="Filter by Dosage Form"
              value={form}
              onChange={(e) => setForm(e.target.value as DosageFormId | '')}
              className="catalogue-select"
            >
              <option value="">All Dosage Forms</option>
              {(Object.keys(DOSAGE_FORMS) as DosageFormId[]).map((k) => (
                <option key={k} value={k}>
                  {DOSAGE_FORMS[k].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills (F2) */}
        <div className="category-chips-row">
          <button
            type="button"
            className={`chip-filter-btn ${cat === '' ? 'is-active' : ''}`}
            onClick={() => setCat('')}
          >
            All Categories
          </button>
          {(Object.keys(CATEGORIES) as CategoryId[])
            .filter((k) => (activeTab === 'wellness' ? k !== 'rx' : activeTab === 'rx' ? k === 'rx' : true))
            .map((k) => (
              <button
                key={k}
                type="button"
                className={`chip-filter-btn ${cat === k ? 'is-active' : ''} ${k === 'rx' ? 'chip-rx' : ''}`}
                onClick={() => setCat(k)}
              >
                {CATEGORIES[k]}
              </button>
            ))}
        </div>

        {/* Active Filters Summary Bar */}
        <div className="filter-status-row">
          <div className="results-count">
            Showing <b>{filteredList.length}</b> {filteredList.length === 1 ? 'product' : 'products'}
            {hasActiveFilters && <span className="filtered-indicator"> (filtered)</span>}
          </div>

          {hasActiveFilters && (
            <button className="reset-filters-btn flex-inline-icon" onClick={clearAllFilters}>
              <RotateCcw size={12} strokeWidth={2.2} /> Reset All Filters
            </button>
          )}
        </div>

        {/* Products Grid - Every card navigates to /products/[slug] */}
        <div className="catalogue-grid">
          {filteredList.length > 0 ? (
            filteredList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="catalogue-empty-state">
              <div className="empty-state-icon">
                <Search size={36} strokeWidth={1.5} className="text-muted" />
              </div>
              <h3>No products match your filters</h3>
              <p>Try searching for a different name, clearing your dosage filter, or resetting all criteria.</p>
              <button className="btn btn-primary mt-3 flex-inline-icon" onClick={clearAllFilters}>
                <RotateCcw size={14} strokeWidth={2} /> Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
