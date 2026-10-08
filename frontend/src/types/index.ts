// Core TypeScript Data Models

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  googleId?: string | null;
}

export interface Workspace {
  id: number;
  name: string;
  ownerId?: number | null;
  role?: string;
  createdAt?: string;
}

export interface BusinessProfile {
  id: number;
  workspaceId: number;
  companyName: string;
  industry?: string | null;
  valueProposition: string;
  productDescription: string;
  targetAudience?: string | null;
  typicalCustomer?: string | null;
  typicalDealSize?: string | null;
  region?: string | null;
  createdAt?: string;
}

export interface ICPProfile {
  id: number;
  workspaceId: number;
  businessProfileId: number;
  title: string;
  targetIndustries: string[];
  targetRoles: string[];
  companySize: string[];
  painPoints: string[];
  criteria?: any;
  createdAt?: string;
}

export interface LeadEvidence {
  trigger?: string;
  painPointMatch?: string;
  reason?: string;
}

export interface ProspectLead {
  id: number;
  workspaceId: number;
  icpProfileId: number;
  companyName: string;
  ownerName?: string | null;
  companySize?: string | null;
  industry?: string | null;
  location?: string | null;
  websiteLink?: string | null;
  contactName?: string | null;
  contactTitle?: string | null;
  contactEmail?: string | null;
  contactLinkedin?: string | null;
  evidence?: LeadEvidence | null;
  signals?: string[] | null;
  status: 'New' | 'Contacted' | 'Qualified' | 'Meeting Booked' | 'Replied' | 'Unresponsive';
  score: number;
  createdAt?: string;
}

export interface ColdEmail {
  id: number;
  workspaceId: number;
  prospectId: number;
  icpProfileId?: number | null;
  subject: string;
  body: string;
  framework: string;
  status: 'Draft' | 'Approved' | 'Sent' | 'Replied';
  sentAt?: string | null;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: any;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

export interface KnowledgeDocument {
  id: number;
  workspaceId?: number | null;
  category: string;
  title: string;
  content: string;
  metadata?: any;
  createdAt: string;
}

export interface ScrapedCompanyProfile {
  companyName: string;
  industry: string;
  valueProposition: string;
  productDescription: string;
  targetAudience: string;
  region: string;
  typicalDealSize?: string;
  keyOfferings?: string[];
  evidenceQuotes?: string[];
}

