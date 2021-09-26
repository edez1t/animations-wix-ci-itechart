import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export const Opacity: React.FC = () => {
  const animation = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animation.value, { duration: 1000 }, () => {
      animation.value = 1
    }),
  }))

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View style={animatedStyle}>
        <TouchableWithoutFeedback onPress={() => (animation.value = 0)}>
          <View
            style={{
              borderRadius: 20,
              width: 200,
              height: 200,
              backgroundColor: 'skyblue',
            }}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  )
}
