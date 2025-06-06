import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {  ReviewOverview } from '@/service/serverAPI'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import AppTag from '@/app/components/app-tag'
import { ratingColor } from '@/service/colorCalculator'
import { format } from 'date-fns'

const ReviewOverviewCard = (props: {data : ReviewOverview}) => {
  const getDetailReview = async(id: number) => {
    router.push({
      pathname: `./${id}`,
      params: {}
    })
  }
  return (        
    <View className='w-[100%] h-auto'>
      <TouchableOpacity className='flex-1 h-[30%] p-2' onPress={()=>getDetailReview(props.data.id)}>
        <View className='flex flex-row flex-wrap mt-auto'>
          <View className='flex items-center'>
            <Text className={`text-2xl text-[${ratingColor(props.data.rating)}] font-bold`}>{props.data.rating}</Text>
          </View>
          <View className="border-l border-gray-400 mx-2"/>

          <View className='flex-1'>
            <View className='flex flex-row'>
              <Text className="mr-3 font-bold">{props.data.posterName}</Text>

              <Text className="ml-auto font-bold">{format(props.data.postedAt, 'dd/MM/yyyy HH:mm')}</Text>
            </View>
            
            <Text className="font-bold">{props.data.title}</Text>

            <View className='flex flex-row'>


              
              <View className='flex-row'>
                {props.data.type!="" &&<AppTag extraClassName='bg-orange-500'>
                    <Text className='text-white'>{props.data.type}</Text>
                  </AppTag>
                }
                {props.data.routeName!="" &&<AppTag extraClassName='bg-blue-500'>
                    <Text className='text-white'>{props.data.routeName}</Text>
                  </AppTag>
                }
              </View>
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
      <View className="border-b border-gray-500"/>

    </View>
    
  )
}

export default ReviewOverviewCard