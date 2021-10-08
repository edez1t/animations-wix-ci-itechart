import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

export const NativeSpinner: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current

  const color = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#00B3E6', '#FF33FF', '#00B3E6'],
  })

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      {
        iterations: -1,
      }
    ).start()
  }

  useEffect(() => {
    startAnimation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const style = [
    {
      transform: [
        {
          rotate: rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    },
  ]

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
        style,
      ]}
    >
      <Animated.View
        style={{
          width: '20%',
          height: '100%',
          borderRadius: 50,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  )
}
