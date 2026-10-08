import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import icpReducer from './slices/icpSlice';
import crmReducer from './slices/crmSlice';
import uiReducer from './slices/uiSlice';
import ragReducer from './slices/ragSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    icp: icpReducer,
    crm: crmReducer,
    ui: uiReducer,
    rag: ragReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
