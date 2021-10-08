import React, { useRef, useState } from 'react'
import { Animated, View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { loremIpsum } from '../../mockData'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ComunitySlider from '@react-native-community/slider'

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export const Header2: NavigationFunctionComponent = ({ componentId }) => {
  const [BACK_BUTTON_SIZE, set_BACK_BUTTON_SIZE] = useState(35)
  const [SPACING, set_SPACING] = useState(15)
  const [HEADER_MAX_HEIGHT, set_HEADER_MAX_HEIGHT] = useState(200)
  const HEADER_MIN_HEIGHT = getStatusBarHeight() + BACK_BUTTON_SIZE + SPACING
  const [PROFILE_IMAGE_MAX_SIZE, set_PROFILE_IMAGE_MAX_SIZE] = useState(90)
  const [PROFILE_IMAGE_MIN_SIZE, set_PROFILE_IMAGE_MIN_SIZE] = useState(40)
  const PROFILE_IMAGE_SAFE_SPACING = HEADER_MIN_HEIGHT / 5
  const PROFILE_NAME_FONT_SIZE = 26

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
    outputRange: [HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_SIZE / 2, HEADER_MAX_HEIGHT + PROFILE_IMAGE_SAFE_SPACING],
    extrapolate: 'clamp',
  })
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MAX_SIZE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MIN_SIZE + PROFILE_IMAGE_SAFE_SPACING,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        PROFILE_IMAGE_MIN_SIZE +
        PROFILE_NAME_FONT_SIZE +
        PROFILE_IMAGE_SAFE_SPACING,
    ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const headerBorderRadius = scrollY.interpolate({
    inputRange: [
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MIN_SIZE + PROFILE_IMAGE_SAFE_SPACING,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        PROFILE_IMAGE_MIN_SIZE +
        PROFILE_NAME_FONT_SIZE +
        PROFILE_IMAGE_SAFE_SPACING,
    ],
    outputRange: [15, 0],
    extrapolate: 'clamp',
  })

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
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
            justifyContent: 'center',
            borderBottomLeftRadius: headerBorderRadius,
            borderBottomRightRadius: headerBorderRadius,
            overflow: 'hidden',
          }}
        >
          <Animated.Text
            style={{
              fontWeight: 'bold',
              fontSize: PROFILE_NAME_FONT_SIZE,
              color: 'white',
              marginBottom: -getStatusBarHeight(), // not marginTop: getStatusBarHeight() !!!
              opacity: headerTitleOpacity,
            }}
          >
            Lil Peep
          </Animated.Text>
        </AnimatedImageBackground>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ marginHorizontal: SPACING }}
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

        {/* DO IGNORE THE SECTION BELOW, IT JUST CHANGES VALUES */}
        <Slider value={BACK_BUTTON_SIZE} boundaries={[25, 60]} onValueChange={(value) => set_BACK_BUTTON_SIZE(value)}>
          BACK_BUTTON_SIZE: {BACK_BUTTON_SIZE}
        </Slider>
        <Slider value={SPACING} boundaries={[0, 25]} onValueChange={(value) => set_SPACING(value)}>
          SPACING: {SPACING}
        </Slider>
        <Slider
          value={HEADER_MAX_HEIGHT}
          boundaries={[120, 300]}
          onValueChange={(value) => set_HEADER_MAX_HEIGHT(value)}
        >
          HEADER_MAX_HEIGHT: {HEADER_MAX_HEIGHT}
        </Slider>
        <Slider
          value={PROFILE_IMAGE_MAX_SIZE}
          boundaries={[60, 150]}
          onValueChange={(value) => set_PROFILE_IMAGE_MAX_SIZE(value)}
        >
          PROFILE_IMAGE_MAX_SIZE: {PROFILE_IMAGE_MAX_SIZE}
        </Slider>
        <Slider
          value={PROFILE_IMAGE_MIN_SIZE}
          boundaries={[20, 50]}
          onValueChange={(value) => set_PROFILE_IMAGE_MIN_SIZE(value)}
        >
          PROFILE_IMAGE_MIN_SIZE: {PROFILE_IMAGE_MIN_SIZE}
        </Slider>
        {/* DO IGNORE THE SECTION ABOVE, IT JUST CHANGES VALUES */}

        <Text style={{ marginTop: SPACING }}>{loremIpsum}</Text>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => Navigation.pop(componentId)}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: HEADER_MIN_HEIGHT - BACK_BUTTON_SIZE - SPACING / 2,
          left: SPACING / 2,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: BACK_BUTTON_SIZE,
          height: BACK_BUTTON_SIZE,
          borderRadius: BACK_BUTTON_SIZE / 2,
        }}
      >
        <Image source={require('../../assets/arrow-back.png')} style={{ flex: 1, width: null, height: null }} />
      </TouchableOpacity>
    </View>
  )
}

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

const Slider: React.FC<{
  value: number
  boundaries: number[]
  onValueChange: (value: number) => void
}> = ({ value, boundaries, onValueChange, children }) => {
  return (
    <>
      <Text style={{ textAlign: 'center' }}>{children}</Text>
      <ComunitySlider
        style={{ flex: 1 }}
        step={1}
        value={value}
        onValueChange={(val) => onValueChange(val)}
        minimumValue={boundaries[0]}
        maximumValue={boundaries[1]}
        minimumTrackTintColor='red'
        maximumTrackTintColor='red'
        thumbTintColor='black'
      />
    </>
  )
}
