import { configureStore } from '@reduxjs/toolkit';
import { openAiCoreApi } from './services/openAiCore';

export const store = configureStore({
    reducer: {
        [openAiCoreApi.reducerPath]: openAiCoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(openAiCoreApi.middleware),
});