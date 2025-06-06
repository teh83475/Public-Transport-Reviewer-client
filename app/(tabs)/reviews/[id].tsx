import { View, Text, Image, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { CreateComment, DownvoteReview, GetReviewById, Review, Comment, UpvoteReview } from '@/service/serverAPI'
import AppButton from '@/app/components/app-button'
import { test_uuid } from '@/constants/Server'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux';
import { setUpvotedReviews, setDownvotedReviews, selectProfile } from '@/service/redux/profileSlice';
import { TransformReviewDetails } from '@/service/transform'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageView from "react-native-image-viewing";
import { ratingColor } from '@/service/colorCalculator'
import AppTag from '@/app/components/app-tag'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { LatLng } from '@/constants/Type'
import { DEFAULT_COLOR } from '@/constants/Colors'
import { format } from 'date-fns'

const Card = (props: {data : Comment}) => {

  return (        
    <View className='w-full h-auto'>
      <View className='flex flex-row'>
        <Text className="font-bold">{props.data.posterName}</Text>
        <Text className="ml-auto">{props.data.postedAt.toLocaleString("zh-HK")}</Text>
      </View>
      
      <Text className="">{props.data.content}</Text>
      <View className="border-b border-gray-500 my-2"/>


    </View>
    
  )
}



const ReviewDetail = () => {
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const {id} = useLocalSearchParams()
  const [reviewData, setReviewData] = React.useState<Review>();
  const [comment, onCommentChange] = React.useState('');
  const [imageVisible, setImageVisible] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [showDetail, setShowDetail] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);

  const mapRef = useRef<MapView>(null);

  const fetchGetReview = async () => {
    const result = await GetReviewById(parseInt(id as string));

    if (result.status!="SUCCESS" || result.review==null){ return;}

    setReviewData(result.review);
    console.log("Page: ",result.review);
  }

  const upvote = async() => {
    const result = await UpvoteReview(test_uuid, parseInt(id as string));
    if (result.status!="SUCCESS" || result.review==null) {
      Toast.show({
        type: 'error',
        text1: (result.status=="NO_TOKEN_FOUND" || result.status=="LOGGED_OUT_SESSION" || result.status=="INVALID_SESSION"?"You need to login to upvote.":result.status),
      });
      return;
    }

    const review = TransformReviewDetails(result.review);

    Toast.show({
      type: 'success',
      text1: "Success.",
    });
    setReviewData(review);
    dispatch(setUpvotedReviews(result.upvotedReviews));
    dispatch(setDownvotedReviews(result.downvotedReviews));
    return;
  }

  const downvote = async() => {
    const result = await DownvoteReview(test_uuid, parseInt(id as string));
    if (result.status!="SUCCESS" || result.review==null) {
      Toast.show({
        type: 'error',
        text1: (result.status=="NO_TOKEN_FOUND" || result.status=="LOGGED_OUT_SESSION" || result.status=="INVALID_SESSION"?"You need to login to upvote.":result.status),
      });
      return;
    }

    const review = TransformReviewDetails(result.review);

    Toast.show({
      type: 'success',
      text1: "Success.",
    });
    setReviewData(review);
    dispatch(setUpvotedReviews(result.upvotedReviews));
    dispatch(setDownvotedReviews(result.downvotedReviews));
    return;
  }

  const postComment = async() => {
    const result = await CreateComment(comment, parseInt(id as string), test_uuid);
    if (result.status!="SUCCESS" || result.review==null) {
      Toast.show({
        type: 'error',
        text1: (result.status=="NO_TOKEN_FOUND" || result.status=="LOGGED_OUT_SESSION" || result.status=="INVALID_SESSION"?"You need to login to upvote.":result.status),
      });
      return;
    }
    Toast.show({
      type: 'success',
      text1: "Success.",
    });
    const review = TransformReviewDetails(result.review);
    setReviewData(review);
    onCommentChange("");
  }

  useEffect(() => {
    fetchGetReview()
    
    return () => {
      
    };
  }, []);

  const latLngArray: LatLng[] = reviewData?.locations
    ? reviewData?.locations
    .filter((location) => location.coords)
    .map((location) => ({
      latitude: location.coords!.latitude,
      longitude: location.coords!.longitude,
    })
  ) : [];

  return (


    <View>
      {reviewData && 
        <View className='flex '>
          {/* Title*/}
          <View className="bg-white h-[5%]">
            <View className='flex flex-row flex-wrap p-1 mt-auto'>
              <TouchableOpacity className='' onPress={router.back}>
                <Ionicons name="arrow-back-outline" size={26} color={DEFAULT_COLOR}/>
              </TouchableOpacity>
              <View className="border-l border-gray-300 mx-1"/>
              <View className='mx-1'>
                <Text className={`text-xl text-[${ratingColor(reviewData.rating)}] font-bold`}>{reviewData.rating}</Text>
              </View>
              
              <View className="border-l border-gray-300 mx-1"/>
              <ScrollView horizontal>
                <Text className='text-xl'>{reviewData.title}             </Text>

                
              </ScrollView>
              {/* Tags*/}
              <View className='flex-row ml-auto items-center'>
                {reviewData.type!="" &&<View><AppTag extraClassName='bg-orange-500'>
                  <Text className='text-white'>{reviewData.type}</Text>
                  </AppTag></View>
                }
                {reviewData.routeName!="" &&<View><AppTag extraClassName='bg-blue-500'>
                    <Text className='text-white'>{reviewData.routeName}</Text>
                  </AppTag></View>
                }
                
              </View>
            </View>
            <View className="border-b border-gray-300"/>
          </View>
          

          <ScrollView className='h-[95%]'>
            <View className='px-1 h-auto'>
              

              {/* Main Info*/}
              <View className='flex flex-row flex-wrap items-center'>

                <Text className='font-bold text-blue-500 text-[15px]'>{reviewData.posterName}</Text>
                <Text className="ml-auto my-auto text-[15px]">{reviewData.postedAt.toLocaleString("zh-HK")}</Text>

                <TouchableOpacity className="mx-1"onPress={()=>setShowDetail(!showDetail)}>
                  <Ionicons name={showDetail?"chevron-up-outline": "chevron-down-outline"} size={25}/>
                </TouchableOpacity>
              </View>

              {/* Other Info*/}
              {showDetail && <View className='px-3'>
                  <View className='flex-row'>
                    <Text className='text-orange-500'>Registration Mark</Text>
                    <Text className='ml-auto'>{reviewData.registrationMark? reviewData.registrationMark : "Not Specified"}</Text>
                  </View>
                    
                    
                  <View className='flex-row'>
                    <Text className='text-orange-500'>Driver Identity</Text>
                    <Text className='ml-auto'>{reviewData.driverIdentity? reviewData.driverIdentity : "Not Specified"}</Text>
                  </View>
                  
                </View>
              }


              
              
              {/* Main Content*/}
              <Text className='mx-2 mb-2 text-[15px]'>{reviewData.content}</Text>
              
              {/* Image Section */}
              <View className='flex flex-row flex-wrap mb-1'>
                {reviewData.images.map((data,index)=>(
                  <TouchableOpacity 
                    className='' 
                    key={index} 
                    onPress={()=>{
                      setImageVisible(true);
                      setImageIndex(index);
                    }}
                  >
                    <Image
                      source={{uri: data}}
                      className={`w-[23vw] h-[23vw] ${index%4==3?"":" mr-[2vw]"}`}
                    >
                    </Image>
                  </TouchableOpacity>
                  
                ))}
                
              </View>
              <ImageView
                images={reviewData.images.map((data)=>({uri: data}))}
                imageIndex={imageIndex}
                visible={imageVisible}
                onRequestClose={() => setImageVisible(false)}
              />


              {/* MAP */}

              {reviewData.locations.length>0 && <View className='mb-1 bg-zinc-300 rounded-lg pb-1'>
                <View className='flex flex-row flex-wrap items-center'>

                  <Text className="ml-auto my-auto text-[15px]">Show Route</Text>

                  <TouchableOpacity className="mx-1"onPress={()=>setShowMap(!showMap)}>
                    <Ionicons name={showMap?"chevron-up-outline": "chevron-down-outline"} size={25}/>
                  </TouchableOpacity>
                </View>
                {showMap && <View className='h-25 items-center mb-1'>
                  <MapView ref={mapRef}
                    style={{
                      width: Dimensions.get('screen').width*0.95,
                      height: Dimensions.get('screen').height*0.3,
                    }}
                    initialRegion={{
                      latitude: reviewData.locations[0].coords? reviewData.locations[0].coords.latitude: 0,
                      longitude: reviewData.locations[0].coords? reviewData.locations[0].coords.longitude: 0,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Polyline
                      coordinates={latLngArray}
                      strokeColor="#0000FF"
                      strokeWidth={4}
                    />
                    <Marker  id='marker_start'
                      coordinate={{
                        latitude: reviewData.locations[0].coords? reviewData.locations[0].coords.latitude: 0,
                        longitude: reviewData.locations[0].coords? reviewData.locations[0].coords.longitude: 0,
                      }}
                      pinColor={'green'}
                      title="Start"
                      description={(3.6*(reviewData.locations[0].coords?.speed || 0)).toFixed(2)+ " km/h"}
                    />

                    {reviewData.locations && reviewData.locations.map((loc,index)=>{
                      if (index!=0 && index!=reviewData.locations.length-1) {
                        const secSinceEpoch= loc.timestamp || 0;
                        const date = new Date(0);
                        date.setUTCMilliseconds(secSinceEpoch);
                        const dateFormatted = secSinceEpoch==0? "": format(date, 'dd/MM/yyyy HH:mm');

                        return <Marker key={index} id='marker'
                        coordinate={{
                          latitude: loc?.coords?.latitude ?? 0,
                          longitude: loc?.coords?.longitude ?? 0,
                        }}
                        image={require('@/assets/images/pin.png')}
                        title={dateFormatted}
                        description={(3.6*(loc.coords?.speed || 0)).toFixed(2)+ " km/h"}
                      />
                      }
                      
                      
                    })
                      
                    }


                    <Marker id='marker_end'
                      coordinate={{
                        latitude:  reviewData.locations[reviewData.locations.length-1].coords?.latitude || 0,
                        longitude: reviewData.locations[reviewData.locations.length-1].coords?.longitude ||  0,
                      }}
                      title="End"
                      description={(3.6*(reviewData.locations[reviewData.locations.length-1].coords?.speed || 0)).toFixed(2) + " km/h"}
                    />
                  </MapView>
                  <View className='flex-row w-[100%] px-2'>
                    <Text className='mr-auto'>Average: {(3.6*Object.values(reviewData.locations).reduce((total, current) => current.coords?.speed? total + current.coords.speed: total, 0) / reviewData.locations.length).toFixed(2)} km/h</Text>
                    <Text className='ml-auto'>Top: {(3.6*Object.values(reviewData.locations).reduce((top, current) => {
                          const current_speed = current.coords?.speed? current.coords?.speed : 0
                          return Math.max(current_speed, top)
                      },0
                    )).toFixed(2)} km/h</Text>
                  </View>
                </View>}
              </View>}


              
              {/* Up/Down Vote Section */}
              <View className='flex flex-row flex-wrap mb-1'>
                <AppButton onClick={upvote} extraClassName='p-2'> 
                  
                  <Ionicons name={profile.upvotedReviews.includes(reviewData.id)?"thumbs-up": "thumbs-up-outline"} size={20}/>
                  <Text className="font-bold"> {reviewData.upvoteCount}</Text>
                </AppButton>
                <AppButton onClick={downvote} extraClassName='p-2'>
                  <Ionicons name={profile.downvotedReviews.includes(reviewData.id)?"thumbs-down": "thumbs-down-outline"} size={20}/>
                  <Text className="font-bold"> {reviewData.downvoteCount}</Text>
                </AppButton>
              </View>
              



              <AppButton onClick={fetchGetReview}>
                <Text className="font-bold">Refresh</Text>
              </AppButton>


              {/* Comment Section */}
              <View className='mt-2'>
                <Text className='text-xl mb-1'>{reviewData.comments.length} Comment(s)</Text>

                <View className='flex flex-row mb-2'>
                  <TextInput
                    className='flex-1 border rounded p-1 mr-1'
                    value={comment}
                    onChangeText={onCommentChange}
                    placeholder='New Comment...'
                  />
                  <AppButton onClick={postComment}>
                    <Text className="font-bold px-2">Comment</Text>
                  </AppButton>
                </View>

                {reviewData.comments && reviewData.comments.map((value,index)=>(<Card key={index} data={value}/>))}
              </View>
            </View>
          </ScrollView>
        </View>
          
      }
    </View>
  )
}

export default ReviewDetail