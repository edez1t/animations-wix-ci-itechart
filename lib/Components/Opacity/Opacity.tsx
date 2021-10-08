import React, { useEffect } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type OpacityProps = {
  openedAs: 'modal' | 'stack' | 'side menu'
}

export const Opacity: NavigationFunctionComponent<OpacityProps> = ({ openedAs, componentId }) => {
  useEffect(() => {
    const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => buttonId === 'dismiss' && Navigation.dismissModal(componentId)
    )

    return () => navigationButtonEventListener.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animation = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animation.value, { duration: 1000 }, () => {
      animation.value = 1
    }),
  }))

  return (
    <>
      <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Opened as: {openedAs}</Text>
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
    </>
  )
}
