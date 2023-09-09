import { type ISeries } from "../../models/IUser";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SeriesState {
  series: ISeries[];
  isLoading: boolean;
  error: string;
  length: number;
  seriesKey: string;
  id: number;
}

const initialSeriesState: SeriesState = {
  series: [],
  isLoading: false,
  error: "",
  length: 0,
  seriesKey: "",
  id: 0,
};

const seriesSlice = createSlice({
  name: "series",
  initialState: initialSeriesState,
  reducers: {
    seriesFetching(state, action: PayloadAction) {
      state.isLoading = true;
    },
    seriesFetchingSuccess: function (state, action: PayloadAction) {
      state.isLoading = false;
      state.error = "";
      state.series = action.payload;
    },
    seriesVideoFetching(state, action: PayloadAction) {
      state.isLoading = true;
      state.id = action.payload;
    },
    seriesVideoSuccess: function (state, action: PayloadAction) {
      state.isLoading = false;
      state.seriesKey = action.payload;
    },
    movieFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  seriesFetchingSuccess,
  seriesFetching,
  seriesVideoSuccess,
  seriesVideoFetching,
} = seriesSlice.actions;

export default seriesSlice.reducer;
