import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { KnowledgeDocument, ScrapedCompanyProfile } from '../../types';
import { ragApi } from '../../services/api';

interface RagState {
  knowledgeDocs: KnowledgeDocument[];
  isLoadingKnowledge: boolean;
  isScraping: boolean;
  isIngesting: boolean;
  lastScrapedProfile: ScrapedCompanyProfile | null;
  error: string | null;
  successMessage: string | null;
}

const initialState: RagState = {
  knowledgeDocs: [],
  isLoadingKnowledge: false,
  isScraping: false,
  isIngesting: false,
  lastScrapedProfile: null,
  error: null,
  successMessage: null,
};

export const fetchKnowledge = createAsyncThunk(
  'rag/fetchKnowledge',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ragApi.getKnowledge();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const scrapeAndIngest = createAsyncThunk(
  'rag/scrapeAndIngest',
  async ({ url, companyName }: { url: string; companyName?: string }, { rejectWithValue }) => {
    try {
      const res = await ragApi.scrapeAndIngest(url, companyName);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const scrapePreview = createAsyncThunk(
  'rag/scrapePreview',
  async (url: string, { rejectWithValue }) => {
    try {
      const res = await ragApi.scrapePreview(url);
      return res.profile;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteKnowledge = createAsyncThunk(
  'rag/deleteKnowledge',
  async (id: number, { rejectWithValue }) => {
    try {
      await ragApi.deleteKnowledge(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const ragSlice = createSlice({
  name: 'rag',
  initialState,
  reducers: {
    clearRagMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearScrapedProfile: (state) => {
      state.lastScrapedProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchKnowledge
      .addCase(fetchKnowledge.pending, (state) => {
        state.isLoadingKnowledge = true;
        state.error = null;
      })
      .addCase(fetchKnowledge.fulfilled, (state, action) => {
        state.isLoadingKnowledge = false;
        state.knowledgeDocs = action.payload;
      })
      .addCase(fetchKnowledge.rejected, (state, action) => {
        state.isLoadingKnowledge = false;
        state.error = action.payload as string;
      })
      // scrapeAndIngest
      .addCase(scrapeAndIngest.pending, (state) => {
        state.isIngesting = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(scrapeAndIngest.fulfilled, (state, action) => {
        state.isIngesting = false;
        state.lastScrapedProfile = action.payload.extractedData;
        state.successMessage = `Scraped & ingested ${action.payload.chunksIngested} vector chunks into RAG Knowledge Base.`;
        if (action.payload.chunks) {
          state.knowledgeDocs.unshift(...action.payload.chunks);
        }
      })
      .addCase(scrapeAndIngest.rejected, (state, action) => {
        state.isIngesting = false;
        state.error = action.payload as string;
      })
      // scrapePreview
      .addCase(scrapePreview.pending, (state) => {
        state.isScraping = true;
        state.error = null;
      })
      .addCase(scrapePreview.fulfilled, (state, action) => {
        state.isScraping = false;
        state.lastScrapedProfile = action.payload;
        state.successMessage = `Successfully analyzed website & extracted company profile!`;
      })
      .addCase(scrapePreview.rejected, (state, action) => {
        state.isScraping = false;
        state.error = action.payload as string;
      })
      // deleteKnowledge
      .addCase(deleteKnowledge.fulfilled, (state, action) => {
        state.knowledgeDocs = state.knowledgeDocs.filter(d => d.id !== action.payload);
      });
  },
});

export const { clearRagMessages, clearScrapedProfile } = ragSlice.actions;
export default ragSlice.reducer;
