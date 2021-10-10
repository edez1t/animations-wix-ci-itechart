import React, { useRef, useState } from 'react'
import {
  Animated,
  View,
  Text,
  ScrollView,
  ColorValue,
  PanResponder,
  useWindowDimensions,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { colors } from 'lib/mockData'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export const SwipeableCards: NavigationFunctionComponent = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20 }}>
      {colors.map((color, index) => (
        <Card key={index} color={color} />
      ))}
    </ScrollView>
  )
}

const Card: React.FC<{ color: ColorValue }> = ({ color }) => {
  const [swiped, setSwiped] = useState(false)
  const { width: windowWidth } = useWindowDimensions()

  const position = useRef(new Animated.Value(0)).current
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, { dx }) => {
        swipe(dx)
      },
    })
  ).current

  const rotate = position.interpolate({
    inputRange: [-windowWidth, windowWidth],
    outputRange: ['-45deg', '45deg'],
  })

  const swipe = (dx: number) => {
    if (dx > windowWidth / 2) {
      setSwiped(true)
    }
    if (-dx > windowWidth / 2) {
      setSwiped(true)
    }
    Animated.spring(position, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  if (swiped) {
    LayoutAnimation.easeInEaseOut()
    return null
  }

  return (
    <Animated.View
      style={{
        width: '100%',
        marginVertical: 10,
        transform: [{ translateX: position }, { rotate: rotate }],
      }}
      {...pan.panHandlers}
    >
      <View
        style={{
          backgroundColor: color,
          height: 200,
          borderRadius: 20,

          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'stretch',
        }}
      >
        <Text style={{ fontSize: 30 }}>Swipe Me</Text>
      </View>
    </Animated.View>
  )
}

SwipeableCards.options = {
  topBar: {
    title: {
      text: 'Swipe A Card',
    },
  },
}
