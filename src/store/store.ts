import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage uchun
import profile from "./profile";
import {setupListeners} from "@reduxjs/toolkit/query";
import {UniformService} from "../service/Api.tsx";
import {errorMiddleware} from "../service/errorMiddleware.ts";

const persistConfigProfile = {
  key: "profile",
  storage,
};

const persistedReducerProfile = persistReducer(persistConfigProfile, profile);

export const store = configureStore({
  reducer: {
    profile: persistedReducerProfile,
    [UniformService.reducerPath]: UniformService.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(UniformService.middleware).concat(errorMiddleware);
  },
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
