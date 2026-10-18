import type { CategoryId } from '@/lib/types';

export interface CategoryInfo {
  name: string;
  shortDesc: string;
  icon: string;
  sampleItems: string[];
}

export const CATEGORIES: Record<CategoryId, string> = {
  vitamins: 'Vitamins & Minerals',
  blood: 'Blood & Iron',
  bones: 'Bones & Calcium',
  women: 'Women’s Health',
  brain: 'Brain, Heart & Nerve',
  digestive: 'Digestive & Appetite',
  respiratory: 'Cough, Cold & Urinary',
  skin: 'Skin & Hair Care',
  rx: 'Rx Range (Trade Only)',
};

export const CATEGORY_DETAILS: Record<CategoryId, CategoryInfo> = {
  vitamins: {
    name: 'Vitamins & Minerals',
    shortDesc: 'Multivitamins, effervescent tablets, vitamin C, zinc and daily defense',
    icon: '⚡',
    sampleItems: ['Medivit', 'Zolvit', 'Filvit-M', 'Vit-One', 'Laven-C', 'Keen-1000'],
  },
  blood: {
    name: 'Blood & Iron',
    shortDesc: 'Gentle iron bisglycinate, folic acid complexes and hematinic syrups',
    icon: '🩸',
    sampleItems: ['Iro-Cena', 'Folvit-E', 'Instofer'],
  },
  bones: {
    name: 'Bones & Calcium',
    shortDesc: 'Calcium carbonate, Vitamin D3, magnesium and bone mineralization formulas',
    icon: '🦴',
    sampleItems: ['Cal-Best', 'CalBoost', 'Plaz-Cal', 'BS-Cal', 'Skyed', 'Miro-D3'],
  },
  women: {
    name: 'Women’s Health',
    shortDesc: 'Maternal nutrition, inositol, pregnancy care and herbal wellness',
    icon: '🌸',
    sampleItems: ['Maco-F', 'Me-Fol', 'Myofol', 'Licorin', 'Rose A', 'Mama Supplement'],
  },
  brain: {
    name: 'Brain, Heart & Nerve',
    shortDesc: 'Ginkgo biloba, CoQ10, Citicoline, Omega-3 fatty acids and nerve tonics',
    icon: '🧠',
    sampleItems: ['Ginko-X', 'Citotex', 'EN-Q', 'Magnizen', 'Omiwell'],
  },
  digestive: {
    name: 'Digestive & Appetite',
    shortDesc: 'Antacids, carminative syrups, dietary fiber and appetite stimulants',
    icon: '🍃',
    sampleItems: ['Mint Kash', 'K-Cid', 'FiberLax', 'Apgar'],
  },
  respiratory: {
    name: 'Cough, Cold & Urinary',
    shortDesc: 'Cranberry extracts, herbal cough syrups, decongestant balms and lozenges',
    icon: '🫁',
    sampleItems: ['Kuflan', 'Cuftab Plus', 'Mavik Balm', 'Max Cran', 'Luti-B'],
  },
  skin: {
    name: 'Skin & Hair Care',
    shortDesc: 'Medicated facewashes, scabies lotions, anti-dandruff shampoos, serums & soaps',
    icon: '🧴',
    sampleItems: ['Laven Rose Range', 'Scabest Lotion & Soap', 'GT-Rin Plus', 'Pure Glycerin'],
  },
  rx: {
    name: 'Rx Range (Trade Only)',
    shortDesc: 'Rasco Pharma antibiotics, analgesics, NSAIDs, antihistamines and injectables',
    icon: '🏥',
    sampleItems: ['Cefico', 'Cip-Rx', 'Bactiphin', 'Tomdol', 'Prisma', 'Rasbid'],
  },
};
