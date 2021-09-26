import React from 'react'
import { View, Button, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { NavigationFunctionComponent } from 'react-native-navigation'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export const BottomSheet: NavigationFunctionComponent = () => {
  return <></>
}

BottomSheet.options = {
  topBar: {
    visible: false,
  },
}
