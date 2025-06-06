import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TINT_COLOR } from '@/constants/Colors';
import { ReviewOverview, Route, RouteSearchResultOverview, Search } from '@/service/serverAPI';
import { router } from 'expo-router';
import SearchComponent from '@/app/summary/search-component';
import AppButton from '@/app/components/app-button';
import RouteSummary from '@/app/summary/route-summary';
import RouteReviews from '@/app/summary/route-reviews';
import { PopularitySort } from '@/service/reviewSortService';
import RouteInfo from '@/app/summary/route-info';
import AppTag from '@/app/components/app-tag';



const index = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  
  const [routeA, setRouteA] = React.useState<Route>();
  const [routeB, setRouteB] = React.useState<Route>();

  const [sortFunc, setSortFunc] = React.useState<any>(()=>PopularitySort);

  const setRoute = (route: Route) => {
    setModalVisible(false);
    if (!routeA) {
      setRouteA(route);
      setRouteB(undefined);
      return;
    }
    setRouteB(route);
    return;
  }

  const clearRouteA = () => {
    setRouteA(routeB);
    setRouteB(undefined);
    return;
  }
  
  const clearRouteB = () => {
    setRouteB(undefined);
    return;
  }


  return (
    <View>
      {!routeA && <SearchComponent setRoute={setRoute}></SearchComponent>}
      <ScrollView nestedScrollEnabled = {true}>
        <View className='flex flex-row'>
          {/*left to right*/}
          
          {routeA && 
            <View className={`flex ${routeB?'w-[50%]':'w-[100%]'}`}>

              <View className="bg-white">
                <View className='flex flex-row flex-wrap p-1 mt-auto my-auto'>
                  <View className='items-center justify-center'>
                    <AppTag extraClassName='bg-orange-500'>
                      <Text className='text-white'>{routeA.type}</Text>
                    </AppTag>
                  </View>
                  <Text className='text-2xl ml-1'>{routeA.name}</Text>

                  <View className='ml-auto'></View>
                  {!routeB &&<TouchableOpacity className='mr-1' onPress={()=>setModalVisible(true)}>
                    <Ionicons name="add-outline" size={30}/>
                  </TouchableOpacity>}
                  
                  <TouchableOpacity className='mr-1' onPress={clearRouteA}>
                    <Ionicons name="close-outline" size={30}/>
                  </TouchableOpacity>
                </View>
                <View className="border-b border-gray-300"/>
              </View>

              
              <RouteInfo route={routeA} compareMode={routeB?true:false}></RouteInfo>
              
            </View>
          }

          {routeB && 
            <View className='flex w-[50%]'> 
              <View className="bg-white">
                <View className='flex flex-row flex-wrap p-1 mt-auto my-auto'>
                  <View className='items-center justify-center'>
                    <AppTag extraClassName='bg-orange-500'>
                      <Text className='text-white'>{routeB.type}</Text>
                    </AppTag>
                  </View>
                  <Text className='text-2xl ml-1'>{routeB.name}</Text>
                  <View className='ml-auto'></View>
                  <TouchableOpacity className='mr-1' onPress={clearRouteB}>
                    <Ionicons name="close-outline" size={30}/>
                  </TouchableOpacity>
                </View>
                <View className="border-b border-gray-300"/>
              </View>

              
              <RouteInfo route={routeB} compareMode={true}></RouteInfo>
            </View>
          } 
          
        </View>
        


        {/*reviews*/}
        
        <RouteReviews routeA={routeA} routeB={routeB}></RouteReviews>
      </ScrollView>
      <Modal
        visible={modalVisible}
      >
        <AppButton extraClassName="m-1" onClick={()=>setModalVisible(false)}>
          <Text>Close</Text>
        </AppButton>
        <SearchComponent setRoute={setRoute}></SearchComponent>
      </Modal>

      
    </View>
  )
}

export default index