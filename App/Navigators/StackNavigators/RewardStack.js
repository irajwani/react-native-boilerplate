import {createStackNavigator} from 'react-navigation-stack'

import Rewards from '../../Containers/Rewards'

import { StackStyles } from '../../Theme/NavigationStyles'



export default createStackNavigator(
  {
    Rewards
  },
  {
    initialRouteName: 'Rewards',
    ...StackStyles,
  }
)
