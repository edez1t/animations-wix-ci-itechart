import React from 'react'
import { View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { Button } from './Components/Button'
import { Spacer } from './Components/Spacer'
import { NativeSpinner } from './Components/Spinner'
import { Text } from './Components/Text'
import { Tracking } from './Components/Tracking'
import { ValueListener } from './Components/ValueListener'

export const NativeAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button onPress={() => Navigation.push(componentId, { component: { name: 'DragAndRelease' } })}>
        Drag And Release
      </Button>

      <Spacer />

      <Button onPress={() => Navigation.push(componentId, { component: { name: 'Header' } })}>Custom Header</Button>

      <Spacer />

      <Button onPress={() => Navigation.push(componentId, { component: { name: 'SwipeableCards' } })}>
        Swipeable Cards
      </Button>

      <Spacer />

      <Button onPress={() => Navigation.push(componentId, { component: { name: 'Header2' } })}>
        Custom Fancy Header
      </Button>

      <Spacer />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Native Spinner</Text>

        <Spacer />

        <NativeSpinner />
      </View>

      <Text>Value Tracker</Text>
      <ValueListener />
      <Spacer />

      <Text>Animated Tracking</Text>
      <Tracking />
    </View>
  )
}

NativeAnimations.options = {
  topBar: { title: { text: 'Native Animations' } },
  bottomTab: { text: 'ANIMATED' },
}
