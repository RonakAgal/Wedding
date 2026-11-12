/**
 * TypeScript definitions for Himanshi & Gagan Royal Wedding Project
 */

export type CeremonyIconType =
  | 'ganpati'
  | 'kalash'
  | 'carnival'
  | 'dj'
  | 'mayra'
  | 'barat'
  | 'reception'
  | 'phere';

export interface WeddingEvent {
  id: string;
  title: string;
  hindiTitle: string;
  tagline: string;
  taglineEn?: string;
  date: string;
  dateEn?: string;
  time: string;
  timeEn?: string;
  venue: string;
  venueAddress: string;
  dressCode: string;
  dressCodeHindi: string;
  description: string;
  descriptionEn?: string;
  mapLink: string;
  image: string;
  bgImage?: string;
  iconType: CeremonyIconType;
}

export interface VenueDetails {
  name: string;
  address: string;
  city: string;
  mapLink: string;
  stayName: string;
  stayAddress: string;
  stayMapLink: string;
  stayImage: string;
  railway: string;
  busStand: string;
  airport: string;
  weather: string;
}

export interface FamilyDetails {
  groom: string;
  groomHindi: string;
  groomParents: string;
  groomParentsEn: string;
  bride: string;
  brideHindi: string;
  brideParents: string;
  brideParentsEn: string;
}

export interface GalleryMoment {
  title: string;
  hindi: string;
  image: string;
  caption: string;
}

export interface WishItem {
  id?: string;
  name: string;
  message: string;
  time: string;
  created_at?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

