import * as Location from 'expo-location';

export const SortType = [
  { label: 'Popularity', value: 'POPULARITY' },
  { label: 'Newest', value: 'DATE_ASC' },
  { label: 'Oldest', value: 'DATE_DSC' },
  { label: 'Most Upvotes', value: 'UPVOTE' },
  { label: 'Most downvotes', value: 'DOWNVOTE' },
  { label: 'Highest Rating', value: 'RATING_DSC' },
  { label: 'Lowest Rating', value: 'RATING_ASC' },
];

export interface TrackedLocation{
  coords?: Location.LocationObjectCoords;
  timestamp?: number;
  mocked?: boolean;
  error?: string;
}


export interface LatLng {
  latitude: number;
  longitude: number;
}