import React from 'react'
import { View, Button, Text } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { OpacityProps } from './Components/Opacity'
import { Spinner } from './Components/Spinner'

export const ReanimatedAnimations: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Button
        title='Bottom Sheet'
        onPress={() => Navigation.push(componentId, { component: { name: 'BottomSheet' } })}
      />

      <Text style={{ alignSelf: 'center' }}>Open Opacity Animation As:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          title='stack'
          onPress={() =>
            Navigation.push<OpacityProps>(componentId, {
              component: {
                name: 'Opacity',
                options: { topBar: { title: { text: 'Opacity Animation As Stack' } } },
                passProps: { openedAs: 'stack' },
              },
            })
          }
        />
        <Button
          title='modal'
          onPress={() =>
            Navigation.showModal({
              stack: {
                children: [
                  {
                    component: {
                      name: 'Opacity',
                      options: { topBar: { title: { text: 'Opacity Animation As Modal' } } },
                      passProps: { openedAs: 'modal' },
                    },
                  },
                ],
              },
            })
          }
        />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>I'm Spinner</Text>
        <Spinner />
      </View>
    </View>
  )
}

ReanimatedAnimations.options = {
  topBar: {
    title: {
      text: 'Reanimated Animations',
    },
  },
  bottomTab: {
    text: 'REANIMATED',
  },
}
