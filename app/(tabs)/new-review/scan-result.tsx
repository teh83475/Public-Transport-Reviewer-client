import { View, Text, ScrollView, TextInput, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import AppButton from '@/app/components/app-button'
import { Box, Canvas, DiffRect, Group, Image, Rect, rect, RoundedRect, rrect, useImage} from '@shopify/react-native-skia'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { setDriverId, setPlate } from '@/service/redux/newReviewSlice'








const ScanResult = () => {
  const dispatch = useDispatch();
  const {media, type, scanResultString, target} = useLocalSearchParams()
  const [scanResult,setscanResult] = React.useState(    JSON.parse(scanResultString as string)  );

  const [EditedResult,setEditedResult] = React.useState(
    scanResult.blocks != undefined? 
    scanResult.blocks.map((value: { blockText: string })=>{
      return value.blockText+'\n';
    }).join(''): ""
  );
  const [blockSelection,setBlockSelection] = React.useState( 
    scanResult.blocks != undefined?
    Array<boolean>(scanResult.blocks.length).fill(true):
    Array<boolean>()
  );    
  const scannedImage = useImage(`file://${media}`)!


  const OnImagePressed = (x: number, y: number )=> {
    if (scanResult == undefined) return;

    scanResult.blocks.forEach((value: any, index: number) => {
      const block_width = value.blockFrame.width;
      const block_height = value.blockFrame.height;
      const block_x = (value.blockFrame.x- block_width/2 -5) /480 *Dimensions.get('window').width ;     
      const block_y = (value.blockFrame.y- block_height/2 -5) /480 *Dimensions.get('window').width ;
      
      if (x>block_x && x<block_x+block_width && y>block_y && y<block_y+block_height) {
        console.log(
          "hit" 
        );
        const newBlockSelection= [... blockSelection];
        newBlockSelection[index]=!newBlockSelection[index];
        setBlockSelection(newBlockSelection);
        setEditedResult(
          scanResult.blocks.map((value: { blockText: string }, idx: number)=>{
            return (newBlockSelection[idx]?value.blockText+'\n':"");
          }).join('')
        );
      }
    }); 
    
  }



  const gesture =  Gesture.Tap().onEnd(({ x, y }) => {
    'worklet'
    console.log(x,y);
    runOnJS(OnImagePressed)( x, y )
  })

  

  const navigateBack = () => {
    if (target =="plate") {
      dispatch(setPlate(EditedResult))

    } else {
      dispatch(setDriverId(EditedResult))

    }
    

    router.navigate({
      pathname: './',
    });
  }

  const RevertChange = () => {
    if (scanResult.blocks == undefined) return;
    setBlockSelection(Array<boolean>(scanResult.blocks.length).fill(true));
    setEditedResult(
      scanResult.blocks.map((value: { blockText: string }, idx: number)=>{
        return (blockSelection[idx]?value.blockText+'\n':"");
      }).join('')
    );
  }


  const IndicationRectangle = (props: {data : any, idx: React.Key|null|undefined}) => {
    const width = props.data.blockFrame.width;
    const height = props.data.blockFrame.height;
    const x = (props.data.blockFrame.x- width/2 -5) /480 *Dimensions.get('window').width ;
    const y = (props.data.blockFrame.y- height/2 -5) /480 *Dimensions.get('window').width ;
    return (        
      <DiffRect inner={rrect(rect(0, 0, 0, 0), 6, 6)} outer={rrect(rect(x, y, width, height), 12, 12)} color={(blockSelection[props.idx as number]?"light green":"light grey")} />
    )
  }
  

  return (

    <ScrollView className='flex h-full '>
      <View className='flex-none w-100 aspect-[3/4] '>
        {scannedImage && 
          <GestureDetector gesture={gesture}>
            <Canvas className="w-[100%] bg-slate-400" style={{ flex: 1 }}>
              <Image image={scannedImage} fit="contain" x={0} y={0} width={Dimensions.get('window').width} height={scannedImage.height()/scannedImage.width()*Dimensions.get('window').width } />
              {scanResult.blocks != undefined &&
                <Group opacity={0.5}>
                {scanResult && scanResult.blocks.map((value: any, index: React.Key | null | undefined)=>(<IndicationRectangle key={index} idx={index} data={value} />))}
              </Group>}
            </Canvas>
          </GestureDetector>
        }
        
      </View>
          <TextInput
            className={`flex-grow h-40 border mx-1 mt-1 rounded-xl p-1`}
            onChangeText={setEditedResult}
            defaultValue={EditedResult as string}
            style={{ textAlignVertical : "top" }}
            value = {EditedResult as string}
            multiline
          />
          
        
        
        
     <View className='flex-none flex-row ml-auto  '>
            <AppButton onClick={RevertChange} extraClassName='border-0 px-4'>
              <Ionicons name="return-down-back-outline" size={32} />
              <Text className="ml-1 font-bold text-[16px]">Reset</Text>
            </AppButton>
            <AppButton onClick={navigateBack} extraClassName='border-0 px-4'>
              <Ionicons name="checkmark-outline" size={32} />
              <Text className="ml-1 font-bold text-[16px]">Confirm</Text>
            </AppButton>
          </View>
      
    </ScrollView>
  )
}

export default ScanResult