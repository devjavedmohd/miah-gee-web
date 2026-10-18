'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, NAV_LINKS } from '@/data/company';
import { useEnquiry } from './EnquiryContext';
import { MapPin, Phone, MessageCircle, ClipboardList, Menu, X } from 'lucide-react';

export default function Header() {
  const { totalCount, openDrawer } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      {/* Top Announcement & Direct Support Bar */}
      <div className="header-top-bar">
        <div className="w top-bar-content">
          <div className="top-bar-left">
            <span className="topbar-info-item flex-inline-icon">
              <MapPin size={13} strokeWidth={2} className="topbar-icon" /> Nishtarabad Road, Peshawar
            </span>
            <span className="dot-sep">•</span>
            <span className="topbar-info-item flex-inline-icon">
              <Phone size={13} strokeWidth={2} className="topbar-icon" /> Direct:{' '}
              <a href={COMPANY.phoneHref} className="topbar-phone-link">{COMPANY.phone}</a>
            </span>
          </div>
          <div className="top-bar-right">
            <span className="badge-pill">B2B Trade Portal</span>
            <a
              href={`https://wa.me/${COMPANY.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-top-link flex-inline-icon"
            >
              <MessageCircle size={13} strokeWidth={2} /> WhatsApp Desk
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-main">
        <div className="w header-container">
          <Link className="logo-brand" href="/">
            <span className="logo-badge">MG</span>
            <div className="logo-text">
              <span className="brand-name">{COMPANY.short}</span>
              <span className="brand-sub">DISTRIBUTOR (PVT) LTD.</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Main Navigation">
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link ${isActive ? 'is-active-route' : ''}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="enquiry-cart-btn"
              onClick={openDrawer}
              aria-label={`View enquiry list (${totalCount} items)`}
            >
              <ClipboardList size={16} strokeWidth={2} className="cart-icon" />
              <span className="cart-label">Enquiry List</span>
              <span className="cart-badge">{totalCount}</span>
            </button>

            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <div className="logo-brand">
                <span className="logo-badge">MG</span>
                <span className="brand-name">{COMPANY.short}</span>
              </div>
              <button
                className="close-menu-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="mobile-nav-links">
              {NAV_LINKS.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`mobile-nav-link ${isActive ? 'is-active-mobile' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>

            <div className="mobile-nav-footer">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
              >
                <ClipboardList size={16} strokeWidth={2} /> View Enquiry List ({totalCount})
              </button>
              <a href={COMPANY.phoneHref} className="btn btn-outline btn-block mt-2">
                <Phone size={16} strokeWidth={2} /> Call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
