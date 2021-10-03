import React, { useRef } from 'react'
import { Animated, View, PanResponder, Text } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'

export const DragAndRelease: NavigationFunctionComponent = () => {
  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()
      },
    })
  ).current

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Drag & Release</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: 'red',
            borderRadius: 75,
          }}
        />
      </Animated.View>
    </View>
  )
}

DragAndRelease.options = {
  topBar: {
    title: {
      text: 'Drag And Release',
    },
  },
}
