import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'
import { ReanimatedAnimations } from './lib/ReanimatedAnimations'
import { BottomSheet } from './lib/Components/BottomSheet'
import { DragAndRelease } from './lib/Components/DragAndRelease'
import { HeaderScreen } from './lib/Components/Header'
import { Opacity } from './lib/Components/Opacity'
import { SwipeableCards } from './lib/Components/SwipeableCards'
import { Header2 } from './lib/Components/Header'
import { NativeAnimations } from './lib/NativeAnimations'
import { SideMenu } from './lib/SideMenu'
import { SCREENS } from './lib/screens'

Navigation.registerComponent('ReanimatedAnimations', () => gestureHandlerRootHOC(ReanimatedAnimations))
Navigation.registerComponent('BottomSheet', () => gestureHandlerRootHOC(BottomSheet))
Navigation.registerComponent('Opacity', () => gestureHandlerRootHOC(Opacity))

Navigation.registerComponent('NativeAnimations', () => gestureHandlerRootHOC(NativeAnimations))
Navigation.registerComponent('DragAndRelease', () => gestureHandlerRootHOC(DragAndRelease))
Navigation.registerComponent('Header', () => gestureHandlerRootHOC(HeaderScreen))
Navigation.registerComponent('SwipeableCards', () => gestureHandlerRootHOC(SwipeableCards))
Navigation.registerComponent('Header2', () => gestureHandlerRootHOC(Header2))

Navigation.registerComponent('SideMenu', () => gestureHandlerRootHOC(SideMenu))

Navigation.setDefaultOptions({
  layout: { orientation: ['portrait'], backgroundColor: '#323232' },
  statusBar: { backgroundColor: '#171717' },
  topBar: {
    title: { color: 'white' },
    backButton: { color: 'white' },
    background: { color: '#212121' },
  },
  bottomTab: { fontWeight: 'bold', textColor: '#e0e0e0', selectedTextColor: 'white' },
  bottomTabs: { backgroundColor: '#212121' },
  navigationBar: { backgroundColor: '#212121' },
})

Navigation.setRoot({
  root: {
    sideMenu: {
      options: { sideMenu: { left: { enabled: false } } },
      left: { component: { name: 'SideMenu' } },
      center: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: { id: SCREENS.ReanimatedAnimations, name: 'ReanimatedAnimations' },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: { name: 'NativeAnimations' },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
})
