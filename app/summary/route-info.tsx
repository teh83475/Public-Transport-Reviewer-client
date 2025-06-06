import { View, Text, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { GetRoute, Route, ReviewOverview } from '@/service/serverAPI'
import { test_uuid } from '@/constants/Server'
import { Ionicons } from '@expo/vector-icons'
import { PopularitySort } from '@/service/reviewSortService'
import AppButton from '../components/app-button'
import * as Progress from 'react-native-progress';
import { ratingColor } from '@/service/colorCalculator'


const RouteInfo = (props: {  route: Route, compareMode:boolean}) => {
  const averageScore = Object.values(props.route.reviews).reduce((total, current) => total + current.rating, 0) / props.route.reviews.length;
  const ratingCount = Object.values(props.route.reviews).reduce(
    (total, current) => {
      const new_counts = [...total];
      new_counts[current.rating-1]+=1;
      return new_counts;
    }, [0,0,0,0,0]
  );
  return (
    <View className=''>
      {/* <Text>route id: {id}</Text> */}
      {props.route &&
        <View>
          <View className="flex flex-row p-[1vw]">
            <View className='mt-1'>
              <Progress.Circle
                progress={averageScore/5} 
                size={Dimensions.get('window').width*0.25} 
                thickness={7} 
                borderWidth={0} 
                showsText 
                formatText={()=>Math.ceil(averageScore*100)/100} 
                textStyle={{fontSize:30}}
                direction={"counter-clockwise"}
                color={ratingColor( averageScore)}
                unfilledColor={"#d1d1d1"}
              />
              <Text className='text-center'> ({props.route.reviews.length} reviews)</Text> 
            </View>
            <View className="p-1">
              {Object.values(ratingCount).reverse().map((value,index)=>(
                <View key={index} className='flex flex-row items-center'>
                  <Text className="font-bold">{5-index} </Text>

                  <Progress.Bar
                    
                    progress={value/props.route.reviews.length} 
                    width={Dimensions.get('window').width*0.68*(props.compareMode?0.27:1)}
                    height={8}
                    borderWidth={0} 
                    borderRadius={4}
                    color={ratingColor( 5-index)}
                    unfilledColor={"#d1d1d1"}
                  />
                </View>
              ))}
            </View>
          </View>
          <View className='rounded-3xl bg-gray-200 px-2 pb-4 m-1'>
            <Text className='m-1 text-lg'>
              About this route:
            </Text>
            <ScrollView className='h-40' nestedScrollEnabled = {true}>
              <Text className={`mx-3 text-[${props.compareMode?"12":"15"}px]`}>
                {props.route.summary}
              </Text>
            </ScrollView>
            
          </View>
          
        </View>

      }
    </View>
  )
}

export default RouteInfo