import React from 'react'
import { View, Button, Text } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { OpacityProps } from './Components/Opacity'

export const App: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Button
        title='Bottom Sheet'
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'BottomSheet',
              options: { topBar: { title: { text: 'Bottom Sheet' } } },
            },
          })
        }}
      />

      <Text style={{ alignSelf: 'center' }}>Open Opacity Animation As:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          title='stack'
          onPress={() =>
            Navigation.push<OpacityProps>(componentId, {
              component: {
                name: 'Opacity',
                options: { topBar: { title: { text: 'Opacity' } } },
                passProps: { openedAs: 'stack' },
              },
            })
          }
        />
        <Button
          title='modal'
          onPress={() =>
            Navigation.showModal<OpacityProps>({
              stack: {
                children: [
                  {
                    component: {
                      name: 'Opacity',
                      options: { topBar: { title: { text: 'Opacity' } } },
                      passProps: { openedAs: 'modal' },
                    },
                  },
                ],
              },
            })
          }
        />
      </View>
    </View>
  )
}

App.options = {
  topBar: {
    title: {
      text: 'Reanimated',
    },
  },
  bottomTab: {
    text: 'Reanimated',
  },
}
