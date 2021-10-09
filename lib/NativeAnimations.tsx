import React from 'react'
import { View, Button, Text } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { Spacer } from './Components/Spacer'
import { NativeSpinner } from './Components/Spinner'

export const NativeAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button
        title='Drag And Release'
        onPress={() => Navigation.push(componentId, { component: { name: 'DragAndRelease' } })}
      />

      <Spacer />

      <Button title='Custom Header' onPress={() => Navigation.push(componentId, { component: { name: 'Header' } })} />

      <Spacer />

      <Button
        title='Swipeable Cards'
        onPress={() => Navigation.push(componentId, { component: { name: 'SwipeableCards' } })}
      />

      <Spacer />

      <Button title='Fancy Header' onPress={() => Navigation.push(componentId, { component: { name: 'Header2' } })} />

      <Spacer />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>I'm Native Spinner</Text>

        <Spacer />

        <NativeSpinner />
      </View>
    </View>
  )
}

NativeAnimations.options = {
  topBar: { title: { text: 'Native Animations' } },
  bottomTab: { text: 'NATIVE' },
}
