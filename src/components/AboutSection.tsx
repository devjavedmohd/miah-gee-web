import { COMPANY } from '@/data/company';
import { Building2, Package, Handshake, ShieldCheck, Check, MapPin, Phone, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section section-padded alt-bg">
      <div className="w">
        <div className="about-grid">
          <div className="about-story-col">
            <span className="section-eyebrow">About Miah Gee Distributor</span>
            <h2 className="section-title">
              Peshawar’s Trusted Gateway for Pharmaceutical &amp; Healthcare Distribution
            </h2>
            <p className="about-intro">
              <b>{COMPANY.name}</b> is a dedicated healthcare marketing and commercial distribution company based in Peshawar, Pakistan. Founded with a vision to connect high-caliber manufacturing partners with retail pharmacies, hospital clinics, and regional healthcare institutions.
            </p>
            <p className="about-body">
              Operating out of our central facility near Ibadat Hospital on Nishtarabad Road, our distribution infrastructure provides reliable, tamper-evident, and timely supply across Khyber Pakhtunkhwa and major Pakistani trade hubs.
            </p>

            <div className="about-highlights-grid">
              <div className="highlight-box">
                <div className="highlight-icon-lucide"><Building2 size={24} strokeWidth={1.8} /></div>
                <div>
                  <b>Centrally Located Hub:</b>
                  <p>Fast logistics from Peshawar's core pharmaceutical wholesale district.</p>
                </div>
              </div>
              <div className="highlight-box">
                <div className="highlight-icon-lucide"><Package size={24} strokeWidth={1.8} /></div>
                <div>
                  <b>120+ Product Portfolio:</b>
                  <p>Comprehensive coverage spanning wellness, pediatrics, skin care, and Rx lines.</p>
                </div>
              </div>
              <div className="highlight-box">
                <div className="highlight-icon-lucide"><Handshake size={24} strokeWidth={1.8} /></div>
                <div>
                  <b>Direct Principal Ties:</b>
                  <p>Sole marketing partner for leading cGMP pharmaceutical &amp; cosmeceutical brands.</p>
                </div>
              </div>
              <div className="highlight-box">
                <div className="highlight-icon-lucide"><ShieldCheck size={24} strokeWidth={1.8} /></div>
                <div>
                  <b>Regulatory Compliance:</b>
                  <p>Strict segregation of prescription medicines from consumer wellness lines.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-coverage-col">
            <div className="coverage-card">
              <div className="coverage-card-header">
                <h3>Regional Distribution Coverage</h3>
                <span className="coverage-badge">KPK &amp; Nationwide Corridors</span>
              </div>
              <p className="coverage-desc">
                Our sales representatives and logistical dispatch network ensure steady delivery schedules to major medical markets:
              </p>

              <div className="coverage-tags-list">
                {COMPANY.coverageAreas.map((area) => (
                  <div key={area} className="coverage-tag-item">
                    <Check size={14} strokeWidth={2.4} className="coverage-pin" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>

              <div className="headquarters-box">
                <div className="hq-title flex-inline-icon">
                  <MapPin size={13} strokeWidth={2} /> Headquarters &amp; Order Desk:
                </div>
                <div className="hq-address">
                  {COMPANY.address[0]}<br />
                  {COMPANY.address[1]}
                </div>
                <div className="hq-phone flex-inline-icon">
                  <Phone size={13} strokeWidth={2} /> Telephone: <a href={COMPANY.phoneHref} className="link-highlight">{COMPANY.phone}</a>
                </div>
                <div className="hq-hours flex-inline-icon">
                  <Clock size={13} strokeWidth={2} /> Trade Counter: {COMPANY.workingHours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
