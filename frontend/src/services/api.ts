import { apiClient } from './apiClient';
import { User, Workspace, BusinessProfile, ICPProfile, ProspectLead, ColdEmail } from '../types';

export const authApi = {
  loginWithGoogle: (data: { idToken?: string; email?: string; name?: string; avatarUrl?: string; googleId?: string }) =>
    apiClient.post<{ token: string; user: User; workspace: Workspace }>('/auth/google', data),
  getMe: () => apiClient.get<{ user: User; workspace: Workspace; role: string }>('/auth/me'),
};

export const workspaceApi = {
  getWorkspaces: () => apiClient.get<Workspace[]>('/workspaces'),
  createWorkspace: (name: string) => apiClient.post<Workspace>('/workspaces', { name }),
};

export const profileApi = {
  getProfiles: () => apiClient.get<BusinessProfile[]>('/profiles'),
  getProfileById: (id: number) => apiClient.get<BusinessProfile>(`/profiles/${id}`),
  createProfile: (profile: Omit<BusinessProfile, 'id' | 'workspaceId' | 'createdAt'>) =>
    apiClient.post<BusinessProfile>('/profiles', profile),
};

export const icpApi = {
  getIcps: () => apiClient.get<ICPProfile[]>('/icps'),
  getIcpById: (id: number) => apiClient.get<ICPProfile>(`/icps/${id}`),
  generateIcp: (businessProfileId: number, autoDiscoverLeads = true, leadCount = 5) =>
    apiClient.post<{ icp: ICPProfile; discoveredLeads: ProspectLead[] }>('/icps/generate', {
      businessProfileId,
      autoDiscoverLeads,
      leadCount,
    }),
};

export const researchApi = {
  runResearch: (icpId: number, leadCount = 5) =>
    apiClient.post<{ leadsDiscovered: number; leads: ProspectLead[] }>('/research/run', {
      icpId,
      leadCount,
    }),
};

export const crmApi = {
  getAllLeads: () => apiClient.get<ProspectLead[]>('/crm/leads'),
  getLeadsByIcp: (icpId: number) => apiClient.get<ProspectLead[]>(`/crm/icp/${icpId}`),
  updateLeadStatus: (id: number, status: ProspectLead['status']) =>
    apiClient.patch<ProspectLead>(`/crm/prospect/${id}/status`, { status }),
};

export const emailApi = {
  generateEmail: (prospectId: number, framework = 'PAS') =>
    apiClient.post<ColdEmail & { personalizedTrigger?: string }>('/emails/generate', {
      prospectId,
      framework,
    }),
  getEmailsForProspect: (prospectId: number) =>
    apiClient.get<ColdEmail[]>(`/emails/prospect/${prospectId}`),
};
