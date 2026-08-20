import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProspectLead, ColdEmail } from '../../types';
import { crmApi, emailApi, researchApi } from '../../services/api';

interface CRMState {
  leads: ProspectLead[];
  selectedLead: ProspectLead | null;
  activeColdEmail: (ColdEmail & { personalizedTrigger?: string }) | null;
  isLoading: boolean;
  isGeneratingEmail: boolean;
  isResearching: boolean;
  filterStatus: string;
  error: string | null;
}

const initialState: CRMState = {
  leads: [],
  selectedLead: null,
  activeColdEmail: null,
  isLoading: false,
  isGeneratingEmail: false,
  isResearching: false,
  filterStatus: 'ALL',
  error: null,
};

export const fetchAllLeads = createAsyncThunk(
  'crm/fetchAllLeads',
  async (_, { rejectWithValue }) => {
    try {
      const data = await crmApi.getAllLeads();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  'crm/updateLeadStatus',
  async ({ id, status }: { id: number; status: ProspectLead['status'] }, { rejectWithValue }) => {
    try {
      const data = await crmApi.updateLeadStatus(id, status);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const generateLeadColdEmail = createAsyncThunk(
  'crm/generateLeadColdEmail',
  async ({ prospectId, framework = 'PAS' }: { prospectId: number; framework?: string }, { rejectWithValue }) => {
    try {
      const data = await emailApi.generateEmail(prospectId, framework);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const runCustomResearch = createAsyncThunk(
  'crm/runCustomResearch',
  async ({ icpId, leadCount = 5 }: { icpId: number; leadCount?: number }, { rejectWithValue }) => {
    try {
      const data = await researchApi.runResearch(icpId, leadCount);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setSelectedLead: (state, action: PayloadAction<ProspectLead | null>) => {
      state.selectedLead = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    clearActiveColdEmail: (state) => {
      state.activeColdEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllLeads
      .addCase(fetchAllLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = action.payload;
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // updateLeadStatus
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const index = state.leads.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
        if (state.selectedLead?.id === action.payload.id) {
          state.selectedLead = action.payload;
        }
      })
      // generateLeadColdEmail
      .addCase(generateLeadColdEmail.pending, (state) => {
        state.isGeneratingEmail = true;
      })
      .addCase(generateLeadColdEmail.fulfilled, (state, action) => {
        state.isGeneratingEmail = false;
        state.activeColdEmail = action.payload;
      })
      .addCase(generateLeadColdEmail.rejected, (state, action) => {
        state.isGeneratingEmail = false;
        state.error = action.payload as string;
      })
      // runCustomResearch
      .addCase(runCustomResearch.pending, (state) => {
        state.isResearching = true;
      })
      .addCase(runCustomResearch.fulfilled, (state, action) => {
        state.isResearching = false;
        state.leads = [...action.payload.leads, ...state.leads];
      })
      .addCase(runCustomResearch.rejected, (state, action) => {
        state.isResearching = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedLead, setFilterStatus, clearActiveColdEmail } = crmSlice.actions;
export default crmSlice.reducer;
