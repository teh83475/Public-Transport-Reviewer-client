import { TrackedLocation } from '@/constants/Type'
import { createSlice } from '@reduxjs/toolkit';

export const trackedLocationSlice = createSlice({
  name: 'tracked_location',
  initialState: {
    locations: [] as TrackedLocation[],
  },
  reducers: {
    setLocationSlice: (state, action) => {
      state.locations = [
        ...state.locations,
        ...action.payload
      ];

      console.log("locations:",[
        ...state.locations,
        ...action.payload
      ]);
    }
  },
});



export const {setLocationSlice} = trackedLocationSlice.actions;

export const selectTrackedLocations = (state: any) => state.tracked_location;

export default trackedLocationSlice.reducer;