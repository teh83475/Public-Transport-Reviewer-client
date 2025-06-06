import { View, Text, Button, StyleSheet, TextInput, Pressable, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import Toast from 'react-native-toast-message'
import { router, useLocalSearchParams } from 'expo-router'
import { CreateReview } from '@/service/serverAPI'
import { test_uuid } from '@/constants/Server'
import AppButton from '@/app/components/app-button'
import AppDropdown from '@/app/components/app-dropdown'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { DANGER_COLOR, DEFAULT_COLOR, SECONDARY_COLOR } from '@/constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { selectNewReview, setDriverId, setPlate } from '@/service/redux/newReviewSlice'
import { selectTrackedLocations } from '@/service/redux/trackedLocationSlice'
import { TrackedLocation } from '@/constants/Type'


const transportType = [
  { label: 'Bus', value: 'BUS' },
  { label: 'Minibus', value: 'MINIBUS' },
  { label: 'Train', value: 'TRAIN' },
  { label: 'Taxi', value: 'TAXI' },
  { label: 'Other', value: 'OTHER' },
];

const ratingOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

const updateOptions = [
  { label: 'Yes', value: "true" },
  { label: 'No', value: "false" },
];

const NewReview = () => {
  const locations: TrackedLocation[] = useSelector(selectTrackedLocations).locations;
  const { plate, driver_id } = useLocalSearchParams();
  const new_review_extra = useSelector(selectNewReview);
  const dispatch = useDispatch();

  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')!

  const [title, onTitleChange] = React.useState('');
  const [content, onContentChange] = React.useState('');
  const [rating, onRatingChange] = React.useState('');
  const [type, onTypeChange] = React.useState('');
  const [route, onRouteChange] = React.useState('');
  const [isUpdateSummary, onIsUpdateSummary] = React.useState<string>("true");

  const postReviews = async () => {
    const updateSummary = isUpdateSummary=="true";
    const result = await CreateReview(title, content, parseInt(rating) , test_uuid, type, route, images, updateSummary, locations, new_review_extra.plate, new_review_extra.driver_id);
    if (result!="SUCCESS") {
      Toast.show({
        type: 'error',
        text1: "You need to login to post review.",
      });
      return;
    }
    Toast.show({
      type: 'success',
      text1: "Success!",
    });


  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages.push(result.assets[0]);
      setImages(newImages);
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index,1);
    setImages(newImages);
  }

  const launchScanCamera = async (target: string) => {
    if (!hasPermission) {
      const requestResult = await requestPermission()
      if (!requestResult) {
        Toast.show({
          type: 'error',
          text1: 'No Permission',
          text2: 'Camera cannot be accessed. 👋'
        });
        return
      }
    }

    if (device == null) {
      Toast.show({
        type: 'error',
        text1: 'No Camera',
        text2: 'Camera is not found. 👋'
      })
      return
    }
      
    router.push({
      pathname: "./new-review/scan-camera",
      params: {        
        target : target
      }
    }) //, { relativeToDirectory: true }
  }

  return (
    <View className="w-[100%] h-auto px-[1vw]">
      <View className="bg-white h-[7%]">
        <View className='flex flex-row flex-wrap p-1 mt-auto my-auto items-center'>
          <Text className='text-xl ml-2'>New Review</Text>
        </View>
        <View className="border-b border-gray-300"/>
      </View>
        <ScrollView className='grow h-[93%]'>{/*  bg-red-200 */}
        <View className='h-auto'>{/*bg-red-100*/}
        {/* <Text className='font-bold'>Update summary(LEAVE IT TO FALSE):</Text>
        <AppDropdown extraClassName="h-20" placeholder="No" options={updateOptions} onChange={onIsUpdateSummary}/> */}
        <Text className='font-bold'>Title:</Text>
        <TextInput
          className='border'
          onChangeText={onTitleChange}
          
        />
        <Text className='font-bold'>Content:</Text>
        <TextInput
          className='border h-[170px] p-1'
          style={{ textAlignVertical : "top" }}
          onChangeText={onContentChange}
          multiline
        />

        <Text className='font-bold'>Rating:</Text>
        <AppDropdown extraClassName="h-10 mb-2" placeholder="Select Rating" options={ratingOptions} onChange={onRatingChange}/>
        <Text className='font-bold'>Transportation type:</Text>
        <AppDropdown extraClassName="h-10 mb-2" placeholder="Select Type" options={transportType} onChange={onTypeChange}/>
        {/* <Text>{type}</Text> */}

        <Text className='font-bold'>Route:</Text>
        <TextInput
          className='border'
          onChangeText={onRouteChange}
        />

        <Text className='font-bold'>Registration Mark:</Text>
        <View className='flex-row'>
          <TextInput
            className='border flex-1'
            onChangeText={(plate)=>dispatch(setPlate(plate))}
            defaultValue={plate as string}
            value ={new_review_extra.plate}
          />
          <AppButton extraClassName="mx-1 "onClick={()=>launchScanCamera("plate")}>
            <Text className="font-bold mx-3">Scan</Text>
          </AppButton>
        </View>
        
        

        <Text className='font-bold'>Driver Identity:</Text>
        <View className='flex-row'>
          <TextInput
            className='border flex-1'
            onChangeText={(id)=>dispatch(setDriverId(id))
            }
            defaultValue={driver_id as string}
            value ={new_review_extra.driver_id}
          />
          <AppButton extraClassName="mx-1 "onClick={()=>launchScanCamera("driver_id")}>
            <Text className="font-bold mx-3">Scan</Text>
          </AppButton>
        </View>

        
        <AppButton extraClassName="mt-1" onClick={()=>router.push({pathname: "./new-review/location-track"})}>
          <Text className="font-bold">Track Location</Text>
        </AppButton>

        <Text className='font-bold'>Images:</Text>
        <View className='flex flex-row flex-wrap'>
          {images.map((data,index)=>(
            <ImageBackground
              key={index}
              source={{uri: data.uri}}
              className={`w-[23vw] h-[23vw] ${index%4==3?"":" mr-[2vw]"}`}
            >
              <TouchableOpacity onPress={()=>removeImage(index)}>
                <Ionicons name="close" size={25} color={DANGER_COLOR}/>
              </TouchableOpacity>
            </ImageBackground>
          ))}
          {images.length>=8?"":
            <TouchableOpacity className=" " onPress={pickImage}>
              <Ionicons name="add-circle-outline" size={Dimensions.get('window').width*0.22} color={SECONDARY_COLOR}/>
            </TouchableOpacity>}
          
        </View>

        
        <AppButton onClick={postReviews}>
          <Text className="font-bold">create review</Text>
        </AppButton>
        </View>
      </ScrollView>

    </View>
  );
}


export default NewReview