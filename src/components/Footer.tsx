import Link from 'next/link';
import { COMPANY, NAV_LINKS } from '@/data/company';
import { CATEGORIES } from '@/data/categories';
import type { CategoryId } from '@/lib/types';
import { Phone, MessageCircle, MapPin, CheckCircle2, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const topCategories = (Object.keys(CATEGORIES) as CategoryId[]).slice(0, 5);

  return (
    <footer className="site-footer">
      <div className="w">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="logo-badge">MG</span>
              <div className="logo-text">
                <span className="brand-name">{COMPANY.short}</span>
                <span className="brand-sub">DISTRIBUTOR (PVT) LTD.</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Peshawar-based pharmaceutical and healthcare marketing &amp; distribution enterprise. Serving licensed retail pharmacies, clinics, hospitals, and wholesale distributors across Khyber Pakhtunkhwa and Pakistan.
            </p>
            <div className="footer-quick-contacts">
              <div className="contact-row">
                <Phone size={15} strokeWidth={2} className="footer-contact-icon" />
                <a href={COMPANY.phoneHref} className="footer-white-link">{COMPANY.phone}</a>
              </div>
              <div className="contact-row">
                <MessageCircle size={15} strokeWidth={2} className="footer-contact-icon whatsapp-color" />
                <a href={`https://wa.me/${COMPANY.whatsappNumber}`} target="_blank" rel="noreferrer" className="footer-white-link">
                  WhatsApp: <span className="whatsapp-highlight">{COMPANY.whatsappFormatted}</span>
                </a>
              </div>
              <div className="contact-row">
                <MapPin size={15} strokeWidth={2} className="footer-contact-icon" />
                <span className="footer-address-text">{COMPANY.address[0]} {COMPANY.address[1]}</span>
              </div>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">{link.label}</Link>
                </li>
              ))}
              <li><Link href="/dealer" className="footer-nav-link">Become a Retail Dealer</Link></li>
              <li><Link href="/enquiry" className="footer-nav-link">Trade Enquiry Desk</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links-list">
              {topCategories.map((k) => (
                <li key={k}>
                  <Link href={`/products?category=${k}`} className="footer-nav-link">{CATEGORIES[k]}</Link>
                </li>
              ))}
              <li><Link href="/trade-rx" className="footer-nav-link">Rasco Pharma Rx Range</Link></li>
            </ul>
          </div>

          <div className="footer-trade-col">
            <h4 className="footer-heading">Trade Enquiries</h4>
            <p className="trade-text">
              Looking for bulk trade terms, distributorship allocations, or price list schedules?
            </p>
            <Link href="/enquiry" className="btn btn-sm btn-primary">
              Submit Quotation Request
            </Link>
            <div className="trade-badge-wrap mt-3">
              <span className="b2b-guarantee-badge flex-inline-icon">
                <CheckCircle2 size={14} strokeWidth={2.4} /> Verified B2B Trade Portal
              </span>
            </div>
          </div>
        </div>

        <div className="footer-disclaimer-card">
          <div className="disclaimer-title">Regulatory &amp; Compliance Statement:</div>
          <p>
            Product details provided on this website are intended solely for registered medical practitioners, licensed retail pharmacies, and commercial trade distributors. Nutritional supplements and dermocosmetics are not intended to diagnose, treat, cure, or prevent any disease. All prescription (Rx) pharmaceuticals are manufactured by registered principal partners (such as Rasco Pharma) and are strictly dispensed pursuant to a valid prescription from a registered healthcare professional in full compliance with Drug Regulatory Authority of Pakistan (DRAP) regulations.
          </p>
        </div>

        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © {currentYear} {COMPANY.name}. All rights reserved. Peshawar, Khyber Pakhtunkhwa.
          </div>
          <div className="footer-meta-links">
            <a href="#top" className="back-to-top-link flex-inline-icon">
              <ArrowUp size={13} strokeWidth={2} /> Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
