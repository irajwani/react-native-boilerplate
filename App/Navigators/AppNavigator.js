import React from 'react'

import {View} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
// import {createStackNavigator} from 'react-navigation-stack'
// import { Animated, Easing } from 'react-native'

import AuthStack from './StackNavigators/AuthStack'

import SplashScreen from '../Containers/SplashScreen'

import DrawerNavigator from './DrawerNavigator'

import { StackStyles } from '../Theme/NavigationStyles'

const SwitchNavigator = createSwitchNavigator(
  {
    AuthStack,
    SplashScreen,
    AppStack: DrawerNavigator,
    // AppStack: () => (
    //   <View style={{backgroundColor: 'red', flex: 1}}>

    //   </View>
    // ),

  },
  {
    initialRouteName: 'SplashScreen',

    ...StackStyles
  }
)

export default createAppContainer(SwitchNavigator)
