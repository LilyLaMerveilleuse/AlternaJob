export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  level: string;
  field: string;
  cv?: string;
  coverLetter?: string;
  additionalInfo?: string;
  skills?: string[];
  experience?: string;
  projects?: string;
  languages?: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  size: string;
  website: string;
  description: string;
}

export interface Offer {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  type: 'alternance' | 'stage';
  duration: string;
  location: string;
  description: string;
  requirements: string;
  postedDate: string;
  salary?: string;
}

export interface ContactedCompany {
  id: string;
  companyName: string;
  contactDate: string;
  status: 'pending' | 'replied' | 'rejected' | 'accepted';
  offerTitle?: string;
}

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  level: string;
  field: string;
  location: string;
  skills: string[];
  experience: string;
  projects?: string;
  languages?: string;
  lookingFor: 'alternance' | 'stage' | 'both';
  availability: string;
  photo?: string;
}
