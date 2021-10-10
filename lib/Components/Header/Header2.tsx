import React, { useRef, useState } from 'react'
import { Animated, View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { loremIpsum } from '../../mockData'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ComunitySlider from '@react-native-community/slider'
import { Text } from '../Text'

export const Header2: NavigationFunctionComponent = ({ componentId }) => {
  const [BACK_BUTTON_SIZE, set_BACK_BUTTON_SIZE] = useState(35)
  const [SPACING, set_SPACING] = useState(15)
  const [HEADER_MAX, set_HEADER_MAX] = useState(200)
  const HEADER_MIN = getStatusBarHeight() + BACK_BUTTON_SIZE + SPACING
  const HEADER_DIFF = HEADER_MAX - HEADER_MIN
  const [PROFILE_IMAGE_MAX, set_PROFILE_IMAGE_MAX] = useState(90)
  const [PROFILE_IMAGE_MIN, set_PROFILE_IMAGE_MIN] = useState(40)
  const PROFILE_NAME_FONT_SIZE = 26

  const scrollY = useRef(new Animated.Value(0)).current

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_DIFF],
    outputRange: [HEADER_MAX, HEADER_MIN],
    extrapolate: 'clamp',
  })
  const profileImageSize = scrollY.interpolate({
    inputRange: [0, HEADER_DIFF],
    outputRange: [PROFILE_IMAGE_MAX, PROFILE_IMAGE_MIN],
    extrapolate: 'clamp',
  })
  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_DIFF],
    outputRange: [HEADER_MAX - PROFILE_IMAGE_MAX / 2, HEADER_MAX + SPACING],
    extrapolate: 'clamp',
  })
  const headerZindex = scrollY.interpolate({
    inputRange: [HEADER_DIFF, HEADER_DIFF + 0.1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_DIFF + PROFILE_IMAGE_MIN + SPACING,
      HEADER_DIFF + PROFILE_IMAGE_MIN + PROFILE_NAME_FONT_SIZE + SPACING,
    ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const headerBorderRadius = scrollY.interpolate({
    inputRange: [
      HEADER_DIFF + PROFILE_IMAGE_MIN + SPACING,
      HEADER_DIFF + PROFILE_IMAGE_MIN + PROFILE_NAME_FONT_SIZE + SPACING,
    ],
    outputRange: [BACK_BUTTON_SIZE / 2, 0],
    extrapolate: 'clamp',
  })

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          position: 'absolute',
          zIndex: headerZindex,
          height: headerHeight,
          alignItems: 'center',
          borderBottomLeftRadius: headerBorderRadius,
          borderBottomRightRadius: headerBorderRadius,
          overflow: 'hidden',
        }}
      >
        <ImageBackground
          source={require('../../assets/header.jpg')}
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Animated.Text
            style={{
              fontSize: PROFILE_NAME_FONT_SIZE,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: -getStatusBarHeight(), // not marginTop: getStatusBarHeight() !!!
              opacity: headerTitleOpacity,
            }}
          >
            Lil Peep
          </Animated.Text>
        </ImageBackground>
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
            borderRadius: PROFILE_IMAGE_MAX / 2,
            borderWidth: 1,
            overflow: 'hidden',
            marginTop: profileImageMarginTop,
          }}
        >
          <Image source={require('../../assets/profile-picture.jpg')} style={{ flex: 1, width: null, height: null }} />
        </Animated.View>
        <Animated.Text
          style={{
            fontSize: PROFILE_NAME_FONT_SIZE,
            fontWeight: 'bold',
            marginBottom: 20,
            opacity: headerTitleOpacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          }}
        >
          Lil Peep
        </Animated.Text>

        {/* DO IGNORE THE SECTION BELOW, IT JUST CHANGES VALUES */}
        <Slider value={BACK_BUTTON_SIZE} boundaries={[25, 55]} onValueChange={(value) => set_BACK_BUTTON_SIZE(value)}>
          BACK_BUTTON_SIZE: {BACK_BUTTON_SIZE}
        </Slider>
        <Slider value={SPACING} boundaries={[0, 25]} onValueChange={(value) => set_SPACING(value)}>
          SPACING: {SPACING}
        </Slider>
        <Slider value={HEADER_MAX} boundaries={[160, 300]} onValueChange={(value) => set_HEADER_MAX(value)}>
          HEADER_MAX: {HEADER_MAX}
        </Slider>
        <Slider
          value={PROFILE_IMAGE_MAX}
          boundaries={[60, 140]}
          onValueChange={(value) => set_PROFILE_IMAGE_MAX(value)}
        >
          PROFILE_IMAGE_MAX: {PROFILE_IMAGE_MAX}
        </Slider>
        <Slider value={PROFILE_IMAGE_MIN} boundaries={[20, 50]} onValueChange={(value) => set_PROFILE_IMAGE_MIN(value)}>
          PROFILE_IMAGE_MIN: {PROFILE_IMAGE_MIN}
        </Slider>
        {/* DO IGNORE THE SECTION ABOVE, IT JUST CHANGES VALUES */}

        <Text style={{ marginTop: SPACING, color: 'black' }}>{loremIpsum}</Text>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => Navigation.pop(componentId)}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: HEADER_MIN - BACK_BUTTON_SIZE - SPACING / 2,
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
  layout: { backgroundColor: 'white' },
  statusBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    style: 'light',
    drawBehind: true,
  },
  topBar: { visible: false },
}

const Slider: React.FC<{
  value: number
  boundaries: [number, number]
  onValueChange: (value: number) => void
}> = ({ value, boundaries, onValueChange, children }) => {
  return (
    <>
      <Text style={{ textAlign: 'center', color: 'black' }}>{children}</Text>
      <ComunitySlider
        style={{ flex: 1 }}
        step={1}
        value={value}
        onValueChange={(val) => onValueChange(val)}
        minimumValue={boundaries[0]}
        maximumValue={boundaries[1]}
        minimumTrackTintColor='#bb86fc'
        maximumTrackTintColor='#bb86fc'
        thumbTintColor='#171717'
      />
    </>
  )
}
