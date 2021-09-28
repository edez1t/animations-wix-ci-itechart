import React from 'react'
import { View, Button } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'

export const NativeAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Button
        title='Drag And Release'
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: 'DragAndRelease',
              options: { topBar: { title: { text: 'Drag And Release' } } },
            },
          })
        }
      />
      <Button
        title='Custom Header'
        onPress={() =>
          Navigation.push(componentId, {
            component: { name: 'Header' },
          })
        }
      />
    </View>
  )
}

NativeAnimations.options = {
  topBar: {
    title: {
      text: 'Native',
    },
  },
  bottomTab: {
    text: 'Native',
  },
}
