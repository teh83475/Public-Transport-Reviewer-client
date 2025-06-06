import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { GetAllReviews, ReviewOverview } from '@/service/serverAPI'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { PopularitySort, SortReviews } from '@/service/reviewSortService'
import AppDropdown from '@/app/components/app-dropdown'
import { SortType } from '@/constants/Type'
import ReviewOverviewCard from '@/app/components/review-overview'
import { useSelector } from 'react-redux'
import { selectProfile } from '@/service/redux/profileSlice'
import { DEFAULT_COLOR } from '@/constants/Colors'




const YourPosts = () => {
  const profile = useSelector(selectProfile);
  const [requestResult, setRequestResult] = React.useState<ReviewOverview[]>();
  const [sortFunc, setSortFunc] = React.useState<any>("DATE_ASC");

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
          <TouchableOpacity className='' onPress={router.back}>
            <Ionicons name="arrow-back-outline" size={26} color={DEFAULT_COLOR}/>
          </TouchableOpacity>
          

          <Text className='text-xl ml-2'>Your Posts</Text>
          <AppDropdown extraClassName="ml-auto w-[42%] " placeholder="Popularity" options={SortType} onChange={setSortFunc}/>

          
          <TouchableOpacity className='mr-1' onPress={getReviews}>
            <Ionicons name="refresh-outline" size={30}/>
          </TouchableOpacity>
        </View>
        <View className="border-b border-gray-300"/>
      </View>
      <View className='flex-auto h-auto'>
        <ScrollView className='bg-blue grow h-[100%]'>
          {requestResult && SortReviews(requestResult,sortFunc).map((value,index)=>(
            profile.username == value.posterName? 
              <ReviewOverviewCard key={index} data={value}/>:
              <View key={index}></View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}




export default YourPosts