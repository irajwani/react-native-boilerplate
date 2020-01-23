import {createStackNavigator} from 'react-navigation-stack'

import Welcome from '../../Containers/Welcome'

import Register from '../../Containers/Register'
import SelectPictures from '../../Components/SelectPictures'
import Camera from '../../Components/SelectPictures/Camera'

import { StackStyles } from '../../Theme/NavigationStyles'


export default createStackNavigator(
  {
    Welcome,
    Register,
    SelectPictures,
    Camera

  },
  {
    initialRouteName: 'Welcome',
    ...StackStyles,
  }
)
