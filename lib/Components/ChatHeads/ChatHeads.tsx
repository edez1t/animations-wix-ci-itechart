import React from 'react'
import { useWindowDimensions, View } from 'react-native'

import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { colors } from '../../mockData'

const HEAD_SIZE = 70

const ChatHeads: React.FC = ({ children }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  type AnimatedGHContext = {
    startX: number
    startY: number
  }
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, context) => {
      context.startX = translateX.value
      context.startY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX
      translateY.value = context.startY + event.translationY
    },
    onEnd: (event) => {
      const width = windowWidth - HEAD_SIZE
      const height = windowHeight - HEAD_SIZE - 150
      const toss = 0.2
      function clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max)
      }
      const targetX = clamp(translateX.value + toss * event.velocityX, 0, width)
      const targetY = clamp(translateY.value + toss * event.velocityY, 0, height)

      const top = targetY
      const bottom = height - targetY
      const left = targetX
      const right = width - targetX
      const minDistance = Math.min(top, bottom, left, right)
      let snapX = targetX
      let snapY = targetY
      switch (minDistance) {
        case top:
          snapY = 0
          break
        case bottom:
          snapY = height
          break
        case left:
          snapX = 0
          break
        case right:
          snapX = width
          break
      }
      translateX.value = withSpring(snapX, {
        velocity: event.velocityX,
      })
      translateY.value = withSpring(snapY, {
        velocity: event.velocityY,
      })
    },
  })

  const animatedTransform = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  const childrenArray = React.Children.toArray(children)

  return (
    <>
      {childrenArray.length > 1 && (
        <Followers children={childrenArray.slice(1)} translateX={translateX} translateY={translateY} />
      )}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[{ position: 'absolute' }, animatedTransform]}>{childrenArray[0]}</Animated.View>
      </PanGestureHandler>
    </>
  )
}

type FollowersProps = {
  readonly translateX: Animated.SharedValue<number>
  readonly translateY: Animated.SharedValue<number>
}
const Followers: React.FC<FollowersProps> = ({ translateX, translateY, children }) => {
  const myTranslateX = useDerivedValue(() => {
    return withSpring(translateX.value)
  })
  const myTranslateY = useDerivedValue(() => {
    return withSpring(translateY.value)
  })

  const animatedTransform = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: myTranslateX.value,
        },
        {
          translateY: myTranslateY.value,
        },
      ],
    }
  })

  const childrenArray = React.Children.toArray(children)

  return (
    <>
      {childrenArray.length > 1 && (
        <Followers children={childrenArray.slice(1)} translateX={myTranslateX} translateY={myTranslateY} />
      )}
      <Animated.View style={[{ position: 'absolute' }, animatedTransform]}>{childrenArray[0]}</Animated.View>
    </>
  )
}

export const ChatHeadsScreen: NavigationFunctionComponent = () => {
  return (
    <ChatHeads>
      <View style={[styles.head, { backgroundColor: colors[0] }]} />
      <View style={[styles.head, { backgroundColor: colors[1] }]} />
      <View style={[styles.head, { backgroundColor: colors[2] }]} />
      <View style={[styles.head, { backgroundColor: colors[3] }]} />
    </ChatHeads>
  )
}

ChatHeadsScreen.options = {
  topBar: { title: { text: 'Chat Heads' } },
}

const styles = StyleSheet.create({
  head: {
    width: HEAD_SIZE,
    height: HEAD_SIZE,
    borderRadius: HEAD_SIZE / 2,
  },
})
