import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { searchPhotosAPI, searchCategoriesAPI } from './searchPhotosAPI';

interface FavState {
  favedImages: any[];
  tags: any[];
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
}

const initialState: FavState = {
  favedImages: [],
  tags: [],
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    fetchingLocalStorage: (state) => {
      const savedImages = localStorage.getItem('fav-images');
      if (!savedImages) {
        state.favedImages = [];
        return;
      }
      const parsedImages: PhotoObj[] = JSON.parse(savedImages);
      const favedTags = [...state.tags];
      parsedImages.forEach((imgObj) => {
        imgObj.tags &&
          imgObj.tags.forEach((tag) => {
            const checker = favedTags.includes(tag);
            if (!checker) favedTags.push(tag);
          });
      });
      state.tags = favedTags;
      state.favedImages = parsedImages;
    },
    addImgToFavReducer: (state, action) => {
      localStorage.setItem(
        'fav-images',
        JSON.stringify([...state.favedImages, action.payload])
      );

      const favedTags = [...state.tags];
      action.payload.tags &&
        action.payload.tags.forEach((tag: any[]) => {
          const checker = favedTags.includes(tag);
          if (!checker) favedTags.push(tag);
        });
      state.tags = favedTags;
      state.favedImages = [...state.favedImages, action.payload];
    },
    deleteFavedImgReducer: (state, action) => {
      const newArr = state.favedImages.filter(
        (img) => img.id !== action.payload
      );
      localStorage.setItem('fav-images', JSON.stringify(newArr));
      state.favedImages = newArr;
    },
    updateImgDescription: (state, action) => {
      const favedArray = [...state.favedImages];
      const indexTarget = favedArray.findIndex(
        (obj) => obj.id === action.payload.id
      );
      favedArray[indexTarget].description = action.payload.description;
      localStorage.setItem('fav-images', JSON.stringify(favedArray));
      state.favedImages = favedArray;
    },
  },
});

export const {
  addImgToFavReducer,
  fetchingLocalStorage,
  deleteFavedImgReducer,
  updateImgDescription,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
