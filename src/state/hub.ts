import { create } from "zustand";
import { defaultProfile, sampleListings, sampleRequirements } from "@/data/sample";
import type { Inquiry, Listing, Profile, Requirement } from "@/domain/types";

const STORAGE_KEY = "rental-hub.v1";

export interface HubData {
  profile: Profile;
  requirements: Requirement[];
  listings: Listing[];
  inquiries: Inquiry[];
}

function seed(): HubData {
  return {
    profile: { ...defaultProfile },
    requirements: sampleRequirements.map((item) => ({ ...item, additional: [...item.additional] })),
    listings: sampleListings.map((item) => ({ ...item, photos: [...item.photos] })),
    inquiries: [],
  };
}

interface HubState extends HubData {
  hydrated: boolean;
  storageError: string;
  hydrate: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  saveRequirement: (requirement: Requirement) => void;
  deleteRequirement: (id: string) => void;
  renewRequirement: (id: string) => void;
  saveListing: (listing: Listing) => void;
  deleteListing: (id: string) => void;
  renewListing: (id: string) => void;
  addInquiry: (inquiry: Inquiry) => void;
  deleteInquiry: (id: string) => void;
  resetRecords: () => void;
  eraseDevice: () => void;
}

function upsert<T extends { id: string }>(rows: T[], row: T): T[] {
  const index = rows.findIndex((item) => item.id === row.id);
  if (index === -1) return [row, ...rows];
  const next = rows.slice();
  next[index] = row;
  return next;
}

function persist(data: HubData): string {
  if (typeof window === "undefined") return "";
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return "";
  } catch {
    return "This device is out of space. Remove a photograph and try again.";
  }
}

function snapshot(state: HubState): HubData {
  return {
    profile: state.profile,
    requirements: state.requirements,
    listings: state.listings,
    inquiries: state.inquiries,
  };
}

export const useHub = create<HubState>((set, get) => ({
  ...seed(),
  hydrated: false,
  storageError: "",
  hydrate: () => {
    if (get().hydrated || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      const parsed = JSON.parse(raw) as Partial<HubData>;
      if (!parsed || !Array.isArray(parsed.listings) || !Array.isArray(parsed.requirements) || !parsed.profile) {
        set({ hydrated: true });
        return;
      }
      set({
        profile: { ...defaultProfile, ...parsed.profile },
        requirements: parsed.requirements,
        listings: parsed.listings,
        inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
        hydrated: true,
        storageError: "",
      });
    } catch {
      set({ hydrated: true, storageError: "Saved data could not be read. Demonstration records are showing." });
    }
  },
  updateProfile: (patch) => {
    const profile = { ...get().profile, ...patch };
    const error = persist({ ...snapshot(get()), profile });
    set({ profile, storageError: error });
  },
  saveRequirement: (requirement) => {
    const requirements = upsert(get().requirements, requirement);
    const error = persist({ ...snapshot(get()), requirements });
    set({ requirements, storageError: error });
  },
  deleteRequirement: (id) => {
    const requirements = get().requirements.filter((item) => item.id !== id);
    const error = persist({ ...snapshot(get()), requirements });
    set({ requirements, storageError: error });
  },
  renewRequirement: (id) => {
    const current = get().requirements.find((item) => item.id === id);
    if (!current || current.owner !== "me") return;
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 60);
    const requirements = upsert(get().requirements, {
      ...current,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: "active" as const,
    });
    const error = persist({ ...snapshot(get()), requirements });
    set({ requirements, storageError: error });
  },
  saveListing: (listing) => {
    const listings = upsert(get().listings, listing);
    const error = persist({ ...snapshot(get()), listings });
    set({ listings, storageError: error });
  },
  deleteListing: (id) => {
    const listings = get().listings.filter((item) => item.id !== id);
    const error = persist({ ...snapshot(get()), listings });
    set({ listings, storageError: error });
  },
  renewListing: (id) => {
    const current = get().listings.find((item) => item.id === id);
    if (!current || current.owner !== "me") return;
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 60);
    const listings = upsert(get().listings, {
      ...current,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: "active" as const,
    });
    const error = persist({ ...snapshot(get()), listings });
    set({ listings, storageError: error });
  },
  addInquiry: (inquiry) => {
    const inquiries = [inquiry, ...get().inquiries];
    const error = persist({ ...snapshot(get()), inquiries });
    set({ inquiries, storageError: error });
  },
  deleteInquiry: (id) => {
    const inquiries = get().inquiries.filter((item) => item.id !== id);
    const error = persist({ ...snapshot(get()), inquiries });
    set({ inquiries, storageError: error });
  },
  resetRecords: () => {
    const next = { ...snapshot(get()), requirements: seed().requirements, listings: seed().listings, inquiries: [] };
    const error = persist(next);
    set({ ...next, storageError: error });
  },
  eraseDevice: () => {
    const next = seed();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    set({ ...next, hydrated: true, storageError: "" });
  },
}));
