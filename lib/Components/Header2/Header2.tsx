import React, { useRef } from 'react'
import { Animated, View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { loremIpsum } from '../../mockData'

const HEADER_MAX_HEIGHT = 150
const HEADER_MIN_HEIGHT = 70
const PROFILE_IMAGE_MAX_SIZE = 90
const PROFILE_IMAGE_MIN_SIZE = 40
const PROFILE_IMAGE_SAFE_MARGIN = PROFILE_IMAGE_MIN_SIZE / 4
const PROFILE_NAME_FONT_SIZE = 26

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export const Header2: NavigationFunctionComponent = ({ componentId }) => {
  const scrollY = useRef(new Animated.Value(0)).current

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  })
  const profileImageSize = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_SIZE, PROFILE_IMAGE_MIN_SIZE],
    extrapolate: 'clamp',
  })
  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_SIZE / 2, HEADER_MAX_HEIGHT + PROFILE_IMAGE_SAFE_MARGIN],
    extrapolate: 'clamp',
  })
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MAX_SIZE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MIN_SIZE + PROFILE_IMAGE_SAFE_MARGIN,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        PROFILE_IMAGE_MIN_SIZE +
        PROFILE_NAME_FONT_SIZE +
        PROFILE_IMAGE_SAFE_MARGIN,
    ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const headerBorderRadius = scrollY.interpolate({
    inputRange: [
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MIN_SIZE + PROFILE_IMAGE_SAFE_MARGIN,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        PROFILE_IMAGE_MIN_SIZE +
        PROFILE_NAME_FONT_SIZE +
        PROFILE_IMAGE_SAFE_MARGIN,
    ],
    outputRange: [15, 0],
    extrapolate: 'clamp',
  })

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: headerHeight,
          zIndex: headerZindex,
          alignItems: 'center',
        }}
      >
        <AnimatedImageBackground
          source={require('../../assets/crowd.jpg')}
          style={{
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderRadius: headerBorderRadius,
            overflow: 'hidden',
          }}
        >
          <Animated.Text
            style={{
              fontWeight: 'bold',
              fontSize: PROFILE_NAME_FONT_SIZE,
              marginLeft: 10,
              color: 'white',
              opacity: headerTitleOpacity,
            }}
          >
            Lil Peep
          </Animated.Text>
        </AnimatedImageBackground>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ marginHorizontal: 15, borderRadius: 20, overflow: 'hidden' }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
      >
        <Animated.View
          style={{
            width: profileImageSize,
            height: profileImageSize,
            borderRadius: PROFILE_IMAGE_MAX_SIZE / 2,
            borderWidth: 1,
            overflow: 'hidden',
            marginTop: profileImageMarginTop,
          }}
        >
          <Image source={require('../../assets/peep.jpg')} style={{ flex: 1, width: null, height: null }} />
        </Animated.View>
        <Animated.Text
          style={{
            fontWeight: 'bold',
            fontSize: PROFILE_NAME_FONT_SIZE,
            opacity: headerTitleOpacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          }}
        >
          Lil Peep
        </Animated.Text>

        <Text style={{ marginTop: 15 }}>{loremIpsum}</Text>
      </ScrollView>

      <BackButton onPress={() => Navigation.pop(componentId)} />
    </View>
  )
}

const BackButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      right: 10,
      bottom: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
    }}
  >
    <Image source={require('../../assets/arrow-back.png')} style={{ marginLeft: 3, width: 40, height: 40 }} />
  </TouchableOpacity>
)

Header2.options = {
  statusBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    style: 'light',
    drawBehind: true,
  },
  topBar: {
    visible: false,
  },
}
