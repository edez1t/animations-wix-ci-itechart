import React from 'react'
import { View, Button, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const springConfig = {
  damping: 80,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 1000,
}

export const BottomSheet: React.FC = () => {
  const { height: windowHeight } = useWindowDimensions()

  const top = useSharedValue(windowHeight)

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, springConfig),
    }
  })
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startTop: number
    }
  >({
    onStart(_, context) {
      context.startTop = top.value
    },
    onActive(event, context) {
      event.translationY > 0 && (top.value = context.startTop + event.translationY)
    },
    onEnd() {
      top.value > windowHeight / 2 + 200 ? (top.value = windowHeight) : (top.value = windowHeight / 2)
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
          title='open'
          onPress={() => {
            top.value = withSpring(windowHeight / 2, springConfig)
          }}
        />
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'skyblue',
              borderRadius: 20,
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
