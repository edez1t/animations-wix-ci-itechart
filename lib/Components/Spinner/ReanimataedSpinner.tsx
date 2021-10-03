import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  interpolate,
  Easing,
} from 'react-native-reanimated'

export const ReanimataedSpinner: React.FC = () => {
  const animation = useSharedValue(0)

  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 1], [0, 360])
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + 'deg' }],
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
        animatedStyle,
      ]}
    >
      <View
        style={{
          width: '20%',
          height: '100%',
          backgroundColor: 'black',
          borderRadius: 50,
        }}
      />
    </Animated.View>
  )
}
