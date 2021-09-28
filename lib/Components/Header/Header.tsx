import React, { useRef } from 'react'
import { Animated, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { loremIpsum } from '../../loremIpsum'

const HEADER_HEIGHT = 60

export const HeaderScreen: NavigationFunctionComponent = ({ componentId }) => {
  const scrollY = useRef(new Animated.Value(0)).current
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  })

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          transform: [{ translateY }],
        }}
      >
        <Header
          onBackButtonPress={() => {
            Navigation.pop(componentId)
          }}
        />
      </Animated.View>

      <ScrollView
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y)
        }}
      >
        <Text>{loremIpsum}</Text>
      </ScrollView>
    </>
  )
}

const Header: React.FC<{ onBackButtonPress: () => void }> = ({ onBackButtonPress }) => {
  return (
    <View
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: 'pink',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <TouchableOpacity onPress={onBackButtonPress}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>⇦ Go Back</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>I'm Header</Text>
    </View>
  )
}

HeaderScreen.options = {
  topBar: {
    visible: false,
  },
}
