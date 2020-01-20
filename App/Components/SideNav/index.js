import React from 'react'
import { SafeAreaView,View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'

import Styles from './styles.js'
import { Images } from '../../Theme'
// import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService';

// import {DrawerItems} from 'react-navigation'

const drawerItems = [{name: "Vendors", route: "HomeStack"}, {name: "Settings", route: "SettingsStack"}]

// TODO: update styling to have a transparent button with green text and green border
class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }

  renderProfile = () => (
    <View style={Styles.profileContainer}>
      <Image source={Images.smallProfile} style={{width: 30, height: 30, borderRadius: 15}}/>
      <Text>Name</Text>
    </View>
  )

  render() {
    // let {navigate} = NavigationService
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}} forceInset={{ top: 'always', horizontal: 'never' }}>

      {this.renderProfile()}

      <ScrollView contentContainerStyle={Styles.drawer}>
        
        

        {drawerItems.map((item) => (
          <TouchableOpacity onPress={()=>NavigationService.navigate(item.route)} style={Styles.drawerItemContainer}>
            <Text style={Styles.drawerItem}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        
      </ScrollView>
      </SafeAreaView>
      
    )
  }
}


export default SideNav
