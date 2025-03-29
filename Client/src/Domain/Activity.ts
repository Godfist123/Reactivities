import { Profile } from "./Profile";

export interface IActivity {
  id: string; // UUID (Guid)
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  date: string; // ISO 8601 date format
  isCancelled: boolean;
  latitude: number;
  longitude: number;
  attendees: Profile[];
  isGoing: boolean;
  isHost: boolean;
  hostId: string;
  hostDisplayName: string;
  hostImageUrl: string;
}
