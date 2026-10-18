export type CategoryId =
  | 'vitamins' | 'blood' | 'bones' | 'women' | 'brain'
  | 'digestive' | 'respiratory' | 'skin' | 'rx';

export type ManufacturerId =
  | 'medikeen' | 'medicom' | 'eon' | 'elate' | 'bioserve'
  | 'lavenrose' | 'samphy' | 'rasco' | 'paragon' | 'nutravelo';

export type DosageFormId =
  | 'tablets'
  | 'syrup'
  | 'capsules'
  | 'sachets'
  | 'softgels'
  | 'drops'
  | 'topical'
  | 'personal-care'
  | 'injections';

export interface Product {
  id: number;
  slug: string;
  name: string;
  pack: string; // pack size, or generic name for Rx items
  category: CategoryId;
  manufacturer: ManufacturerId;
  image: string;
  rx?: boolean;
  dosageForm?: DosageFormId;
  tagline?: string;
  indications?: string[];
  usage?: string;
  benefits?: string[];
}

export interface EnquiryProductItem {
  id: number;
  name: string;
  pack: string;
  category: CategoryId;
  image: string;
}
