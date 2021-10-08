import React, { useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { OpacityProps } from './Components/Opacity'
import { ReanimataedSpinner } from './Components/Spinner'

export const ReanimatedAnimations: NavigationFunctionComponent = ({ componentId }) => {
  useEffect(() => {
    const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) =>
        buttonId === 'sideMenu' && Navigation.mergeOptions(componentId, { sideMenu: { left: { visible: true } } })
    )

    return () => navigationButtonEventListener.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={{ padding: 10, justifyContent: 'space-between', flex: 1 }}>
      <View>
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
                        options: {
                          topBar: {
                            title: { text: 'Hardware Back Is Disabled. Use ➡' },
                            rightButtons: [{ id: 'dismiss', icon: require('./assets/close.png') }],
                          },
                          hardwareBackButton: { dismissModalOnPress: false },
                        },
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
          <Text>I'm Reanimated Spinner</Text>
          <ReanimataedSpinner />
        </View>
      </View>

      <Button
        title='Open Side Menu'
        onPress={() => Navigation.mergeOptions(componentId, { sideMenu: { left: { visible: true } } })}
      />
    </View>
  )
}

ReanimatedAnimations.options = {
  topBar: {
    title: { text: 'Reanimated Animations' },
    leftButtons: [{ id: 'sideMenu', icon: require('./assets/hamburger.png') }],
  },
  bottomTab: { text: 'REANIMATED' },
  sideMenu: { left: { enabled: true } },
}
