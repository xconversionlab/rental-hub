import type { Inquiry, Listing, Profile, Requirement } from "@/domain/types";

/**
 * Port for a future Supabase project. This build does not call Supabase,
 * send OTP, or upload photographs to cloud storage.
 * Expired marketplace rows are marked unavailable locally. A production job
 * can delete expired listings and requirements. Do not delete profiles or
 * verification records without an approved retention policy.
 */
export interface MarketplaceBackend {
  readonly mode: "local" | "supabase";
  listListings(): Promise<Listing[]>;
  listRequirements(): Promise<Requirement[]>;
  saveListing(listing: Listing): Promise<void>;
  saveRequirement(requirement: Requirement): Promise<void>;
  deleteListing(id: string): Promise<void>;
  deleteRequirement(id: string): Promise<void>;
  saveProfile(profile: Profile): Promise<void>;
  saveInquiry(inquiry: Inquiry): Promise<void>;
}

export interface BackendStatus {
  connected: boolean;
  provider: string;
  planned: string;
  otp: "not-connected";
  photoStorage: "device-only";
}

export function backendStatus(): BackendStatus {
  return {
    connected: false,
    provider: "On this device",
    planned: "Supabase",
    otp: "not-connected",
    photoStorage: "device-only",
  };
}

export class SupabaseMarketplaceBackend implements MarketplaceBackend {
  readonly mode = "supabase" as const;

  constructor(private readonly _config: { url?: string; anonKey?: string } = {}) {}

  private unavailable(): never {
    throw new Error(
      this._config.url
        ? "Supabase credentials are present but this build does not connect yet."
        : "Supabase is not connected. Records stay on this device.",
    );
  }

  listListings(): Promise<Listing[]> {
    this.unavailable();
  }
  listRequirements(): Promise<Requirement[]> {
    this.unavailable();
  }
  saveListing(): Promise<void> {
    this.unavailable();
  }
  saveRequirement(): Promise<void> {
    this.unavailable();
  }
  deleteListing(): Promise<void> {
    this.unavailable();
  }
  deleteRequirement(): Promise<void> {
    this.unavailable();
  }
  saveProfile(): Promise<void> {
    this.unavailable();
  }
  saveInquiry(): Promise<void> {
    this.unavailable();
  }
}

export function createPlannedBackend(): MarketplaceBackend {
  return new SupabaseMarketplaceBackend();
}
