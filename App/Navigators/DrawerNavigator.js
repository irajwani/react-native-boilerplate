import { createDrawerNavigator } from 'react-navigation-drawer'

import HomeStack  from './StackNavigators/HomeStack'

import SideNav from '../Components/SideNav'

import Colors from '../Theme/Colors'

const DrawerNavigator = createDrawerNavigator(
  {
    HomeStack,
    
  },
  {
    initialRouteName: "HomeStack",
    drawerBackgroundColor: Colors.background.drawerNavigator,
    drawerPosition: 'left',
    drawerType: 'slide', // maybe this should be front,
    contentComponent: SideNav
    // TODO: Need a custom component obviously to accomodate Log Out and Nearest Tavern deets
  }
)

export default DrawerNavigator
