import React, { useRef, useEffect } from 'react'
import { View, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Text } from 'lib/Components/Text'

export const Tracking: React.FC = () => {
  const native = useRef(new Animated.Value(0)).current
  const toNative = useRef(new Animated.Value(0)).current
  const js = useRef(new Animated.Value(0)).current
  const toJS = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(native, {
      tension: 20,
      friction: 0.5,
      toValue: toNative,
      useNativeDriver: true,
    }).start()
    Animated.spring(js, {
      tension: 20,
      friction: 0.5,
      toValue: toJS,
      useNativeDriver: false,
    }).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        const nextValue = Math.random() * 200
        toNative.setValue(nextValue)
        toJS.setValue(nextValue)
      }}
    >
      <View>
        <Text>UI Thread:</Text>
        <View>
          <Animated.View style={[styles.line, { transform: [{ translateX: toNative }] }]} />
          <Animated.View style={[styles.block, { transform: [{ translateX: native }] }]} />
        </View>

        <Text>JS Thread:</Text>
        <View>
          <Animated.View style={[styles.line, { transform: [{ translateX: toJS }] }]} />
          <Animated.View style={[styles.block, { transform: [{ translateX: js }] }]} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  block: {
    width: 50,
    height: 50,
    backgroundColor: '#bb86fc',
    borderRadius: 2,
  },
  line: {
    position: 'absolute',
    left: 35,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'red',
  },
})
