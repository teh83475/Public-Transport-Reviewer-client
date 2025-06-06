import { Review } from "./serverAPI";

export const TransformReviewDetails = (review : any) => {
  const {postedAt, comments, ...rest} = review;
  const reviewTransformed : Review = {
    postedAt: new Date(Date.parse(postedAt)),
    comments: comments.map(({postedAt, ...rest} : {postedAt: string}) => {
      return ({
        postedAt: new Date(Date.parse(postedAt)),
        ...rest
      })
    }),
    ...rest
  };

  return (reviewTransformed);
  
}



export const TransformReviewOverviews = (review : any) => {
  const reviewsTransformed = review.map(({postedAt, ...rest} : {postedAt: string}) => {
    return ({
      postedAt: new Date(Date.parse(postedAt)),
      ...rest
    })
  })
  

  return (reviewsTransformed);
  
}