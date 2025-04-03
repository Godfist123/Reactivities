export interface ChatComment {
  id: string;
  displayName: string;
  userId: string;
  body: string;
  createdAt: Date;
  imageUrl?: string;
}
