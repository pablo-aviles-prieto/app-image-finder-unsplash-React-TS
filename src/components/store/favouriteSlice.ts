import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { searchPhotosAPI, searchCategoriesAPI } from './searchPhotosAPI';

export interface PaginationInfo {
  totalCount: number;
  totalPages: number;
}

export interface FetchPhotoData {
  total: number;
  total_pages: number;
  results: any[];
}

export interface FetchPhotoResults {
  responseObj: Promise<FetchPhotoData>;
  numbersOfPages: number;
}

export interface ParsedFetchedResults {
  paginationInfo: PaginationInfo | null;
  parsedArray: CategoryPhotoObj[];
  totalPages: number;
}

export interface CategoryPhotoObj {
  id: string;
  description: string | undefined;
  width: string;
  height: string;
  totalPhotos: Number | undefined;
  likes: number;
  urls: {
    full: string;
    small: string;
    thumb: string;
  };
  tags: { title: string }[];
  author: {
    name: string | null;
    link: string | null;
  };
  imgCat: string;
  link: string;
}

export interface CategoryObj {
  id: string;
  description: string;
  width: string | undefined;
  height: string | undefined;
  totalPhotos: number | undefined;
  likes: number | undefined;
  urls:
    | {
        full: string;
        small: string;
        thumb: string;
      }
    | undefined;
  tags: { title: string }[] | undefined;
  author:
    | {
        name: string;
        link: string;
      }
    | undefined;
  imgUrl: string | undefined;
  link: string | undefined;
}

interface SearchState {
  unsplashData: ParsedFetchedResults;
  endpointCalled: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchState = {
  unsplashData: {
    paginationInfo: null,
    parsedArray: [
      {
        id: '',
        description: '',
        width: '',
        height: '',
        totalPhotos: 0,
        likes: 0,
        urls: { full: '', small: '', thumb: '' },
        tags: [{ title: '' }],
        author: { name: '', link: '' },
        imgCat: '',
        link: '',
      },
    ],
    totalPages: 0,
  },
  endpointCalled: '',
  status: 'loading',
};

export const fetchPhotos = createAsyncThunk(
  'search/searchPhotos',
  async (params: {
    url: string;
    updateTotalPages: boolean;
  }): Promise<{
    paginationInfo: PaginationInfo | null;
    parsedArray: any[];
    totalPages: number | null;
    endpointCalled: string;
  }> => {
    const response = await searchPhotosAPI(params.url);
    const dataParsed = await response.responseObj;
    const dataObtained = dataParsed?.results
      ? dataParsed.results
      : (dataParsed as unknown as any[]);
    const paginationInfo: PaginationInfo | null = dataParsed?.results
      ? { totalCount: dataParsed.total, totalPages: dataParsed['total_pages'] }
      : null;

    const parsedArray = dataObtained
      .filter((imgObj) => !imgObj.sponsorship)
      .map((filteredObj) => ({
        id: filteredObj.id,
        description: filteredObj.description
          ? filteredObj.description
          : filteredObj['alt_description'],
        width: filteredObj.width,
        height: filteredObj.height,
        likes: filteredObj.likes,
        urls: {
          full: filteredObj.urls.full,
          small: filteredObj.urls.small,
          thumb: filteredObj.urls.thumb,
        },
        author: {
          name: filteredObj.user.name,
          link: filteredObj.user.links.html,
        },
      }));

    return {
      paginationInfo,
      parsedArray,
      totalPages: params.updateTotalPages ? response.numbersOfPages : null,
      endpointCalled: params.url,
    };
  }
);

export const fetchCategories = createAsyncThunk(
  'search/searchPhotos',
  async (params: {
    url: string;
    updateTotalPages: boolean;
  }): Promise<{
    paginationInfo: PaginationInfo | null;
    parsedArray: any[];
    totalPages: number | null;
    endpointCalled: string;
  }> => {
    const response = await searchCategoriesAPI(params.url);
    const dataParsed = await response.responseObj;
    const dataObtained = dataParsed?.results
      ? dataParsed.results
      : (dataParsed as unknown as any[]);
    const paginationInfo: PaginationInfo | null = dataParsed?.results
      ? { totalCount: dataParsed.total, totalPages: dataParsed['total_pages'] }
      : null;

    const parsedArray = dataObtained.map((obj) => ({
      id: obj.id,
      description: obj.title,
      totalPhotos: obj['total_photos'],
      tags: obj.tags.map((tag: { title: string }) => tag.title),
      imgCat: obj['cover_photo'].urls.small,
    }));

    return {
      paginationInfo,
      parsedArray,
      totalPages: params.updateTotalPages ? response.numbersOfPages : null,
      endpointCalled: params.url,
    };
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    // Reusing the same action type (search/searchPhotos) for the thunks
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        const { paginationInfo, parsedArray, totalPages, endpointCalled } =
          action.payload;
        if (totalPages === null) {
          state.unsplashData = {
            paginationInfo,
            parsedArray,
            totalPages: state.unsplashData.totalPages,
          };
        } else {
          state.unsplashData = { paginationInfo, parsedArray, totalPages };
        }
        state.endpointCalled = endpointCalled;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

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

export default searchSlice.reducer;
