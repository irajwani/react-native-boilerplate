import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from './Colors';


const path = '../Assets/Images'

// const 

export default {
  menuBars: require(`${path}/menu-bars.png`),
  // backArrow: require(`${path}/white-arrow-back.png`),
  logo: require(`${path}/logo.png`),

  blankAvatar: require(`${path}/blank.jpg`),
  smallProfile: require(`${path}/smallProfile.jpg`),

  loginBg: require(`${path}/loginBg.jpg`),

  BackArrow: ({onPress}) => (
    <Icon 
      name='arrow-left'
      size={35}
      color={'black'}
      onPress={onPress}
    />
    
  ),

  PasswordsMatch: () => (
    <Icon 
      name='lock'
      size={30}
      color={Colors.secondary}
      
    />
  )
}