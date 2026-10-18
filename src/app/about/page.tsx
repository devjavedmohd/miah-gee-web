import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import PrincipalsSection from '@/components/PrincipalsSection';

export const metadata: Metadata = {
  title: 'About Us | Miah Gee Distributor (Pvt) Ltd. Peshawar',
  description:
    'Learn about Miah Gee Distributor (Pvt) Ltd., our central distribution warehouse in Peshawar, and regional healthcare supply network.',
};

export default function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <div className="page-hero-banner">
        <div className="w">
          <span className="section-eyebrow">Company Profile</span>
          <h1 className="page-title">About Miah Gee Distributor</h1>
          <p className="page-desc">
            Reliable, timely pharmaceutical and healthcare distribution originating from Peshawar's central Nishtarabad Road commercial district.
          </p>
        </div>
      </div>

      <AboutSection />
      <PrincipalsSection />
    </div>
  );
}
