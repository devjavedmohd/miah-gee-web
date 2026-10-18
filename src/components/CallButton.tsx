'use client';
import { COMPANY } from '@/data/company';
import { useEnquiry } from './EnquiryContext';
import { ClipboardList, MessageCircle, Phone } from 'lucide-react';

export default function CallButton() {
  const { totalCount, openDrawer } = useEnquiry();

  return (
    <div className="floating-actions-bar" aria-label="Quick Contact & Trade Floating Actions">
      {totalCount > 0 && (
        <button
          type="button"
          className="floating-btn floating-cart-btn"
          onClick={openDrawer}
          aria-label={`Open enquiry list with ${totalCount} items`}
        >
          <ClipboardList size={17} strokeWidth={2} />
          <span className="floating-text">Enquiry</span>
          <span className="floating-badge">{totalCount}</span>
        </button>
      )}

      <a
        className="floating-btn floating-wa-btn"
        href={`https://wa.me/${COMPANY.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp with trade desk"
      >
        <MessageCircle size={17} strokeWidth={2} />
        <span className="floating-text">WhatsApp</span>
      </a>

      <a
        className="floating-btn floating-call-btn"
        href={COMPANY.phoneHref}
        aria-label={`Call ${COMPANY.phone}`}
        title={`Call ${COMPANY.phone}`}
      >
        <Phone size={17} strokeWidth={2} />
        <span className="floating-text">Call Office</span>
      </a>
    </div>
  );
}
