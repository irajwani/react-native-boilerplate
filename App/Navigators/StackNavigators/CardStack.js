import {createStackNavigator} from 'react-navigation-stack'

import Cards from '../../Containers/Cards'

import { StackStyles } from '../../Theme/NavigationStyles'
import Vendor from '../../Containers/Vendor'




export default createStackNavigator(
  {
    Cards,
    Vendor: Vendor,
  },
  {
    initialRouteName: 'Cards',
    ...StackStyles,
  }
)
