import React, { Component } from 'react'
import NavigationService from '../../Services/NavigationService'
import AppNavigator from '../../Navigators/AppNavigator'
import { View, SafeAreaView } from 'react-native'
import styles from './styles'

import { PropTypes } from 'prop-types'

export default class RootScreen extends Component {
  // constructor(props) {
  //   super(props);

  // }

  //  async componentDidMount() {
  // // await AsyncStorage.removeItem('token')
  //   let token = await AsyncStorage.getItem('token');
  //   if (token) {
  //     NavigationService.navigate('DrawerNavigator');
  //   }
  //   else {
  //     NavigationService.navigateAndReset('AuthStack');
  //   }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppNavigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </SafeAreaView>
    )
  }
}
