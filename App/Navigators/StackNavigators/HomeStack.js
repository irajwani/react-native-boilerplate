import {createStackNavigator} from 'react-navigation-stack'

import Home from '../../Containers/Welcome'
import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Home
  },
  {
    initialRouteName: 'Home',
    ...StackStyles,
  }
)
