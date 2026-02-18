// types/team.ts
export interface TeamT {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  image?: string;
  image2?: string;
  expertise: string[];
  profile: {
    education: string[];
    experience: string[];
    memberships: string[];
    appointments: string[];
  };
}