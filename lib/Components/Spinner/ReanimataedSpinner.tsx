import React, { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  interpolate,
  Easing,
  interpolateColor,
} from 'react-native-reanimated'

export const ReanimataedSpinner: React.FC = () => {
  const animation = useSharedValue(0)

  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 1], [0, 360])
  })

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + 'deg' }],
    }
  })

  const color = useDerivedValue(() => {
    return interpolateColor(animation.value, [0, 0.5, 1], ['#00B3E6', '#FF33FF', '#00B3E6'])
  })

  const animatedColor = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
    }
  })

  const startAnimation = () => {
    animation.value = withRepeat(
      withTiming(1, {
        easing: Easing.linear,
        duration: 1200,
      }),
      -1
    )
  }

  useEffect(() => {
    startAnimation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View
      style={[
        {
          width: 30,
          height: 30,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
        animatedRotation,
      ]}
    >
      <Animated.View
        style={[
          {
            width: '20%',
            height: '100%',
            borderRadius: 50,
          },
          animatedColor,
        ]}
      />
    </Animated.View>
  )
}
