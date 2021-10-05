import React from 'react'
import { View, Button } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { OpacityProps } from './Components/Opacity'
import { SCREENS } from './Screens'

export const SideMenu: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ padding: 20, backgroundColor: 'rgba(102, 51, 153, 0.9)', flex: 1, justifyContent: 'space-between' }}>
      <Button
        title='Opacity'
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
      />

      <Button
        title='Close Side Menu'
        onPress={() => Navigation.mergeOptions(componentId, { sideMenu: { left: { visible: false } } })}
      />
    </View>
  )
}

SideMenu.options = {
  statusBar: {
    style: 'dark',
  },
}
