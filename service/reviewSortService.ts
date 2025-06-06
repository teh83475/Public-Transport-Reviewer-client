import { Review, ReviewOverview } from "./serverAPI";

const DaysFromNow = (date : Date) => {
  const dateNow = new Date();
  return Math.abs(date.getTime() - dateNow.getTime()) / (1000 * 3600 *24);
}



export const PopularitySort = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);

  const score_a = a.upvoteCount-a.downvoteCount-diff_a*0.5;
  const score_b = b.upvoteCount-b.downvoteCount-diff_b*0.5;
  console.log('popularity');
  return (score_a > score_b ? -1 : 1);
}

export const DateSortAsc = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);
  console.log('dateSortAsc');
  return (diff_a < diff_b ? -1 : 1);
}

export const DateSortDsc = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);
  console.log('dateSortDsc');
  return (diff_a > diff_b ? -1 : 1);
}

export const UpvotesSort = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);
  const score_a = a.upvoteCount*100000-diff_a;
  const score_b = b.upvoteCount*100000-diff_b;
  console.log('upvote');
  return (score_a > score_b ? -1 : 1);
}

export const DownvotesSort = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);
  const score_a = a.downvoteCount*100000-diff_a;
  const score_b = b.downvoteCount*100000-diff_b;
  console.log('downvote');
  return (score_a > score_b ? -1 : 1);
}

export const RatingSortAsc = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);
  const score_a = a.rating*100000-diff_a;
  const score_b = b.rating*100000-diff_b;
  console.log('ratingAsc');
  return (score_a < score_b ? -1 : 1);
}

export const RatingSortDsc = (a: any, b: any) => {
  const diff_a= DaysFromNow(a.postedAt);
  const diff_b= DaysFromNow(b.postedAt);
  const score_a = a.rating*100000-diff_a;
  const score_b = b.rating*100000-diff_b;
  console.log('ratingDsc');
  return (score_a > score_b ? -1 : 1);
}

// ..
export const SortReviews = (reviews: ReviewOverview[], method: string) => {
  if (method=="POPULARITY") return reviews.sort(PopularitySort); 
  if (method=="DATE_ASC") return reviews.sort(DateSortAsc);
  if (method=="DATE_DSC") return reviews.sort(DateSortDsc);
  if (method=="UPVOTE") return reviews.sort(UpvotesSort);
  if (method=="DOWNVOTE") return reviews.sort(DownvotesSort);
  if (method=="RATING_ASC") return reviews.sort(RatingSortAsc);
  if (method=="RATING_DSC") return reviews.sort(RatingSortDsc);
  return reviews.sort(PopularitySort);
}

export const SortReviewDetail = (reviews: Review[], method: string) => {
  if (method=="POPULARITY") return reviews.sort(PopularitySort); 
  if (method=="DATE_ASC") return reviews.sort(DateSortAsc);
  if (method=="DATE_DSC") return reviews.sort(DateSortDsc);
  if (method=="UPVOTE") return reviews.sort(UpvotesSort);
  if (method=="DOWNVOTE") return reviews.sort(DownvotesSort);
  if (method=="RATING_ASC") return reviews.sort(RatingSortAsc);
  if (method=="RATING_DSC") return reviews.sort(RatingSortDsc);
  return reviews.sort(PopularitySort);
}

