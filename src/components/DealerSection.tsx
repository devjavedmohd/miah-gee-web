'use client';
import { useState, type FormEvent } from 'react';
import { COMPANY, getWhatsAppUrl } from '@/data/company';
import { TrendingUp, Truck, ShieldCheck, Users, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function DealerSection() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    city: '',
    area: '',
    licenseNumber: '',
    businessType: 'Retail Pharmacy',
    productLines: 'Full Portfolio (Supplements & Derma)',
    monthlyVolume: 'PKR 100,000 - 300,000',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildWhatsAppDealerMessage = () => {
    return (
      `*DEALER & RETAILER REGISTRATION APPLICATION*\n` +
      `*Company:* ${COMPANY.name}\n\n` +
      `*Pharmacy / Business:* ${formData.businessName || 'N/A'}\n` +
      `*Contact Person:* ${formData.contactPerson || 'N/A'}\n` +
      `*Business Type:* ${formData.businessType}\n` +
      `*City / Area:* ${formData.city} (${formData.area || 'Main Market'})\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Drug License / NTN:* ${formData.licenseNumber || 'Under Renewal / Available on Request'}\n` +
      `*Product Focus:* ${formData.productLines}\n` +
      `*Est. Monthly Volume:* ${formData.monthlyVolume}\n\n` +
      (formData.notes ? `*Comments:* ${formData.notes}\n\n` : '') +
      `_Requested partnership terms and distributor catalogue_`
    );
  };

  const handleSendWhatsApp = () => {
    if (!formData.businessName || !formData.phone || !formData.city) {
      alert('Please enter at least your Pharmacy name, phone number, and city.');
      return;
    }
    const url = getWhatsAppUrl(buildWhatsAppDealerMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.contactPerson,
          business: formData.businessName,
          city: `${formData.city} (${formData.area})`,
          phone: formData.phone,
          type: `Dealer Registration - ${formData.businessType}`,
          message: `Drug License: ${formData.licenseNumber} | Est Volume: ${formData.monthlyVolume} | Interest: ${formData.productLines} | Notes: ${formData.notes}`,
          products: ['Full Dealer Registration'],
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="dealer" className="dealer-section section-padded alt-bg">
      <div className="w">
        <div className="section-header-center">
          <span className="section-eyebrow">Partnership Program</span>
          <h2 className="section-title">Become an Authorized Dealer / Retailer</h2>
          <p className="section-subtitle">
            Partner with {COMPANY.name} for consistent supply margins, verified quality products, and dedicated field representative support across KP and beyond.
          </p>
        </div>

        <div className="dealer-layout-grid">
          <div className="dealer-benefits-card">
            <h3>Why Partner With Miah Gee?</h3>
            <ul className="dealer-benefits-list">
              <li>
                <div className="benefit-icon-lucide"><TrendingUp size={20} strokeWidth={2} /></div>
                <div>
                  <b>Attractive Trade Margins:</b> Competitive wholesale pricing and promotional support designed to maximize retailer profitability.
                </div>
              </li>
              <li>
                <div className="benefit-icon-lucide"><Truck size={20} strokeWidth={2} /></div>
                <div>
                  <b>Fast Delivery Network:</b> Reliable daily supply lines across Peshawar, Mardan, Swat, Kohat, and adjacent divisions.
                </div>
              </li>
              <li>
                <div className="benefit-icon-lucide"><ShieldCheck size={20} strokeWidth={2} /></div>
                <div>
                  <b>Authenticity Guarantee:</b> 100% genuine products sourced directly from authorized cGMP manufacturing facilities.
                </div>
              </li>
              <li>
                <div className="benefit-icon-lucide"><Users size={20} strokeWidth={2} /></div>
                <div>
                  <b>Field Sales Rep Support:</b> Dedicated territory managers who assist with sampling, stock rotation, and customer queries.
                </div>
              </li>
            </ul>

            <div className="dealer-callout-box">
              <div className="callout-icon-lucide"><Phone size={22} strokeWidth={2} /></div>
              <div>
                <b>Direct Trade Inquiries:</b>
                <p>Have an urgent requirement? Speak with our Peshawar commercial team directly at <a href={COMPANY.phoneHref} className="link-highlight">{COMPANY.phone}</a>.</p>
              </div>
            </div>
          </div>

          <div className="dealer-form-card">
            {status === 'success' ? (
              <div className="form-success-message">
                <div className="success-badge">
                  <CheckCircle2 size={32} strokeWidth={2} />
                </div>
                <h3>Registration Submitted!</h3>
                <p>
                  Thank you, <b>{formData.contactPerson || formData.businessName}</b>. Our business development team will review your pharmacy credentials and contact you within 24 business hours with our trade terms and wholesale pricing matrix.
                </p>
                <div className="mt-4 flex-buttons-wrap">
                  <button className="btn btn-whatsapp flex-inline-icon" onClick={handleSendWhatsApp}>
                    <MessageCircle size={16} strokeWidth={2} /> Connect with Trade Rep on WhatsApp
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        businessName: '',
                        contactPerson: '',
                        phone: '',
                        city: '',
                        area: '',
                        licenseNumber: '',
                        businessType: 'Retail Pharmacy',
                        productLines: 'Full Portfolio (Supplements & Derma)',
                        monthlyVolume: 'PKR 100,000 - 300,000',
                        notes: '',
                      });
                    }}
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="dealer-app-form">
                <div className="form-row-two">
                  <div className="form-field">
                    <label>Pharmacy / Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      placeholder="e.g. Al-Shifa Pharmacy"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Contact Person &amp; Title *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      placeholder="e.g. Dr. Salman (Proprietor)"
                      value={formData.contactPerson}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>City / District *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Peshawar, Mardan, Swat"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Market / Specific Area</label>
                    <input
                      type="text"
                      name="area"
                      placeholder="e.g. Nishtarabad, Saddar, Dabgari"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Drug Sale License (DSL) / NTN</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      placeholder="e.g. DSL-2024-KPK-1234"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label>Business Classification</label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange}>
                      <option>Retail Pharmacy</option>
                      <option>Wholesale Medicine Dealer</option>
                      <option>Hospital / Clinic Pharmacy</option>
                      <option>Cosmetics &amp; Personal Care Store</option>
                      <option>Medical Practitioner / Doctor</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Estimated Monthly Purchasing</label>
                    <select name="monthlyVolume" value={formData.monthlyVolume} onChange={handleChange}>
                      <option>Under PKR 100,000</option>
                      <option>PKR 100,000 - 300,000</option>
                      <option>PKR 300,000 - 1,000,000</option>
                      <option>PKR 1,000,000+</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Primary Portfolio Interest</label>
                  <select name="productLines" value={formData.productLines} onChange={handleChange}>
                    <option>Full Portfolio (Nutraceuticals, Derma &amp; Rx)</option>
                    <option>Nutraceuticals, Vitamins &amp; Minerals</option>
                    <option>Laven Rose &amp; Derma Skincare</option>
                    <option>Hospital / Rasco Pharma Rx Products</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Any specific questions or products requested</label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Tell us about your distribution requirements..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <div className="error-alert">
                    Failed to submit online application. Please connect directly via WhatsApp or telephone {COMPANY.phone}.
                  </div>
                )}

                <div className="form-buttons-row">
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Submitting Application...' : 'Register as Dealer'}
                  </button>
                  <button type="button" className="btn btn-whatsapp flex-inline-icon" onClick={handleSendWhatsApp}>
                    <MessageCircle size={16} strokeWidth={2} /> Send via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
