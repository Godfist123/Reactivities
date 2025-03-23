export interface User {
  sub: string;
  email: string;
  displayName?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  bio?: string;
  imageUrl?: string;
}
