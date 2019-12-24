import React from 'react'
import { SafeAreaView,View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'

import Styles from './styles.js'
// import { Images, Metrics } from '../../Theme'
// import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService';

// import {DrawerItems} from 'react-navigation'

const drawerItems = [{name: "Home", route: "HomeStack"}, {name: "Menu", route: "MenuStack"}, {name: "Beverages", route: "BeverageStack"}, {name: "Food", route: "FoodStack"}]

// TODO: update styling to have a transparent button with green text and green border
class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {navigate} = NavigationService
    return (
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <ScrollView contentContainerStyle={Styles.ratingContainer}>
        
        {drawerItems.map((item) => (
          <TouchableOpacity onPress={()=>navigate(item.route)} style={Styles.drawerItemContainer}>
            <Text style={Styles.drawerItem}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        
      </ScrollView>
      </SafeAreaView>
      
    )
  }
}


export default SideNav
