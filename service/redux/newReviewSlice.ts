import { createSlice } from '@reduxjs/toolkit';

export const newReviewSlice = createSlice({
  name: 'new_review',
  initialState: {
    plate: "",
    driver_id: "",
  },
  reducers: {
    setPlate: (state, action) => {
      console.log("set UpvotedReviews",action.payload);
      state.plate = action.payload;
    },

    setDriverId: (state, action) => {
      console.log("set DownvotedReviews",action.payload);
      state.driver_id = action.payload;
    }
  },
});

export const {setPlate, setDriverId} = newReviewSlice.actions;

export const selectNewReview = (state: any) => state.new_review;

export default newReviewSlice.reducer;