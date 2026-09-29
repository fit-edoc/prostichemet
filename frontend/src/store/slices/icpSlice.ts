import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICPProfile, ProspectLead } from '../../types';
import { icpApi } from '../../services/api';

interface ICPState {
  icps: ICPProfile[];
  activeIcp: ICPProfile | null;
  latestDiscoveredLeads: ProspectLead[];
  isGenerating: boolean;
  isLoading: boolean;
  hasLoaded: boolean;
  error: string | null;
}

const initialState: ICPState = {
  icps: [],
  activeIcp: null,
  latestDiscoveredLeads: [],
  isGenerating: false,
  isLoading: false,
  hasLoaded: false,
  error: null,
};

export const fetchIcps = createAsyncThunk(
  'icp/fetchIcps',
  async (_, { rejectWithValue }) => {
    try {
      const data = await icpApi.getIcps();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { icp } = getState() as { icp: ICPState };
      if (icp.isLoading || icp.hasLoaded) {
        return false;
      }
    },
  }
);

export const generateIcpWithRAG = createAsyncThunk(
  'icp/generateIcpWithRAG',
  async ({ profileId, autoDiscover = true, leadCount = 5 }: { profileId: number; autoDiscover?: boolean; leadCount?: number }, { rejectWithValue }) => {
    try {
      const data = await icpApi.generateIcp(profileId, autoDiscover, leadCount);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const icpSlice = createSlice({
  name: 'icp',
  initialState,
  reducers: {
    setActiveIcp: (state, action: PayloadAction<ICPProfile>) => {
      state.activeIcp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIcps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIcps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasLoaded = true;
        state.icps = action.payload;
        if (action.payload.length > 0 && !state.activeIcp) {
          state.activeIcp = action.payload[0];
        }
      })
      .addCase(fetchIcps.rejected, (state, action) => {
        state.isLoading = false;
        state.hasLoaded = true;
        state.error = action.payload as string;
      })
      .addCase(generateIcpWithRAG.pending, (state) => {
        state.isGenerating = true;
        state.error = null;
      })
      .addCase(generateIcpWithRAG.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.icps.unshift(action.payload.icp);
        state.activeIcp = action.payload.icp;
        state.latestDiscoveredLeads = action.payload.discoveredLeads;
      })
      .addCase(generateIcpWithRAG.rejected, (state, action) => {
        state.isGenerating = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveIcp } = icpSlice.actions;
export default icpSlice.reducer;
