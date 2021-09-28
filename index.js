import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'
import { App } from './lib/App'
import { BottomSheet } from './lib/Components/BottomSheet'
import { DragAndRelease } from './lib/Components/DragAndRelease'
import { FancyStickyHeader } from './lib/Components/FancyStickyHeader'
import { HeaderScreen } from './lib/Components/Header'
import { Opacity } from './lib/Components/Opacity'
import { NativeAnimations } from './lib/NativeAnimations'

Navigation.registerComponent('Reanimated', () => gestureHandlerRootHOC(App))

Navigation.registerComponent('BottomSheet', () => gestureHandlerRootHOC(BottomSheet))
Navigation.registerComponent('Opacity', () => gestureHandlerRootHOC(Opacity))
Navigation.registerComponent('FancyStickyHeader', () => gestureHandlerRootHOC(FancyStickyHeader))

Navigation.registerComponent('NativeAnimations', () => gestureHandlerRootHOC(NativeAnimations))

Navigation.registerComponent('DragAndRelease', () => gestureHandlerRootHOC(DragAndRelease))
Navigation.registerComponent('Header', () => gestureHandlerRootHOC(HeaderScreen))

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
