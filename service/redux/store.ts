import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import newReviewReducer from './newReviewSlice';
import trackedLocationReducer from './trackedLocationSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    new_review: newReviewReducer,
    tracked_location: trackedLocationReducer,
  },
});

export default store