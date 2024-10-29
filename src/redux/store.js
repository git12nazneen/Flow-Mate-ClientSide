// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, // Add other reducers as necessary
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Specify ignored actions and paths to silence the warning if needed
        ignoredActions: ['auth/createUser/fulfilled'],
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;
