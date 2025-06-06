import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React from 'react'
import AppButton from '../components/app-button';
import { DateSortAsc, DateSortDsc, DownvotesSort, PopularitySort, RatingSortAsc, RatingSortDsc, UpvotesSort } from '@/service/reviewSortService';



const SortModal = (props: {setSortMethod : any,}) => {
  const [sortModalVisible, setSortModalVisible] = React.useState<boolean>(false);



  return (
    <View>
        <AppButton onClick={()=>{setSortModalVisible(true)}}>
            <Text>Sort</Text>
        </AppButton>
        <Modal
        visible={sortModalVisible}
        >
        <AppButton onClick={()=>setSortModalVisible(false)}>
            <Text>Close</Text>
        </AppButton>

        <AppButton onClick={()=>{
            props.setSortMethod("POPULARITY");
            setSortModalVisible(false);
        }}>
            <Text>Popularity</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setSortMethod("DATE_ASC");
            setSortModalVisible(false);
        }}>
            <Text>Newest</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setSortMethod("DATE_DSC");
            setSortModalVisible(false);
        }}>
            <Text>Oldest</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setSortMethod("UPVOTE");
            setSortModalVisible(false);
        }}>
            <Text>Most Upvotes</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setSortMethod("DOWNVOTE");
            setSortModalVisible(false);
        }}>
            <Text>Most downvotes</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setSortMethod("RATING_DSC");
            setSortModalVisible(false);
        }}>
            <Text>Highest Rating</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setSortMethod("RATING_ASC");
            setSortModalVisible(false);

        }}>
            <Text>Lowest Rating</Text>
        </AppButton>

        </Modal>
    </View>
  )
}

export default SortModal;



/*
const SortModal = (props: {reviewsA : any, reviewsB : any, setReviewsA : any, setReviewsB : any,}) => {
  const [sortModalVisible, setSortModalVisible] = React.useState<boolean>(false);



  return (
    <View>
        <AppButton onClick={()=>{setSortModalVisible(true)}}>
            <Text>Add</Text>
        </AppButton>
        <Modal
        visible={sortModalVisible}
        >
        <AppButton onClick={()=>setSortModalVisible(false)}>
            <Text>Close</Text>
        </AppButton>

        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(PopularitySort));
            props.setReviewsB(props.reviewsA.sort(PopularitySort));
        }}>
            <Text>Pooularity</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(DateSortAsc));
            props.setReviewsB(props.reviewsA.sort(DateSortAsc));
        }}>
            <Text>Newest</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(DateSortDsc));
            props.setReviewsB(props.reviewsA.sort(DateSortDsc));
        }}>
            <Text>Oldest</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(UpvotesSort));
            props.setReviewsB(props.reviewsA.sort(UpvotesSort));
        }}>
            <Text>Most Upvotes</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(DownvotesSort));
            props.setReviewsB(props.reviewsA.sort(DownvotesSort));
        }}>
            <Text>Most downvotes</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(RatingSortDsc));
            props.setReviewsB(props.reviewsA.sort(RatingSortDsc));
        }}>
            <Text>Highest Rating</Text>
        </AppButton>
        <AppButton onClick={()=>{
            props.setReviewsA(props.reviewsA.sort(RatingSortAsc));
            props.setReviewsB(props.reviewsA.sort(RatingSortAsc));
        }}>
            <Text>Lowest Rating</Text>
        </AppButton>

        </Modal>
    </View>
  )
}
*/ 