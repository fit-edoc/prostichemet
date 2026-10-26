export type LeadStage = 'new' | 'researched' | 'generated' | 'contacted' | 'replied';

export interface CrmFilterState {
  searchQuery: string;
  stageFilter: LeadStage | 'all';
  sortBy: 'createdAt' | 'name' | 'company';
  sortOrder: 'asc' | 'desc';
}

export interface LeadStats {
  totalLeads: number;
  researchedCount: number;
  emailsGeneratedCount: number;
  contactedCount: number;
}
