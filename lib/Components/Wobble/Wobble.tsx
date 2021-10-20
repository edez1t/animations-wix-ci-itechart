import React from 'react'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated'
import { Button } from '../Button'

const ANGLE = 10
const TIME = 100
const EASING = Easing.elastic(1.5)

export const Wobble: React.FC = () => {
  const rotation = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    }
  })

  return (
    <Animated.View style={style}>
      <Button
        onPress={() => {
          rotation.value = withSequence(
            withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
            withRepeat(withTiming(ANGLE, { duration: TIME, easing: EASING }), 7, true),
            withTiming(0, { duration: TIME / 2, easing: EASING })
          )
        }}
      >
        Press Me
      </Button>
    </Animated.View>
  )
}
