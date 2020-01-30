import {createStackNavigator} from 'react-navigation-stack'

import Wallet from '../../Containers/Wallet';

import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Wallet,
    
  },
  {
    initialRouteName: 'Wallet',
    ...StackStyles,
  }
)
