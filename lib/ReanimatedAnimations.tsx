import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { OpacityProps } from 'lib/Components/Opacity'
import { Spacer } from 'lib/Components/Spacer'
import { ReanimataedSpinner } from 'lib/Components/Spinner'
import { Button } from 'lib/Components/Button'
import { Text } from 'lib/Components/Text'
import { Wobble } from 'lib/Components/Wobble'

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
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
      <View>
        <Button onPress={() => Navigation.push(componentId, { component: { name: 'BottomSheet' } })}>
          Bottom Sheet
        </Button>

        <Spacer />

        <Text style={{ alignSelf: 'center' }}>Open Opacity Animation As:</Text>

        <Spacer />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() =>
                Navigation.push<OpacityProps>(componentId, {
                  component: {
                    name: 'Opacity',
                    options: { topBar: { title: { text: 'Opacity Animation As Stack' } } },
                    passProps: { openedAs: 'stack' },
                  },
                })
              }
            >
              stack
            </Button>
          </View>

          <Spacer />

          <View style={{ flex: 1 }}>
            <Button
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
            >
              modal
            </Button>
          </View>
        </View>

        <Spacer />

        <Button onPress={() => Navigation.push(componentId, { component: { name: 'ChatHeads' } })}>Chat Heads</Button>

        <Spacer />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Reanimated Spinner</Text>

          <Spacer />

          <ReanimataedSpinner />
        </View>

        <Spacer />

        <Wobble />

        <Spacer />

        <Button onPress={() => Navigation.push(componentId, { component: { name: 'RotateScaleTilt' } })}>
          Rotate, Scale & Tilt
        </Button>
      </View>

      <Button onPress={() => Navigation.mergeOptions(componentId, { sideMenu: { left: { visible: true } } })}>
        Open Side Menu
      </Button>
    </ScrollView>
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
