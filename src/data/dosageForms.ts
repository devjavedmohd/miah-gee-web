import type { DosageFormId, Product } from '@/lib/types';

export const DOSAGE_FORMS: Record<DosageFormId, { label: string; iconName: string }> = {
  tablets: { label: 'Tablets', iconName: 'Pill' },
  syrup: { label: 'Syrups & Liquids', iconName: 'FlaskConical' },
  capsules: { label: 'Capsules', iconName: 'Pill' },
  sachets: { label: 'Sachets', iconName: 'Mail' },
  softgels: { label: 'Softgels', iconName: 'Droplet' },
  drops: { label: 'Drops', iconName: 'Droplets' },
  topical: { label: 'Creams & Topicals', iconName: 'Sparkles' },
  'personal-care': { label: 'Personal & Hair Care', iconName: 'HeartHandshake' },
  injections: { label: 'Injections', iconName: 'Syringe' },
};

export function inferDosageForm(p: Product): DosageFormId {
  if (p.dosageForm) return p.dosageForm;
  const s = `${p.name} ${p.pack}`.toLowerCase();
  if (s.includes('injection')) return 'injections';
  if (s.includes('syrup') || s.includes('suspension') || s.includes('elixir') || s.includes('oral solution')) return 'syrup';
  if (s.includes('softgel')) return 'softgels';
  if (s.includes('sachet')) return 'sachets';
  if (s.includes('drop')) return 'drops';
  if (s.includes('tablet') || s.includes('lozenges') || s.includes('tab')) return 'tablets';
  if (s.includes('capsule') || s.includes('cap')) return 'capsules';
  if (s.includes('cream') || s.includes('lotion') || s.includes('ointment') || s.includes('balm') || s.includes('gel') || s.includes('serum') || s.includes('sunblock')) {
    return 'topical';
  }
  if (s.includes('soap') || s.includes('powder') || s.includes('shampoo') || s.includes('wash') || s.includes('glycerin') || s.includes('oil')) {
    return 'personal-care';
  }
  if (p.category === 'rx') {
    if (s.includes('suspension')) return 'syrup';
    if (s.includes('injection')) return 'injections';
    if (s.includes('capsule')) return 'capsules';
    return 'tablets';
  }
  return 'tablets';
}
