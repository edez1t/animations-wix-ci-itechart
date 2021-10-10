import React, { useEffect, useRef, useState } from 'react'
import { Animated, TouchableWithoutFeedback, View } from 'react-native'
import { Text } from '../Text'

export const ValueListener: React.FC = () => {
  const opacity = useRef(new Animated.Value(1)).current
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    opacity.addListener((e) => setProgress(e.value))

    return () => opacity.removeAllListeners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setProgress((prev) => (prev ? 0 : 1))

        Animated.timing(opacity, {
          duration: 1000,
          toValue: progress ? 0 : 1,
          useNativeDriver: true,
        }).start()
      }}
    >
      <View>
        <View>
          <Animated.View style={{ width: 50, height: 50, backgroundColor: '#bb86fc', opacity: opacity }} />
        </View>
        <Text>Value: {progress}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
