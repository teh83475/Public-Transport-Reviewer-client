import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TINT_COLOR } from '@/constants/Colors';
import { GetRoute, Route, RouteSearchResultOverview, Search } from '@/service/serverAPI';
import { router } from 'expo-router';
import { PopularitySort } from '@/service/reviewSortService';
import AppTag from '../components/app-tag';



const Card = (props: {data : RouteSearchResultOverview, setRoute: any}) => {
  const getSummary = async (id: number) => {
    // router.push( `/summary/${id}`)
    const route : Route= await GetRoute(id) as Route;
    const reviewsSorted = route.reviews.sort(PopularitySort);
    const {reviews, ...rest} = route;
    const routeSorted = {
      reviews: reviewsSorted,
      ...rest
    }
    props.setRoute(routeSorted);
  }
  return (        
    <View className='w-[100%] h-auto'>
      <TouchableOpacity className='flex-1 h-[30%] border rounded-xl p-1' onPress={()=>getSummary(props.data.id)}>
        <View className='flex flex-row'>
          <Text className="font-bold">{props.data.name}</Text>
          <AppTag extraClassName='ml-auto bg-orange-500'>
            <Text className='text-white'>{props.data.type}</Text>
          </AppTag>
        </View>
      
        
        
      </TouchableOpacity>

    </View>
    
  )
}


const SearchComponent = (props: {setRoute : any}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<RouteSearchResultOverview[]>();

  const ClearSearch = () => {
    setSearchQuery("");
    setSearchResult([])
  }

  const onSearchQueryChange = async (input : string) => {
    setSearchQuery(input);
    if (input.length<=0) {
      setSearchResult([])
      return;
    }
    
    const result : RouteSearchResultOverview[]= await Search(input) as RouteSearchResultOverview[]
    if (result.length>0) setSearchResult(result) 
    console.log("Search Result: ",result)

  }

  return (
    <View>
      <View className='border rounded-xl p-2 flex flex-row'>
        <Ionicons name="search-outline" size={28} color={TINT_COLOR}/>
        <TextInput
          className='flex-1'
          onChangeText={onSearchQueryChange}
          placeholder='Search'
          value={searchQuery as string}
        />
        {searchQuery!=="" && <TouchableOpacity className='' onPress={()=>ClearSearch()}>
          <Ionicons name="close-outline" size={28} color={TINT_COLOR}/>
        </TouchableOpacity>
        }
      </View>
      <ScrollView className='bg-blue grow h-[100%] '>
        {searchResult && searchResult.map((value,index)=>(<Card key={index} data={value} setRoute={props.setRoute}/>))}
      </ScrollView>
    </View>
  )
}

export default SearchComponent;