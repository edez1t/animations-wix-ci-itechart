import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { OpacityProps } from './Components/Opacity'
import { Spacer } from './Components/Spacer'
import { ReanimataedSpinner } from './Components/Spinner'

// import { Dimensions, StyleSheet } from 'react-native'
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   useDerivedValue,
//   withSpring,
// } from 'react-native-reanimated'
// import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { Button } from './Components/Button'
import { Text } from './Components/Text'

// const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

// export function ChatHeads({ children }: React.PropsWithChildren<Record<never, never>>) {
//   const transX = useSharedValue(0)
//   const transY = useSharedValue(0)

//   type AnimatedGHContext = {
//     startX: number
//     startY: number
//   }
//   const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
//     onStart: (_, ctx) => {
//       ctx.startX = transX.value
//       ctx.startY = transY.value
//     },
//     onActive: (event, ctx) => {
//       transX.value = ctx.startX + event.translationX
//       transY.value = ctx.startY + event.translationY
//     },
//     onEnd: (event) => {
//       const width = windowWidth - 100 - 40 // minus margins & width
//       const height = windowHeight - 100 - 40 // minus margins & height
//       const toss = 0.2
//       function clamp(value: number, min: number, max: number) {
//         return Math.min(Math.max(value, min), max)
//       }
//       const targetX = clamp(transX.value + toss * event.velocityX, 0, width)
//       const targetY = clamp(transY.value + toss * event.velocityY, 0, height)
//       // return;

//       const top = targetY
//       const bottom = height - targetY
//       const left = targetX
//       const right = width - targetX
//       const minDistance = Math.min(top, bottom, left, right)
//       let snapX = targetX
//       let snapY = targetY
//       switch (minDistance) {
//         case top:
//           snapY = 0
//           break
//         case bottom:
//           snapY = height
//           break
//         case left:
//           snapX = 0
//           break
//         case right:
//           snapX = width
//           break
//       }
//       transX.value = withSpring(snapX, {
//         velocity: event.velocityX,
//       })
//       transY.value = withSpring(snapY, {
//         velocity: event.velocityY,
//       })
//     },
//   })

//   const stylez = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: transX.value,
//         },
//         {
//           translateY: transY.value,
//         },
//       ],
//     }
//   })

//   const childrenArray = React.Children.toArray(children)

//   return (
//     <>
//       {childrenArray.length > 1 && <Followers children={childrenArray.slice(1)} transX={transX} transY={transY} />}
//       <PanGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View style={[styles.headContainer, stylez]}>{childrenArray[0]}</Animated.View>
//       </PanGestureHandler>
//     </>
//   )
// }

// type FollowersProps = {
//   readonly transX: Animated.SharedValue<number>
//   readonly transY: Animated.SharedValue<number>
// }
// function Followers({ transX, transY, children }: React.PropsWithChildren<FollowersProps>) {
//   const myTransX = useDerivedValue(() => {
//     return withSpring(transX.value)
//   })
//   const myTransY = useDerivedValue(() => {
//     return withSpring(transY.value)
//   })

//   const stylez = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: myTransX.value,
//         },
//         {
//           translateY: myTransY.value,
//         },
//       ],
//     }
//   })

//   const childrenArray = React.Children.toArray(children)

//   return (
//     <>
//       {childrenArray.length > 1 && <Followers children={childrenArray.slice(1)} transX={myTransX} transY={myTransY} />}
//       <Animated.View style={[styles.headContainer, stylez]}>{childrenArray[0]}</Animated.View>
//     </>
//   )
// }

// export function ReanimatedAnimations(): React.ReactElement {
//   return (
//     <View style={{ flex: 1, margin: 50 }}>
//       <ChatHeads>
//         <View style={[styles.head, { backgroundColor: 'black' }]} />
//         <View style={[styles.head, { backgroundColor: 'blue' }]} />
//         <View style={[styles.head, { backgroundColor: 'green' }]} />
//         <View style={[styles.head, { backgroundColor: 'yellow' }]} />
//       </ChatHeads>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   head: {
//     width: 40,
//     height: 40,
//   },
//   headContainer: {
//     position: 'absolute',
//   },
// })

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
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
      <View>
        <Button onPress={() => Navigation.push(componentId, { component: { name: 'BottomSheet' } })}>
          Bottom Sheet
        </Button>

        <Spacer />

        <Text style={{ alignSelf: 'center' }}>Open Opacity Animation As:</Text>

        <Spacer />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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

        <Spacer />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Reanimated Spinner</Text>

          <Spacer />

          <ReanimataedSpinner />
        </View>
      </View>

      <Button onPress={() => Navigation.mergeOptions(componentId, { sideMenu: { left: { visible: true } } })}>
        Open Side Menu
      </Button>
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
