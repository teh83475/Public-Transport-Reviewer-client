import { View, Text, StyleSheet, SafeAreaView, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { 
  Camera, 
  CameraPermissionStatus, 
  Point, 
  runAtTargetFps, 
  useCameraDevice, 
  useCameraPermission, 
  useFrameProcessor 
} from 'react-native-vision-camera'
import { useTextRecognition} from "react-native-vision-camera-text-recognition"
import { TextRecognitionOptions } from 'react-native-vision-camera-text-recognition/lib/typescript/src/types'
import { useRunOnJS, useSharedValue } from 'react-native-worklets-core'
import { router, useLocalSearchParams } from 'expo-router'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { crop } from 'vision-camera-cropper';


const ScanCamera = () => {
  const { target} = useLocalSearchParams();
  const device = useCameraDevice('back')!
  const camera = useRef<Camera>(null)
  const options : TextRecognitionOptions = { language : 'latin' }
  const {scanText} = useTextRecognition(options)

  const TARGET_FPS = 1

  const { hasPermission } = useCameraPermission()

  const [zoomValue, setZoomValue] = useState(device?.neutralZoom)
  const [torch, seTorch] = useState<"off" | "on" | undefined>("off")

  const [scannedText, setScannedText] = useState<string>("")
  const [scannedResult, setScannedResult] = useState<string>("{}")

  const [croppedFrame, setCroppedFrame] = useState<string>("")

  const updateScannedText = useRunOnJS((result:any) => {
    setScannedText(result.resultText)
    console.log(JSON.stringify(result))
    setScannedResult(JSON.stringify(result))
  },[])

  const updateCroppedFrame = useRunOnJS((frame:any) => {
    setCroppedFrame(frame)
  },[])

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    runAtTargetFps(TARGET_FPS, () => {
      'worklet'
      try {
        const data = scanText(frame) as any 
        console.log(frame.width, frame.height)
        //console.log(data, 'data')
        if (data !== undefined){
          console.log(data)
          const result = data.resultText
          //console.log(result, '<- Scanned REsult')
          if (result !== undefined){
            updateScannedText(data)
          }

          const cropRegion = {
            left:0,
            top:0,
            width:640,
            height:480
          }
          const croppedResult = crop(frame,{includeImageBase64:true,saveAsFile:true});

          updateCroppedFrame(croppedResult.path)
        }
        
      } catch (e) {
        console.log(e)
      }
      
    })
    
  }, [])

  const focus = useCallback((point: Point) => {
    const cam = camera.current
    if (cam == null) return
    cam.focus(point)
  }, [])

  const gesture = Gesture.Tap().onEnd(({ x, y }) => {
    console.log(x,y)
    runOnJS(focus)({ x, y })
  })

    


  const takePhoto = async () => {
    try {
      if (camera.current == null){
        throw new Error("No camera reference")
      }
      
      console.log("picture time")
      const photo = await camera.current.takePhoto({
        enableShutterSound: false,
      })

      router.replace({  
        pathname: "./scan-result",
        params: {
          media: croppedFrame, 
          type: 'photo', 
          scanResultString: scannedResult, 
          target: target
        }  // photo.path
      })
    } catch (e) {
      console.log(e)
    }
  }


  if (!hasPermission) return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>no permission</Text>
    </View>
  )
  
  if (device == null) return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>no camera</Text>
    </View>
  )



  return (
    
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <View className={`w-full aspect-[3/4] rounded`}>
        <GestureDetector gesture={gesture}>
          <Camera
            photo={true}
            ref={camera}
            className='flex-1'
            device={device}
            isActive={true}
            resizeMode="contain"// contain || cover
            torch={torch}
            enableZoomGesture={true}
            frameProcessor={frameProcessor}
          />
        </GestureDetector>
      </View>
      
      <View className='flex-1'>
        
        <View className='flex-1 rounded-3xl bg-gray-300 px-3 py-2 pb-4 m-1'>
          <ScrollView>
            <Text>{scannedText}</Text>
          </ScrollView>
        </View>
        <View className='w-[100%] items-center mb-2'>
          <TouchableOpacity className='h-16 w-16 border-[3px] rounded-full items-center justify-center' onPress={takePhoto}>
            <View className='h-12 w-12 rounded-full bg-black'/>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
    
  )
}

export default ScanCamera