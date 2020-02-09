import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Colors from './Colors';


const path = '../Assets/Images'

// const 

export default {
  //Images
  menuBars: require(`${path}/menu-bars.png`),
  // backArrow: require(`${path}/white-arrow-back.png`),
  logo: require(`${path}/logo.png`),

  blankAvatar: require(`${path}/blank.jpg`),
  smallProfile: require(`${path}/smallProfile.jpg`),
  
  blur: require(`${path}/blur.png`),

  loginBg: require(`${path}/loginBg.jpg`),

  //Tabs
  Wallet: ({size, focused}) => (
    <Icon 
      name={focused ? 'wallet' : 'wallet-outline'}
      size={size}
      color={Colors.primary}
      
    />
  ),

  Cards: ({size, focused}) => (
    <Icon 
      name={focused ? 'cards' : 'cards-outline'}
      size={size}
      color={Colors.primary}
      
    />
  ),

  Gift: ({size, focused}) => (
    <Icon 
      name={focused ? 'gift' : 'gift-outline'}
      size={size}
      color={Colors.primary}
      
    />
  ),

  //Other Icons
  Reward: () => (
    <Icon 
      name={'gift'}
      size={18}
      color={Colors.black}
      
    />
  ),

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
  ),

  Plus: () => (
    <Icon 
      name='plus'
      size={30}
      color={Colors.white}
      
    />
  )
}