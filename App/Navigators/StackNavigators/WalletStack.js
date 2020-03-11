import {createStackNavigator} from 'react-navigation-stack'

import Wallet from '../../Containers/Wallet';
import Settings from '../../Containers/Settings';
import Register from '../../Containers/Register';

import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Wallet,
    Settings,
    Register,
  },
  {
    initialRouteName: 'Wallet',
    ...StackStyles,
  }
)
