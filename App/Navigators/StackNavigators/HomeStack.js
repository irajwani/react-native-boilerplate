import {createStackNavigator} from 'react-navigation-stack'

import Home from '../../Containers/Home'
import Vendor from '../../Containers/Vendor'
import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Home,
    Vendor
  },
  {
    initialRouteName: 'Home',
    ...StackStyles,
  }
)
