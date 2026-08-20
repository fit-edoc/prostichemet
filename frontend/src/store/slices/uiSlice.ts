import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  isEmailDrawerOpen: boolean;
  isResearchModalOpen: boolean;
  toastMessage: string | null;
}

const initialState: UIState = {
  theme: 'dark',
  isEmailDrawerOpen: false,
  isResearchModalOpen: false,
  toastMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', state.theme);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },
    setEmailDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isEmailDrawerOpen = action.payload;
    },
    setResearchModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isResearchModalOpen = action.payload;
    },
    showToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setEmailDrawerOpen,
  setResearchModalOpen,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
