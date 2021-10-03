import React, { useRef } from 'react'
import { Animated, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { loremIpsum } from '../../mockData'

const HEADER_HEIGHT = 60

export const HeaderScreen: NavigationFunctionComponent = ({ componentId }) => {
  const scrollY = useRef(new Animated.Value(0)).current

  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  })
  const opacity = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
  })

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          transform: [{ translateY }],
          opacity,
        }}
      >
        <Header componentId={componentId} />
      </Animated.View>

      <ScrollView
        onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        // onMomentumScrollEnd={() => {
        //   Animated.timing(scrollY, {
        //     toValue: 1,
        //     duration: 1000,
        //     useNativeDriver: true,
        //   }).start()
        // }}
      >
        <Text style={{ marginTop: HEADER_HEIGHT }}>{loremIpsum}</Text>
      </ScrollView>
    </>
  )
}

const Header: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: 'skyblue',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={() => Navigation.pop(componentId)}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>⇦Back</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>I'm Header</Text>
    </View>
  )
}

HeaderScreen.options = {
  statusBar: {
    backgroundColor: 'skyblue',
  },
  topBar: {
    visible: false,
  },
}
