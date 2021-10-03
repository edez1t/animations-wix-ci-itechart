import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'
import { ReanimatedAnimations } from './lib/ReanimatedAnimations'
import { BottomSheet } from './lib/Components/BottomSheet'
import { DragAndRelease } from './lib/Components/DragAndRelease'
import { HeaderScreen } from './lib/Components/Header'
import { Opacity } from './lib/Components/Opacity'
import { SwipeableCards } from './lib/Components/SwipeableCards'
import { NativeAnimations } from './lib/NativeAnimations'

Navigation.registerComponent('ReanimatedAnimations', () => gestureHandlerRootHOC(ReanimatedAnimations))
Navigation.registerComponent('BottomSheet', () => gestureHandlerRootHOC(BottomSheet))
Navigation.registerComponent('Opacity', () => gestureHandlerRootHOC(Opacity))

Navigation.registerComponent('NativeAnimations', () => gestureHandlerRootHOC(NativeAnimations))
Navigation.registerComponent('DragAndRelease', () => gestureHandlerRootHOC(DragAndRelease))
Navigation.registerComponent('Header', () => gestureHandlerRootHOC(HeaderScreen))
Navigation.registerComponent('SwipeableCards', () => gestureHandlerRootHOC(SwipeableCards))

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
  bottomTab: {
    fontWeight: 'bold',
    textColor: 'mediumpurple',
    selectedTextColor: 'rebeccapurple',
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
                    name: 'ReanimatedAnimations',
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
