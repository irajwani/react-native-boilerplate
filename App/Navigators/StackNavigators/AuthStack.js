import {createStackNavigator} from 'react-navigation-stack'

import Welcome from '../../Containers/Welcome'
import Login from '../../Containers/Login'
import Register from '../../Containers/Register'

import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Welcome,
    Login,
    Register,
  },
  {
    initialRouteName: 'Welcome',
    ...StackStyles,
  }
)
