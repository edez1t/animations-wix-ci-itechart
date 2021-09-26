import React from 'react'
import { View, Button } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'

export const App: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Button
        title='bottom sheet'
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: 'BottomSheet',
              options: {
                topBar: {
                  title: {
                    text: 'Bottom Sheet',
                  },
                },
              },
            },
          })
        }
      />
      <Button
        title='opacity'
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: 'Opacity',
              options: {
                topBar: {
                  title: {
                    text: 'Opacity',
                  },
                },
              },
            },
          })
        }
      />
    </View>
  )
}

App.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
}
