import React from 'react'

import {View} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthStack from './StackNavigators/AuthStack'
import SplashScreen from '../Containers/SplashScreen'
import TabNavigator from './TabNavigator'

import { StackStyles } from '../Theme/NavigationStyles'

const SwitchNavigator = createSwitchNavigator(
  {
    AuthStack,
    SplashScreen,
    AppStack: TabNavigator,
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
