import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { MANUFACTURERS } from '@/data/manufacturers';
import { CATEGORIES } from '@/data/categories';
import { COMPANY } from '@/data/company';
import { Search, MessageCircle, Handshake, CheckCircle2, PackageCheck, Building2, Layers, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="w hero-inner">
        <div className="hero-badge-row">
          <span className="hero-pill-tag">
            <span className="pulse-dot"></span> Official Healthcare Distribution Partner
          </span>
          <span className="hero-city-tag flex-inline-icon">
            <MapPin size={13} strokeWidth={2} /> Peshawar • Khyber Pakhtunkhwa
          </span>
        </div>

        <h1 className="hero-title">
          Supplying Trusted Pharmaceuticals, Wellness &amp; Personal Care Across Pakistan.
        </h1>

        <p className="hero-description">
          <b>{COMPANY.name}</b> bridges premier pharmaceutical manufacturers in Lahore, Karachi and Multan with
          licensed pharmacies, hospital clinics, and wholesale distributors. Browse 120+ verified items and request official stock lists and trade terms.
        </p>

        <div className="hero-cta-group">
          <Link className="btn btn-primary btn-lg flex-inline-icon" href="/products">
            <Search size={18} strokeWidth={2} /> Browse Catalogue ({PRODUCTS.length} Items)
          </Link>
          <a className="btn btn-whatsapp btn-lg flex-inline-icon" href={`https://wa.me/${COMPANY.whatsappNumber}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} strokeWidth={2} /> WhatsApp Trade Desk
          </a>
          <Link className="btn btn-outline btn-lg flex-inline-icon" href="/dealer">
            <Handshake size={18} strokeWidth={2} /> Become a Registered Dealer
          </Link>
        </div>

        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <div className="stat-card-top-icon"><PackageCheck size={20} strokeWidth={1.8} /></div>
            <span className="stat-number">{PRODUCTS.length}</span>
            <span className="stat-label">Catalogue Products</span>
            <span className="stat-desc">Supplements, Skin &amp; Rx Range</span>
          </div>
          <div className="hero-stat-card">
            <div className="stat-card-top-icon"><Building2 size={20} strokeWidth={1.8} /></div>
            <span className="stat-number">{Object.keys(MANUFACTURERS).length}</span>
            <span className="stat-label">Principal Partners</span>
            <span className="stat-desc">Medikeen, Medicom, Rasco, etc.</span>
          </div>
          <div className="hero-stat-card">
            <div className="stat-card-top-icon"><Layers size={20} strokeWidth={1.8} /></div>
            <span className="stat-number">{Object.keys(CATEGORIES).length}</span>
            <span className="stat-label">Product Categories</span>
            <span className="stat-desc">From Vitamins to Rx Injectables</span>
          </div>
          <div className="hero-stat-card">
            <div className="stat-card-top-icon"><MapPin size={20} strokeWidth={1.8} /></div>
            <span className="stat-number">Peshawar</span>
            <span className="stat-label">Central Warehouse</span>
            <span className="stat-desc">Near Ibadat Hospital, Nishtarabad</span>
          </div>
        </div>

        <div className="hero-trust-bar">
          <div className="trust-item">
            <CheckCircle2 size={16} strokeWidth={2.2} className="trust-lucide-icon" />
            <span>Direct Manufacturer Sourcing</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} strokeWidth={2.2} className="trust-lucide-icon" />
            <span>B2B Wholesale &amp; Retail Supply</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} strokeWidth={2.2} className="trust-lucide-icon" />
            <span>Dedicated Trade Sales Reps</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} strokeWidth={2.2} className="trust-lucide-icon" />
            <span>Same-Day Peshawar Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
