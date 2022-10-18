import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { searchPhotosAPI, searchCategoriesAPI } from './searchPhotosAPI';

interface FavState {
  favedImages: any[];
}

const initialState: FavState = {
  favedImages: [],
};

export const favouriteslice = createSlice({
  name: 'favourite',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchingLocalStorage: (state) => {
      const savedImages = localStorage.getItem('fav-images');
      if (!savedImages) {
        state.favedImages = [];
        return;
      }
      state.favedImages = JSON.parse(savedImages);
    },
    addImgToFavReducer: (state, action) => {
      const checkDuplicity = state.favedImages.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (checkDuplicity) return;
      localStorage.setItem(
        'fav-images',
        JSON.stringify([...state.favedImages, action.payload])
        );
        state.favedImages = [...state.favedImages, action.payload];
    },
  },
});

export const { addImgToFavReducer, fetchingLocalStorage } =
  favouriteslice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default favouriteslice.reducer;
