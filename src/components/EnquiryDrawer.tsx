'use client';
import { useState, type FormEvent } from 'react';
import { useEnquiry } from './EnquiryContext';
import { COMPANY, getWhatsAppUrl } from '@/data/company';
import { CATEGORIES } from '@/data/categories';
import { X, CheckCircle2, Package, MessageCircle, Send, Trash2 } from 'lucide-react';

export default function EnquiryDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeById, clear } = useEnquiry();
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState('Wholesale Price List & Stock');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isDrawerOpen) return null;

  const productListSummary = items.map((i, idx) => `${idx + 1}. ${i.name} (${i.pack})`).join('\n');

  const buildWhatsAppMessage = () => {
    return (
      `*TRADE ENQUIRY — MIAH GEE DISTRIBUTOR (PVT) LTD.*\n\n` +
      `*Contact Name:* ${name || 'Prospective Buyer'}\n` +
      `*Business / Pharmacy:* ${business || 'Retailer / Clinic'}\n` +
      `*City / Location:* ${city || 'Peshawar'}\n` +
      `*Phone:* ${phone || 'N/A'}\n` +
      `*Enquiry Type:* ${enquiryType}\n\n` +
      `*Selected Products (${items.length}):*\n${productListSummary || 'General Catalogue Inquiry'}\n\n` +
      (note ? `*Note:* ${note}\n\n` : '') +
      `_Sent via Miah Gee Distributor Online Portal_`
    );
  };

  const handleSendWhatsApp = () => {
    if (items.length === 0 && !note) {
      alert('Please add at least one product or enter a message note.');
      return;
    }
    const url = getWhatsAppUrl(buildWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !business || !city || !phone) {
      alert('Please fill out all required contact fields.');
      return;
    }
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
          type: enquiryType,
          message: note,
          products: items.map((i) => `${i.name} (${i.pack})`),
        }),
      });
      if (!res.ok) throw new Error('Failed to submit enquiry');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="drawer-backdrop" onClick={(e) => { if (e.target === e.currentTarget) closeDrawer(); }}>
      <aside className="drawer-panel" aria-label="Trade Enquiry Drawer">
        <div className="drawer-header">
          <div>
            <h3>Selected Trade Items</h3>
            <span className="drawer-sub">{items.length} product{items.length === 1 ? '' : 's'} in your list</span>
          </div>
          <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Close drawer">
            <X size={16} strokeWidth={2.4} />
          </button>
        </div>

        <div className="drawer-body">
          {status === 'success' ? (
            <div className="drawer-success">
              <div className="success-icon">
                <CheckCircle2 size={32} strokeWidth={2} />
              </div>
              <h4>Enquiry Submitted!</h4>
              <p>Our sales distribution office in Peshawar has received your request. We will review stock availability and contact you promptly.</p>
              <div className="action-stack">
                <button className="btn btn-whatsapp flex-inline-icon" onClick={handleSendWhatsApp}>
                  <MessageCircle size={16} strokeWidth={2} /> Confirm via WhatsApp
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setStatus('idle');
                    clear();
                    closeDrawer();
                  }}
                >
                  Done &amp; Clear List
                </button>
              </div>
            </div>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="drawer-empty">
                  <div className="empty-icon">
                    <Package size={44} strokeWidth={1.5} className="text-muted" />
                  </div>
                  <h4>Your enquiry list is empty</h4>
                  <p>Browse the catalogue and click <b>+ Add</b> on any product to assemble your trade order list.</p>
                  <a href="#products" className="btn btn-primary" onClick={closeDrawer}>Browse Products</a>
                </div>
              ) : (
                <>
                  <div className="drawer-items-list">
                    <div className="items-header-bar">
                      <span>Products to request quote/stock</span>
                      <button className="text-btn text-danger flex-inline-icon" onClick={clear}>
                        <Trash2 size={12} strokeWidth={2} /> Clear All
                      </button>
                    </div>
                    {items.map((item) => (
                      <div key={item.id} className="drawer-item-row">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="drawer-item-thumb" />
                        <div className="drawer-item-info">
                          <span className="item-category-tag">{CATEGORIES[item.category] || item.category}</span>
                          <span className="drawer-item-name">{item.name}</span>
                          <span className="drawer-item-pack">{item.pack}</span>
                        </div>
                        <button
                          className="item-remove-btn"
                          onClick={() => removeById(item.id)}
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={14} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form className="drawer-form" onSubmit={handleSubmit}>
                    <h4 className="form-legend">Your Pharmacy / Clinic Details</h4>
                    <div className="form-group-row">
                      <div className="form-field">
                        <label>Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Tariq Khan"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Business / Pharmacy *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Khyber Medicos"
                          value={business}
                          onChange={(e) => setBusiness(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label>City / Town *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Peshawar, Mardan, Swat"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0300-1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Enquiry Purpose</label>
                      <select value={enquiryType} onChange={(e) => setEnquiryType(e.target.value)}>
                        <option>Wholesale Price List &amp; Stock</option>
                        <option>Become an Authorized Dealer / Retailer</option>
                        <option>Direct Hospital / Clinic Supply</option>
                        <option>Bulk Order Quotation</option>
                        <option>Samples / Promotional Material</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Additional Notes / Required Quantities</label>
                      <textarea
                        rows={2}
                        placeholder="Mention desired packs or specific questions..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>

                    {status === 'error' && (
                      <div className="error-alert">
                        Unable to submit enquiry right now. Please send directly via WhatsApp or call {COMPANY.phone}.
                      </div>
                    )}

                    <div className="drawer-actions">
                      <button
                        type="submit"
                        className="btn btn-primary flex-inline-icon"
                        disabled={status === 'sending'}
                      >
                        <Send size={15} strokeWidth={2} />
                        {status === 'sending' ? 'Submitting...' : 'Submit Enquiry'}
                      </button>

                      <button
                        type="button"
                        className="btn btn-whatsapp flex-inline-icon"
                        onClick={handleSendWhatsApp}
                        title="Send pre-filled enquiry straight to WhatsApp"
                      >
                        <MessageCircle size={16} strokeWidth={2} /> Instant WhatsApp Enquiry
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>

        <div className="drawer-footer">
          <small>
            For urgent orders: Call{' '}
            <a href={COMPANY.phoneHref} className="link-highlight">{COMPANY.phone}</a> or WhatsApp{' '}
            <a href={`https://wa.me/${COMPANY.whatsappNumber}`} target="_blank" rel="noreferrer" className="link-highlight">
              {COMPANY.whatsappFormatted}
            </a>
          </small>
        </div>
      </aside>
    </div>
  );
}
