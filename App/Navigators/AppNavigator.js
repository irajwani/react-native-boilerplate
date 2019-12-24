import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { Animated, Easing } from 'react-native'

import AuthStack from './StackNavigators/AuthStack'

import SplashScreen from '../Containers/SplashScreen'

import DrawerNavigator from './DrawerNavigator'

import { StackStyles } from '../Theme/NavigationStyles'

const StackNavigator = createStackNavigator(
  {
    AuthStack,
    SplashScreen,
    AppStack: DrawerNavigator,

  },
  {
    initialRouteName: 'SplashScreen',

    ...StackStyles
  }
)

export default createAppContainer(StackNavigator)
