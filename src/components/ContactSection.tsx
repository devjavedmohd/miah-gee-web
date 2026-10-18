import { COMPANY } from '@/data/company';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section section-padded">
      <div className="w">
        <div className="section-header-center">
          <span className="section-eyebrow">Location &amp; Support</span>
          <h2 className="section-title">Visit Our Peshawar Headquarters</h2>
          <p className="section-subtitle">
            Our trade desk and warehouse is conveniently situated on Nishtarabad Road, serving pharmaceutical buyers across KP and northern Pakistan.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-cards-col">
            <div className="contact-card">
              <div className="contact-icon-bubble">
                <MapPin size={22} strokeWidth={1.8} className="text-primary" />
              </div>
              <div className="contact-card-content">
                <h4>Registered Business Address</h4>
                <p>
                  <b>{COMPANY.name}</b><br />
                  {COMPANY.address[0]}<br />
                  {COMPANY.address[1]}
                </p>
                <span className="contact-meta-badge">Near Ibadat Hospital Landmark</span>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-bubble">
                <Phone size={22} strokeWidth={1.8} className="text-primary" />
              </div>
              <div className="contact-card-content">
                <h4>Order Desk Telephone</h4>
                <p>
                  <a href={COMPANY.phoneHref} className="contact-main-link">
                    {COMPANY.phone}
                  </a>
                </p>
                <p className="contact-hint">Direct telephone line for trade orders, price verification and dispatch status.</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-bubble">
                <MessageCircle size={22} strokeWidth={1.8} className="whatsapp-color" />
              </div>
              <div className="contact-card-content">
                <h4>WhatsApp Commercial Rep</h4>
                <p>
                  <a
                    href={`https://wa.me/${COMPANY.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-main-link whatsapp-color"
                  >
                    {COMPANY.whatsappFormatted}
                  </a>
                </p>
                <p className="contact-hint">Available for instant product catalogue PDFs, invoices, and urgent inquiries.</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-bubble">
                <Clock size={22} strokeWidth={1.8} className="text-primary" />
              </div>
              <div className="contact-card-content">
                <h4>Business &amp; Dispatch Hours</h4>
                <p><b>{COMPANY.workingHours}</b></p>
                <p className="contact-hint">Sunday: Closed (Emergency hospital orders dispatched on request).</p>
              </div>
            </div>
          </div>

          <div className="contact-map-col">
            <div className="map-container-card">
              <div className="map-header">
                <span className="map-badge flex-inline-icon">
                  <MapPin size={15} strokeWidth={2} /> Interactive Map View
                </span>
                <span className="map-coords">Peshawar, KP</span>
              </div>
              <div className="map-frame-wrapper">
                <iframe
                  title="Miah Gee Distributor Location Map - Peshawar"
                  src="https://maps.google.com/maps?q=Nishtarabad+Road+Peshawar+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map showing Nishtarabad Road, Peshawar"
                ></iframe>
              </div>
              <div className="map-footer-notes">
                <span>📍 Mohallah Islamabad, Near Ibadat Hospital, Nishtarabad Road, Peshawar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
