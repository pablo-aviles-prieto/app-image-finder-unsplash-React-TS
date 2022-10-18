import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from '../components/store/searchSlice';
import favouriteReducers from '../components/store/favouriteSlice';
import modalReducer from '../components/store/modalSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favourite: favouriteReducers,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
