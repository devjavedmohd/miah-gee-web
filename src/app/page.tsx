import Link from 'next/link';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedSection from '@/components/FeaturedSection';
import PrincipalsSection from '@/components/PrincipalsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { ArrowRight, FileText, Handshake } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Categories Preview */}
      <CategoriesSection />

      {/* Featured Products (Cards link directly to /products/[slug]) */}
      <FeaturedSection />

      {/* Quick Trade Range Banner */}
      <section className="trade-quick-cta-banner">
        <div className="w cta-banner-inner">
          <div className="cta-banner-text">
            <span className="badge-pill bg-danger">HCP Trade Section</span>
            <h2>Hospital &amp; Prescription (Rx) Range</h2>
            <p>
              Rasco Pharma antibiotics, analgesics, NSAIDs, and injectables available exclusively for licensed healthcare institutions and retail pharmacies.
            </p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/trade-rx" className="btn btn-primary btn-lg flex-inline-icon">
              Enter Rx Section <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/dealer" className="btn btn-outline btn-lg flex-inline-icon">
              <Handshake size={16} strokeWidth={2} /> Dealer Terms
            </Link>
          </div>
        </div>
      </section>

      {/* Principals Showcase */}
      <PrincipalsSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact & Map Section */}
      <ContactSection />
    </>
  );
}
