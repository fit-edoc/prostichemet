import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BusinessProfile } from '../../types';
import { profileApi } from '../../services/api';

interface ProfileState {
  profiles: BusinessProfile[];
  activeProfile: BusinessProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  activeProfile: null,
  isLoading: false,
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  'profile/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await profileApi.getProfiles();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createBusinessProfile = createAsyncThunk(
  'profile/createBusinessProfile',
  async (profile: Omit<BusinessProfile, 'id' | 'workspaceId' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const data = await profileApi.createProfile(profile);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveProfile: (state, action: PayloadAction<BusinessProfile>) => {
      state.activeProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        if (action.payload.length > 0 && !state.activeProfile) {
          state.activeProfile = action.payload[0];
        }
      })
      .addCase(createBusinessProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBusinessProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profiles.unshift(action.payload);
        state.activeProfile = action.payload;
      })
      .addCase(createBusinessProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveProfile } = profileSlice.actions;
export default profileSlice.reducer;
