import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICPProfile, ProspectLead } from '../../types';
import { icpApi } from '../../services/api';

interface ICPState {
  icps: ICPProfile[];
  activeIcp: ICPProfile | null;
  latestDiscoveredLeads: ProspectLead[];
  isGenerating: boolean;
  error: string | null;
}

const initialState: ICPState = {
  icps: [],
  activeIcp: null,
  latestDiscoveredLeads: [],
  isGenerating: false,
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
      .addCase(fetchIcps.fulfilled, (state, action) => {
        state.icps = action.payload;
        if (action.payload.length > 0 && !state.activeIcp) {
          state.activeIcp = action.payload[0];
        }
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
