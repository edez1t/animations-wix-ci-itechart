import React from 'react'
import { ScrollView, View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { Button } from 'lib/Components/Button'
import { Spacer } from 'lib/Components/Spacer'
import { NativeSpinner } from 'lib/Components/Spinner'
import { Text } from 'lib/Components/Text'
import { Tracking } from 'lib/Components/Tracking'
import { ValueListener } from 'lib/Components/ValueListener'

export const NativeAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 10 }}>
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
    </ScrollView>
  )
}

NativeAnimations.options = {
  topBar: { title: { text: 'Animated Animations' } },
  bottomTab: { text: 'ANIMATED' },
}
