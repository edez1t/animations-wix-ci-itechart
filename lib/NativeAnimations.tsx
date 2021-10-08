import React from 'react'
import { View, Button, Text } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { NativeSpinner } from './Components/Spinner'

export const NativeAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Button
        title='Drag And Release'
        onPress={() => Navigation.push(componentId, { component: { name: 'DragAndRelease' } })}
      />

      <Button title='Custom Header' onPress={() => Navigation.push(componentId, { component: { name: 'Header' } })} />

      <Button
        title='Swipeable Cards'
        onPress={() => Navigation.push(componentId, { component: { name: 'SwipeableCards' } })}
      />

      <Button title='Fancy Header' onPress={() => Navigation.push(componentId, { component: { name: 'Header2' } })} />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>I'm Native Spinner</Text>
        <NativeSpinner />
      </View>
    </View>
  )
}

NativeAnimations.options = {
  topBar: {
    title: {
      text: 'Native Animations',
    },
  },
  bottomTab: {
    text: 'NATIVE',
  },
}
