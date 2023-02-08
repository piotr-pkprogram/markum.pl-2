import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { reviewsApi } from './api/reviews';
import { questionsApi } from './api/questions';
import { estatesApi } from './api/estates';
import { servicesApi } from './api/services';
import { getAllDataApi } from './api/getAllData';

export * from './api/reviews';
export * from './api/questions';
export * from './api/estates';
export * from './api/services';
export * from './api/getAllData';

export const store = configureStore({
  reducer: {
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [estatesApi.reducerPath]: estatesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [getAllDataApi.reducerPath]: getAllDataApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      reviewsApi.middleware,
      questionsApi.middleware,
      estatesApi.middleware,
      servicesApi.middleware,
      getAllDataApi.middleware,
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
