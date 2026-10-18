import type { ManufacturerId } from '@/lib/types';

export interface ManufacturerDetails {
  name: string;
  location: string;
  focus: string;
  badge: string;
}

export const MANUFACTURERS: Record<ManufacturerId, ManufacturerDetails> = {
  medikeen: {
    name: 'Medikeen Pharma',
    location: 'Multan Road, Lahore',
    focus: 'Vitamins, cranberry formulations, calcium & nutritional supplements',
    badge: 'cGMP Nutraceuticals',
  },
  medicom: {
    name: 'Medicom Superior',
    location: 'Muzammil Town, Lahore',
    focus: 'Hematinic iron bisglycinate formulas & wellness tablets',
    badge: 'Formulation Specialists',
  },
  eon: {
    name: 'Eon Pharmacy',
    location: 'New Korangi, Karachi',
    focus: 'Syrups, appetite stimulants & dietary supplements',
    badge: 'Liquid Oral Dosage',
  },
  elate: {
    name: 'Elate Pharma',
    location: 'Phase 2, Karachi',
    focus: 'Ginkgo biloba, Citicoline, CoQ10 & cognitive health',
    badge: 'Advanced Therapeutics',
  },
  bioserve: {
    name: 'Bio Serve Pharma',
    location: 'S.I.T.E., Karachi',
    focus: 'Calcium effervescent, pediatric & maternal health lines',
    badge: 'Nutritional Care',
  },
  lavenrose: {
    name: 'Laven Rose Cosmeceuticals',
    location: 'Dermatological Laboratory',
    focus: 'Medicated facewashes, whitening serums, shampoos & skin creams',
    badge: 'Cosmeceutical Line',
  },
  samphy: {
    name: 'Samphy Cosmetics',
    location: 'Personal Care Division',
    focus: 'Anti-scabies soaps, medicated topical lotions & antiseptic bars',
    badge: 'Targeted Topicals',
  },
  rasco: {
    name: 'Rasco Pharma',
    location: 'Raiwind Road, Lahore',
    focus: 'Hospital antibiotics, injectables, NSAIDs & prescription medicines',
    badge: 'Licensed Rx Facility',
  },
  paragon: {
    name: 'Paragon Healthcare (Medikeen)',
    location: 'Lahore',
    focus: 'Oral lozenges, herbal cough syrups & balms',
    badge: 'Herbal & OTC Care',
  },
  nutravelo: {
    name: 'Nutravelo',
    location: 'Karachi (Repacker)',
    focus: 'Pure B.P. Glycerin packaging & cosmetic emollients',
    badge: 'Repacking Partner',
  },
};
