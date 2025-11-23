// types/team.ts
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  expertise: string[];
  profile: {
    education: string[];
    experience: string[];
    memberships: string[];
    appointments: string[];
  };
}