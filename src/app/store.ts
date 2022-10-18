import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from '../components/store/searchSlice';
import favouriteReducers from '../components/store/favouriteSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favourite: favouriteReducers,
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
