import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, Workspace } from '../../types';
import { authApi } from '../../services/api';

interface AuthState {
  user: User | null;
  workspace: Workspace | null;
  token: string | null;
  isLoading: boolean;
  hasLoaded: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  workspace: null,
  token: null,
  isLoading: false,
  hasLoaded: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (payload: { idToken?: string; email?: string; name?: string; avatarUrl?: string; googleId?: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.loginWithGoogle(payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('postrichly_token', data.token);
        localStorage.setItem('postrichment_token', data.token);
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getMe();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user session');
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState() as { auth: AuthState };
      if (auth.isLoading || (auth.hasLoaded && auth.user)) {
        return false;
      }
    },
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeToken: (state) => {
      if (typeof window !== 'undefined') {
        state.token = localStorage.getItem('postrichly_token') || localStorage.getItem('postrichment_token');
      }
    },
    logout: (state) => {
      state.user = null;
      state.workspace = null;
      state.token = null;
      state.hasLoaded = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('postrichly_token');
        localStorage.removeItem('postrichment_token');
      }
    },
    setActiveWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginWithGoogle
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasLoaded = true;
        state.user = action.payload.user;
        state.workspace = action.payload.workspace;
        state.token = action.payload.token;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasLoaded = true;
        state.user = action.payload.user;
        state.workspace = action.payload.workspace;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasLoaded = true;
        state.error = action.payload as string;
        const msg = (action.payload as string) || '';
        if (msg.includes('401') || msg.toLowerCase().includes('unauthorized') || msg.toLowerCase().includes('invalid token')) {
          state.user = null;
          state.token = null;
          if (typeof window !== 'undefined') {
            localStorage.removeItem('postrichly_token');
            localStorage.removeItem('postrichment_token');
          }
        }
      });
  },
});

export const { initializeToken, logout, setActiveWorkspace } = authSlice.actions;
export default authSlice.reducer;
