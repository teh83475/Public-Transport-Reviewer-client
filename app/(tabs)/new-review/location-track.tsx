import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import React, { useEffect, useRef } from 'react'
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { Marker, Polyline} from "react-native-maps";
import { LatLng, TrackedLocation } from '@/constants/Type'
import { useSelector } from 'react-redux';
import store from '@/service/redux/store';
import { selectTrackedLocations, setLocationSlice } from '@/service/redux/trackedLocationSlice';
import { format } from 'date-fns';
import AppButton from '@/app/components/app-button';
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { DEFAULT_COLOR } from '@/constants/Colors';

const LOCATION_TRACKING = 'location-tracking';

var l1;
var l2;

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  
  if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
  }
  if (data) {
      const { locations } = data as any;    //stupid as always
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      l1 = lat;
      l2 = long;

      console.log(
          `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
      );

      console.log("hi1")
      try{
        if(locations[0] && locations[0].coords){
  
          store.dispatch(setLocationSlice(
            [
              locations[0]
            ]
          ))
          console.log("hi2")
        }
      }
      catch(error){
        console.log(error)
        store.dispatch(setLocationSlice(
          [
            //...locations,
            {error: (error as Error).message}
          ]
        ))
      }
  }
});

const LocationTrack = () => {
  const locations: TrackedLocation[] = useSelector(selectTrackedLocations).locations;
  const mapRef = useRef<MapView>(null);
  const [locationStarted, setLocationStarted] = React.useState(false);

  const startLocationTracking = async () => {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 10000,
          distanceInterval: 10,
      });
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
          LOCATION_TRACKING
      );
      setLocationStarted(hasStarted);
      console.log('tracking started?', hasStarted);
  };

  useEffect(() => {
      
  }, []);

  const startLocation = () => {
      startLocationTracking();
  }

  const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
      .then((tracking) => {
          if (tracking) {
              Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
          }
      })
  }

  const getIsStarted = async ()=> {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setLocationStarted(hasStarted);
  }

  useEffect(() => {
    getIsStarted();

    const config = async () => {
      let resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();
      if (resf.status != 'granted' && resb.status !== 'granted') {
          console.log('Permission to access location was denied');
      } else {
          console.log('Permission to access location granted');
      }
    };
    config();

    console.log('locations redux:', locations);
    if(mapRef.current){
      const theLocaiton = locations[locations.length-1]
      if (theLocaiton?.coords)
      mapRef.current.animateToRegion({
        latitude: theLocaiton.coords?.latitude,
        longitude: theLocaiton.coords?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  }, [locations]);
  
  const latLngArray: LatLng[] = locations
    ? locations
    .filter((location) => location.coords)
    .map((location) => ({
      latitude: location.coords!.latitude,
      longitude: location.coords!.longitude,
    })
  ) : [];

    return (
        <View>
          <View className="bg-white h-[7%]">
            <View className='flex flex-row flex-wrap p-1 mt-auto my-auto items-center'>
              <TouchableOpacity className='' onPress={router.back}>
                <Ionicons name="arrow-back-outline" size={26} color={DEFAULT_COLOR}/>
              </TouchableOpacity>
              

              <Text className='text-xl ml-2'>Route Track</Text>

            </View>
            <View className="border-b border-gray-300"/>
          </View>
          <View className='items-center mb-1 pt-3'>
            <MapView ref={mapRef}
              style={{
                width: Dimensions.get('screen').width*0.95,
                height: Dimensions.get('screen').height*0.7,
              }}
            >
              {locations.length>0 && <View>
                <Polyline
                  coordinates={latLngArray}
                  strokeColor="#0000FF"
                  strokeWidth={4}
                />
                <Marker  id='marker_start'
                  coordinate={{
                    latitude: locations[0].coords? locations[0].coords.latitude: 0,
                    longitude: locations[0].coords? locations[0].coords.longitude: 0,
                  }}
                  pinColor={'green'}
                  title="Start"
                  description={(3.6*(locations[0].coords?.speed || 0)).toFixed(2)+ " km/h"}
                />

                {locations && locations.length>2 && locations.map((loc,index)=>{
                  if (index!=0 && index!=locations.length-1) {
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


                {locations.length>1 && <Marker id='marker_end'
                  coordinate={{
                    latitude:  locations[locations.length-1].coords?.latitude || 0,
                    longitude: locations[locations.length-1].coords?.longitude ||  0,
                  }}
                  title="End"
                  description={(3.6*(locations[locations.length-1].coords?.speed || 0)).toFixed(2) + " km/h"}
                />}
              </View>}
              
            </MapView>
            
          </View>


          {locationStarted ?
              <AppButton onClick={stopLocation}>
                  <Text className=''>Stop Tracking</Text>
              </AppButton>
              :
              <AppButton onClick={startLocation}>
                  <Text className=''>Start Tracking</Text>
              </AppButton>
          }
          
        </View>
    );
}

const styles = StyleSheet.create({
    btnText: {
      fontSize: 20,
      backgroundColor: 'green',
      color: 'white',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    map: {
      width: Dimensions.get('screen').width*0.899,
      height: Dimensions.get('screen').height*0.8,
    },
});


 




export default LocationTrack



