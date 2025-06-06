import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AppButton from '@/app/components/app-button'
import { GetAllReviews, Review, ReviewOverview } from '@/service/serverAPI'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { PopularitySort, SortReviews } from '@/service/reviewSortService'
import AppTag from '@/app/components/app-tag'
import { ratingColor } from '@/service/colorCalculator'
import AppDropdown from '@/app/components/app-dropdown'
import { SortType } from '@/constants/Type'
import { format } from 'date-fns'
import ReviewOverviewCard from '@/app/components/review-overview'

const Home = () => {
  const [requestResult, setRequestResult] = React.useState<ReviewOverview[]>();
  const [sortFunc, setSortFunc] = React.useState<any>("POPULARITY");

  const getReviews = async () => {
    const result : ReviewOverview[]= await GetAllReviews() as ReviewOverview[];
    const sortedResult = result.sort(PopularitySort);

    if (result.length>0) setRequestResult(sortedResult) 
    console.log("test: ",requestResult)
  }

  const getDetailReview = async(id: number) => {
    //const review = await GetReviewById(id);
  
    router.push({
      pathname: `./${id}`,
      params: {}
    })
  }

  useEffect(() => {
    getReviews()
    
    return () => {
      
    };
  }, []);

  return (
    <View className='flex h-full'>
      <View className="bg-white h-[7%]">
        <View className='flex flex-row flex-wrap p-1 mt-auto my-auto items-center'>

          <Text className='text-2xl ml-2'>Home</Text>
          <AppDropdown extraClassName="ml-auto w-[42%] " placeholder="Popularity" options={SortType} onChange={setSortFunc}/>

          
          <TouchableOpacity className='mr-1' onPress={getReviews}>
            <Ionicons name="refresh-outline" size={30}/>
          </TouchableOpacity>
        </View>
        <View className="border-b border-gray-300"/>
      </View>
      <View className='flex-auto h-auto'>
        <ScrollView className='bg-blue grow h-[100%]'>
          {requestResult && SortReviews(requestResult,sortFunc).map((value,index)=>(<ReviewOverviewCard key={index} data={value}/>))}
        </ScrollView>
      </View>
    </View>
  )
}




export default Home