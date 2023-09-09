import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import movieReducer from "./reducers/UserSlice";
import seriesReducer from "./reducers/SeriesSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./reducers/ActionCreators";

const rootReducer = combineReducers({
  movieReducer,
  seriesReducer,
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
