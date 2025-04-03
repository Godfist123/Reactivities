export interface Profile {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
}
