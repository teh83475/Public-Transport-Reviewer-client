import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { GetRoute, Route, ReviewOverview } from '@/service/serverAPI'
import { test_uuid } from '@/constants/Server'
import { Ionicons } from '@expo/vector-icons'
import { PopularitySort } from '@/service/reviewSortService'
import AppButton from '../components/app-button'



const Card = (props: {data : ReviewOverview}) => {
  const getDetailReview = async(id: number) => {
    router.push(`/reviews/${id}`)
  }
  return (        
    <View className='w-[100%] h-auto'>
      <TouchableOpacity className='flex-1 h-[30%] border-2 rounded-xl p-1' onPress={()=>getDetailReview(props.data.id)}>
        <View className='flex flex-row'>
          <Text className="font-bold">{props.data.posterName}</Text>
          <Text className="ml-auto bg-slate-400">{props.data.postedAt.toLocaleString("zh-HK")}</Text>
        </View>
        
        <Text className="font-bold">{props.data.title}</Text>

        <View className='flex flex-row'>
        <Text className="font-bold">rating: {props.data.rating}</Text>
          <View className='flex flex-row ml-auto'>
            <Ionicons name="thumbs-up-outline"/>
            <Text className="font-bold">{props.data.upvoteCount}</Text>
            <Ionicons name="thumbs-down-outline"/>
            <Text className="font-bold">{props.data.downvoteCount}</Text>
          </View>
        </View>
        
        
      </TouchableOpacity>

    </View>
    
  )
}

const RouteSummary = (props: {  id: number}) => {
  const [routeData, setRouteData] = React.useState<Route>();;
  const [averageScore, setAverageScore] = React.useState<number>();

  const fetchGetReview = async() => {
    const route : Route= await GetRoute(props.id) as Route; 

    const reviewsSorted = route.reviews.sort(PopularitySort);
    const {reviews, ...rest} = route;
    const routeSorted = {
      reviews: reviewsSorted,
      ...rest
    }


    const sum = Object.values(route.reviews).reduce((total, current) => total + current.rating, 0);
    setAverageScore(sum/ route.reviews.length);
    setRouteData(routeSorted);
  }

  useEffect(() => {
    fetchGetReview()
    
    return () => {
      
    };
  }, []);

  return (


    <View>
      {/* <Text>route id: {id}</Text> */}
      {routeData && 
        <View >
          <Text>ID: {routeData.id}</Text>
          <Text>type: {routeData.type}</Text>
          <Text>name: {routeData.name}</Text>
          <Text>average score: {averageScore}  (Total {routeData.reviews.length} reviews)</Text> 
          <Text>reviews:</Text>
          <View className='flex-auto h-auto'>
            <ScrollView className='bg-blue grow h-[100%] '>
              {routeData.reviews && routeData.reviews.map((value,index)=>(<Card key={index} data={value}/>))}
            </ScrollView>
          </View>
          
        </View>

      }
    </View>
  )
}

export default RouteSummary