import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { GetRoute, Route, ReviewOverview, Review } from '@/service/serverAPI'
import { Ionicons } from '@expo/vector-icons'
import { PopularitySort, SortReviewDetail, SortReviews } from '@/service/reviewSortService'
import AppDropdown from '../components/app-dropdown'
import { SortType } from '@/constants/Type'
import { ratingColor } from '@/service/colorCalculator'
import { format } from 'date-fns';


const Card = (props: {data : Review}) => {
  const getDetailReview = async(id: number) => {
    router.push(`/reviews/${id}`)
  }
  return (     
    <View className='w-[100%] h-auto'>
      <TouchableOpacity className='flex-1 h-[30%] p-2 mx-1 mb-1 border rounded-xl' onPress={()=>getDetailReview(props.data.id)}>
        <View className='flex flex-row flex-wrap mt-auto'>
          <View className='flex items-center'>
            <Text className={`text-2xl text-[${ratingColor(props.data.rating)}] font-bold`}>{props.data.rating}</Text>
          </View>
          <View className="border-l border-gray-400 mx-2"/>

          <View className='flex-1'>
            <View className='flex flex-row'>
              <Text className="mr-3 font-bold">{props.data.posterName}</Text>

              <Text className="ml-auto font-bold">{format(props.data.postedAt, 'dd/MM/yyyy')}</Text>
            </View>
            
            <Text className="font-bold">{props.data.title}</Text>
            <Text className="">
              {props.data.content.length>300?props.data.content.substring(0,299)+"...":props.data.content.length }
              </Text>
            <View className='flex flex-row'>
              <View className='flex flex-row ml-auto'>
                <Ionicons name="thumbs-up-outline" size={18}/>
                <Text className="">{props.data.upvoteCount}</Text>
                <Ionicons name="thumbs-down-outline" size={18}/>
                <Text className="">{props.data.downvoteCount}</Text>
              </View>
            </View>

          </View>
        </View>
        
      </TouchableOpacity>
    </View>
    
  )
}

const RouteReviews = (props: {  routeA: Route | undefined, routeB: Route | undefined}) => {
  const [reviewsSortedA, setReviewsSortedA] = React.useState<Review[] | undefined>(props.routeA? [...props.routeA.reviews]: undefined); 
  const [reviewsSortedB, setReviewsSortedB] = React.useState<Review[] | undefined>();
  const [sortFunc, setSortFunc] = React.useState<any>("POPULARITY");
  
  const getReview = () => {
      if (props.routeB) setReviewsSortedB([...props.routeB?.reviews]);
    }
  
    useEffect(() => {
      console.log("updating")
      return () => {};
    }, []);
  

  return (
    <View>
      <AppDropdown extraClassName="ml-auto w-[42%] " placeholder="Popularity" options={SortType} onChange={setSortFunc}/>
      <View className='flex flex-row h-auto'>
        
        
        {/*left to right*/}
        {props.routeA && 
          <View className={`flex ${props.routeB?'w-[50%]':'w-[100%]'}`}>
            
              {SortReviewDetail(props.routeA?.reviews,sortFunc).map((value,index)=>(<Card key={index} data={value}/>))}
            
          </View>
        }

        {props.routeB && 
          <View className='flex w-[50%]'>
           
              {SortReviewDetail(props.routeB?.reviews,sortFunc).map((value,index)=>(<Card key={index} data={value}/>))}
            
          </View>
        } 
      
      </View>
    </View>
  )
}

export default RouteReviews;