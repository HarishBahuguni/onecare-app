export type Role = "admin" | "reception" | "physio";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: Role;
}
