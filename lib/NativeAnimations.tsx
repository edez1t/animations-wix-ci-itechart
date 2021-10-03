import React from 'react'
import { View, Button } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'

export const NativeAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Button
        title='Drag And Release'
        onPress={() => Navigation.push(componentId, { component: { name: 'DragAndRelease' } })}
      />

      <Button
        title='Custom Header'
        onPress={() =>
          Navigation.push(componentId, {
            component: { name: 'Header' },
          })
        }
      />

      <Button
        title='Swipeable Cards'
        onPress={() => Navigation.push(componentId, { component: { name: 'SwipeableCards' } })}
      />
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
