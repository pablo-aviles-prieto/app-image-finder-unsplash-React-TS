import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { searchPhotosAPI, searchCategoriesAPI } from './searchPhotosAPI';

interface ModalState {
  imgToDisplay: PhotoObj;
  url: string;
  modalState: boolean;
  description: boolean;
}

export interface PhotoObj {
  id: string;
  description: string | undefined;
  width: string;
  height: string;
  likes: number;
  urls: {
    full: string;
    small: string;
    thumb: string;
  };
  tags: string[];
  author: {
    name: string | null;
    link: string | null;
  };
  download: string;
  timeSaved: string;
  timeString: string;
}

const initialState: ModalState = {
  imgToDisplay: {
    id: '',
    description: '',
    width: '',
    height: '',
    likes: 0,
    urls: { full: '', small: '', thumb: '' },
    tags: [''],
    author: { name: '', link: '' },
    download: '',
    timeSaved: '',
    timeString: '',
  },
  url: '',
  modalState: false,
  description: true,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    switchModalStateReducer: (state) => {
      state.modalState = !state.modalState;
    },
    addPhotoModalReducer: (state, action) => {
      state.imgToDisplay = action.payload.imgToDisplay;
      state.url = action.payload.url;
      state.modalState = action.payload.state;
    },
    setTrueDescriptionReducer: (state) => {
      state.description = true;
    },
    setFalseDescriptionReducer: (state) => {
      state.description = false;
    },
  },
});

export const {
  switchModalStateReducer,
  addPhotoModalReducer,
  setTrueDescriptionReducer,
  setFalseDescriptionReducer,
} = modalSlice.actions;

export default modalSlice.reducer;
