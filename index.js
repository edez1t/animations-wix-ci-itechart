import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'
import { App } from './lib/App'

Navigation.registerComponent(
  'com.myApp.WelcomeScreen',
  () => gestureHandlerRootHOC(App),
  () => App
)

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  })
})
