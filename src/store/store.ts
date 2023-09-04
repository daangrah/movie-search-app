import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import movieReducer from './reducers/UserSlice'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './reducers/ActionCreators'

const rootReducer = combineReducers({
  movieReducer
})
const sagaMiddleware = createSagaMiddleware()
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      sagaMiddleware
    ]
  })
  sagaMiddleware.run(rootSaga)
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
