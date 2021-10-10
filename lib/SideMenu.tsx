import React from 'react'
import { View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { Button } from './Components/Button'
import { OpacityProps } from './Components/Opacity'
import { SCREENS } from './screens'

export const SideMenu: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
      <Button
        onPress={() =>
          Navigation.push<OpacityProps>(SCREENS.ReanimatedAnimations, {
            component: {
              name: 'Opacity',
              passProps: { openedAs: 'side menu' },
              options: {
                sideMenu: { left: { visible: false } },
                topBar: { title: { text: 'Opacity Animation As Side Menu' } },
              },
            },
          })
        }
      >
        Opacity
      </Button>

      <Button onPress={() => Navigation.mergeOptions(componentId, { sideMenu: { left: { visible: false } } })}>
        Close Side Menu
      </Button>
    </View>
  )
}

SideMenu.options = {
  layout: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
  },
}
