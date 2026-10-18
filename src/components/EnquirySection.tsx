'use client';
import { useState, type FormEvent } from 'react';
import { COMPANY, getWhatsAppUrl } from '@/data/company';
import { useEnquiry } from './EnquiryContext';
import { CATEGORIES } from '@/data/categories';
import { ClipboardList, CheckCircle2, MessageCircle, Send, X, Zap, AlertCircle } from 'lucide-react';

export default function EnquirySection() {
  const { items, removeById, clear } = useEnquiry();
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Price list & stock availability');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const selectedProductNames = items.map((i) => `${i.name} (${i.pack})`);

  const buildWhatsAppMessage = () => {
    return (
      `*TRADE ENQUIRY — MIAH GEE DISTRIBUTOR (PVT) LTD.*\n\n` +
      `*Customer Name:* ${name || 'Prospective Buyer'}\n` +
      `*Business / Pharmacy:* ${business || 'Retailer / Clinic'}\n` +
      `*City / Area:* ${city || 'Peshawar'}\n` +
      `*Phone:* ${phone || 'N/A'}\n` +
      `*Enquiry Type:* ${type}\n\n` +
      `*Selected Products (${items.length}):*\n` +
      (selectedProductNames.length > 0 ? selectedProductNames.map((p, idx) => `${idx + 1}. ${p}`).join('\n') : 'General catalogue inquiry') +
      `\n\n` +
      (message ? `*Additional Message:* ${message}\n\n` : '') +
      `_Submitted via Miah Gee Distributor Portal_`
    );
  };

  const handleDirectWhatsApp = () => {
    const url = getWhatsAppUrl(buildWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          business,
          city,
          phone,
          type,
          message,
          products: selectedProductNames,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit enquiry');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="enquiry" className="enquiry-section section-padded">
      <div className="w">
        <div className="section-header-center">
          <span className="section-eyebrow">Direct Trade Desk</span>
          <h2 className="section-title">Request Quotation &amp; Stock Availability</h2>
          <p className="section-subtitle">
            Submit your trade enquiry online or connect immediately with our sales representative on WhatsApp.
          </p>
        </div>

        <div className="enquiry-layout-grid">
          {/* Selected Products Column */}
          <div className="enquiry-selected-column">
            <div className="selected-card-box">
              <div className="selected-box-header">
                <h3>Selected Products for Inquiry</h3>
                <span className="selected-count-pill">{items.length} Selected</span>
              </div>

              {items.length === 0 ? (
                <div className="selected-empty-state">
                  <div className="empty-state-icon">
                    <ClipboardList size={36} strokeWidth={1.5} className="text-muted" />
                  </div>
                  <p>You haven't selected any specific products yet.</p>
                  <p className="empty-hint">
                    Click <b>+ Add</b> on any product card in the catalogue to build your quote request, or submit a general enquiry below.
                  </p>
                  <a href="#products" className="btn btn-sm btn-outline mt-2">
                    Browse Catalogue
                  </a>
                </div>
              ) : (
                <div className="selected-items-scroll">
                  <div className="selected-items-actions-top">
                    <span>Current items list:</span>
                    <button className="text-btn text-danger" onClick={clear}>Clear List</button>
                  </div>
                  {items.map((item) => (
                    <div key={item.id} className="selected-item-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="selected-item-thumb" />
                      <div className="selected-item-info">
                        <span className="selected-category">{CATEGORIES[item.category]}</span>
                        <div className="selected-item-name">{item.name}</div>
                        <div className="selected-item-pack">{item.pack}</div>
                      </div>
                      <button
                        className="item-remove-btn"
                        onClick={() => removeById(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={15} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="urgent-order-box">
                <div className="urgent-icon-lucide">
                  <Zap size={20} strokeWidth={2} />
                </div>
                <div>
                  <b>Need Same-Day Dispatch?</b>
                  <p>Call our Nishtarabad Road office directly at <a href={COMPANY.phoneHref} className="link-highlight">{COMPANY.phone}</a>.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="enquiry-form-column">
            <div className="enquiry-form-card">
              {status === 'done' ? (
                <div className="enquiry-done-card">
                  <div className="done-badge">
                    <CheckCircle2 size={32} strokeWidth={2} />
                  </div>
                  <h3>Trade Enquiry Received</h3>
                  <p>
                    Thank you, <b>{name}</b>. Your quotation request has been logged. Our commercial sales manager will review stock availability and contact you on <b>{phone}</b>.
                  </p>
                  <div className="done-action-buttons">
                    <button className="btn btn-whatsapp flex-inline-icon" onClick={handleDirectWhatsApp}>
                      <MessageCircle size={16} strokeWidth={2} /> Open in WhatsApp
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setStatus('idle');
                        clear();
                      }}
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="enquiry-form-body">
                  <div className="form-row-two">
                    <div className="form-field">
                      <label>Your Name *</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Dr. / Mr. / Ms. Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Business / Pharmacy / Clinic *</label>
                      <input
                        required
                        name="business"
                        type="text"
                        placeholder="e.g. Peshawar Central Medicos"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row-two">
                    <div className="form-field">
                      <label>City / Town *</label>
                      <input
                        required
                        name="city"
                        type="text"
                        placeholder="e.g. Peshawar, Mardan, Swat"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Mobile / WhatsApp Phone *</label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="e.g. 0300-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Enquiry Type</label>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                      <option>Price list &amp; stock availability</option>
                      <option>Bulk wholesale quotation</option>
                      <option>Become an authorized dealer / retailer</option>
                      <option>Request printed product catalogue</option>
                      <option>Hospital / Institutional procurement</option>
                      <option>Other trade query</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Message / Order Requirements</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Specify required quantities, delivery timeline, or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="error-alert flex-inline-icon">
                      <AlertCircle size={16} strokeWidth={2} /> Something went wrong while submitting. Please call <a href={COMPANY.phoneHref}>{COMPANY.phone}</a> or message us on WhatsApp.
                    </div>
                  )}

                  <div className="form-submit-row">
                    <button
                      className="btn btn-primary btn-lg flex-inline-icon"
                      type="submit"
                      disabled={status === 'sending'}
                    >
                      <Send size={16} strokeWidth={2} />
                      {status === 'sending' ? 'Sending Enquiry...' : 'Submit Trade Enquiry'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-whatsapp btn-lg flex-inline-icon"
                      onClick={handleDirectWhatsApp}
                      title="Prepare WhatsApp message immediately"
                    >
                      <MessageCircle size={18} strokeWidth={2} /> Send via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
