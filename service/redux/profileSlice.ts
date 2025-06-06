import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    uuid: "",
    username: "",
    reviews          : [],
    upvotedReviews   : [],
    downvotedReviews : [],
    comments: [],
  },
  reducers: {
    setProfile: (state, action) => {
      console.log("setProfile" ,action.payload);
      // state.uuid = action.payload.uuid;
      // state.username = action.payload.username;
      
      return {...action.payload};
    },

    setUpvotedReviews: (state, action) => {
      console.log("set UpvotedReviews",action.payload);
      state.upvotedReviews = action.payload;
    },

    setDownvotedReviews: (state, action) => {
      console.log("set DownvotedReviews",action.payload);
      state.downvotedReviews = action.payload;
    }
  },
});

export const { setProfile, setUpvotedReviews, setDownvotedReviews} = profileSlice.actions;

export const selectProfile = (state: any) => state.profile;

export default profileSlice.reducer;