import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'
import { App } from './lib/App'
import { BottomSheet } from './lib/Components/BottomSheet'
import { DragAndRelease } from './lib/Components/DragAndRelease'
import { Opacity } from './lib/Components/Opacity'
import { NativeAnimations } from './lib/NativeAnimations'

Navigation.registerComponent(
  'Reanimated',
  () => gestureHandlerRootHOC(App),
  () => App
)
Navigation.registerComponent(
  'NativeAnimations',
  () => gestureHandlerRootHOC(NativeAnimations),
  () => NativeAnimations
)

Navigation.registerComponent(
  'BottomSheet',
  () => gestureHandlerRootHOC(BottomSheet),
  () => BottomSheet
)
Navigation.registerComponent(
  'Opacity',
  () => gestureHandlerRootHOC(Opacity),
  () => Opacity
)
Navigation.registerComponent(
  'DragAndRelease',
  () => gestureHandlerRootHOC(DragAndRelease),
  () => DragAndRelease
)

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: 'rebeccapurple',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: 'mediumpurple',
    },
  },
})

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Reanimated',
                  },
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'NativeAnimations',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })
})
