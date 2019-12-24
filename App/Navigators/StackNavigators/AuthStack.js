import {createStackNavigator} from 'react-navigation-stack'

import Welcome from '../../Containers/Welcome'
import Login from '../../Containers/Login'
import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Welcome,
    Login,
  },
  {
    initialRouteName: 'Welcome',
    ...StackStyles,
  }
)
