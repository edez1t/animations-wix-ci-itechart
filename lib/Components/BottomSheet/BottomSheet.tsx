import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { NavigationFunctionComponent } from 'react-native-navigation'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Button } from 'lib/Components/Button'

const springConfig = {
  damping: 80,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 1000,
}

export const BottomSheet: NavigationFunctionComponent = () => {
  const { height: windowHeight } = useWindowDimensions()
  const bottomSheetHeight = windowHeight / 2

  const top = useSharedValue(windowHeight)

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, springConfig),
    }
  })

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startTop: number }>({
    onStart(_, context) {
      context.startTop = top.value
    },
    onActive(event, context) {
      event.translationY > 0 && (top.value = context.startTop + event.translationY)
    },
    onEnd() {
      top.value > bottomSheetHeight + 200 ? (top.value = windowHeight) : (top.value = bottomSheetHeight)
    },
  })

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          onPress={() => {
            top.value = withSpring(bottomSheetHeight, springConfig)
          }}
        >
          Open
        </Button>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#bb86fc',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            style,
          ]}
        >
          <View
            style={{
              height: 5,
              width: 30,
              backgroundColor: 'black',
              opacity: 0.3,
              alignSelf: 'center',
              marginTop: 15,
              borderRadius: 50,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

BottomSheet.options = {
  topBar: {
    title: {
      text: 'Bottom Sheet',
    },
  },
}
