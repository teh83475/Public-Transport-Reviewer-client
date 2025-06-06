import axios from 'axios';
import { SERVER_URL } from '@/constants/Server';
import { TransformReviewDetails, TransformReviewOverviews } from './transform';
import { setUpvotedReviews } from './redux/profileSlice';
import * as ImagePicker from 'expo-image-picker'
import { TrackedLocation } from '@/constants/Type'

export interface Review {
  id: number,
  title: string,
  content: string,
  posterId: string,
  posterName: string,
  postedAt: Date,
  upvoteCount: number,
  downvoteCount: number,
  rating: number,
  type: string, 
  registrationMark?: string, 
  driverIdentity?: string,
  comments: Comment[],
  images: string[],
  routeName: string,
  locations: TrackedLocation[];
}

export interface ReviewOverview {
  id: number,
  title: string,
  posterName: string,
  postedAt: Date,
  upvoteCount: number,
  downvoteCount: number,
  rating: number,
  routeName: string,
  type: string,
}

export interface Comment {
  id: number,
  posterName : string,
  reviewId : number,
  content: string,
  posterId: string,
  postedAt: Date,
}

export interface RouteSearchResultOverview {
  id: number,
  type: string,
  name: string,
}

export interface Route {
  id: number,
  type: string,
  name: string,
  reviews: Review[],
  summary: string,
}

export const CreateUser = async (username : string, password : string) => {  
  try {
    const response = await axios.post(`${SERVER_URL}/createUser`, {
      username : username,
      password : password
    })
    console.log(response.data)
    return (response.data) 
    
  } catch(err) {
    console.log(err);
    return (err)
  }
  
}


export const GetUserById = async (user_id : string) => {      

  try {
    const response = await axios.post(`${SERVER_URL}/user`, {
      user_id : user_id
    })
    console.log(response.data)
    return (response.data) 
    
  } catch(err) {
    console.log(err);
    return (err)
  }
  
}

export const GetUsers = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}`)
    console.log(response.data)
    return (response.data) 
    
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const GetAllReviews = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/reviews`)
    const result = response.data.map(({postedAt, ...rest} : {postedAt: string}) => {
      return ({
        postedAt: new Date(Date.parse(postedAt)),
        ...rest
      })
    })
    return (result) 
    
  } catch(err) {
    console.log(err);
    return (err)
  }
  
  
}

export const GetReviewById = async (id : number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/review?review_id=${id}`);
    const review = TransformReviewDetails(response.data.review);

    const responseTransformed = {
      status: response.data.status,
      review: review,
    };

    console.log("Review detail page fetch review transformed:", responseTransformed);
    return (responseTransformed);
  } catch(err) {
    console.log(err);
    return ({
      status: "ERROR",
      review: null
    })
  }
}

export const CreateReview = async (title : string , content : string , rating : number , poster_id : string , type: string, route: string, images: ImagePicker.ImagePickerAsset[], isUpdateSummary: boolean, locations?: TrackedLocation[], registrationMark?: string, driverIdentity?: string) => {
  try {
    const imageStrings = images.map(({base64, ...rest}) => {
      return (base64)
    });
    console.log(imageStrings.length);
    const response = await axios.post(`${SERVER_URL}/createReview`, {
      title : title,
      content : content,
      rating : rating,
      type : type,
      route : route,
      registrationMark : registrationMark,
      driverIdentity : driverIdentity,
      images : imageStrings,
      updateSummary : isUpdateSummary,
      locations: locations
      // locations : locations,
    })
    console.log(response.data)
    return (response.data) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const UpvoteReview = async (poster_id : string , review_id : number) => {
  try {
    const response = await axios.post(`${SERVER_URL}/upvote`, {
      review_id : review_id
    })
    console.log(response.data)
    return (response.data) 
  } catch(err) {
    console.log(err);
    return ({
      status: "ERROR",
      review: null,
      upvotedReviews: []
    })
  }

}

export const DownvoteReview = async (poster_id : string , review_id : number) => {
  try {
    const response = await axios.post(`${SERVER_URL}/downvote`, {
      review_id : review_id
    })
    console.log(response.data)
    return (response.data) 
  } catch(err) {
    console.log(err);
    return ({
      status: "ERROR",
      review: null,
      upvotedReviews: []
    })
  }

}

export const CreateComment = async (content : string ,review_id : number, poster_id : string ) => {
  try {
    const response = await axios.post(`${SERVER_URL}/createComment`, {
      content : content,
      review_id : review_id
    })
    console.log(response.data)
    return (response.data) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const Search = async (search_query : string ) => {
  try {
    const response = await axios.get(`${SERVER_URL}/search?search_query=${search_query}`)

    console.log(response.data)
    return (response.data) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const GetRoute = async (id : number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/route?id=${id}`)
    const {reviews, ...rest} = response.data;
    const reviewsTransformed = TransformReviewOverviews(reviews);
    const routesTransformed = {
      ...rest,
      reviews: reviewsTransformed
    };
  

    console.log(routesTransformed)
    return (routesTransformed) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const GetRoutes = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/routes`)
    const {reviews, ...rest} = response.data;
    const reviewsTransformed = TransformReviewOverviews(reviews);
    const routesTransformed = {
      ...rest,
      reviews: reviewsTransformed
    };
  

    console.log(routesTransformed)
    return (routesTransformed) 
  } catch(err) {
    console.log(err);
    return (err)
  }
}

export const ChangePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/changepassword`, {
      old_password: oldPassword,
      new_password: newPassword
    })
    console.log(response.data)
    return (response.data) 
    
  } catch(err) {
    console.log(err);
    return (err)
  }
}