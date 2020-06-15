import React from 'react';

import {View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'

import * as Animatable from 'react-native-animatable';

import Colors from './Colors';

const AnimatableIcon = Animatable.createAnimatableComponent(Icon);

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

  tutBg: require(`${path}/SilkBg.jpg`),
  loginBg: require(`${path}/loginBg.jpeg`),
  walletBg: require(`${path}/walletBg.png`),

  gift: require(`${path}/Gift.png`),
  stamp: require(`${path}/Stamp.png`),
  loyaltyProgram: require(`${path}/LoyaltyProgram.png`),

   

  //Tabs

  wallet: require(`${path}/Wallet.png`),
  cards: require(`${path}/Cards.png`),
  rewards: require(`${path}/Rewards.png`),
  
  // Wallet: ({size, focused}) => (
  //   <Icon 
  //     name={focused ? 'wallet' : 'wallet-outline'}
  //     size={size}
  //     color={Colors.primary}
      
  //   />
  // ),

  // Cards: ({size, focused}) => (
  //   <Icon 
  //     name={focused ? 'cards' : 'cards-outline'}
  //     size={size}
  //     color={Colors.primary}
      
  //   />
  // ),

  // Gift: ({size, focused}) => (
  //   <Icon 
  //     name={focused ? 'gift' : 'gift-outline'}
  //     size={size}
  //     color={Colors.primary}
      
  //   />
  // ),

  //Other Icons
  Reward: () => (
    <Icon 
      name={'gift'}
      size={18}
      color={Colors.black}
      
    />
  ),

  AnimatedBackArrow: ({color, onPress}) => (
    <AnimatableIcon
      name='arrow-left'
      size={28}
      style={{color: color}}
      onPress={onPress}
      />
  ),

  RightArrow: () => (
    <Icon 
      name='arrow-right'
      size={48}
      color={Colors.white}
    />
    
  ),

  BackArrow: ({onPress, color = Colors.white}) => (
    <Icon 
      name='arrow-left'
      size={35}
      color={color}
      onPress={onPress}
    />
    
  ),

  Eye: ({off = false}) => (
    <Icon 
      name={!off ? 'eye' : 'eye-off'}
      size={20}
      color={Colors.secondary}
      
    />
    
  ),

  PasswordsMatch: () => (
    <Icon 
      name='lock'
      size={30}
      color={Colors.secondary}
      
    />
  ),

  Gear: ({onPress}) => (
    <FontAwesomeIcon 
      name='cog'
      size={32}
      color={Colors.black}
      onPress={onPress}
    />
    
),

  LogOut: ({onPress}) => (
      <Ionicon 
        name='ios-exit'
        size={32}
        color={Colors.black}
        onPress={onPress}
      />
      
  ),

  

  // LogOut: ({onPress}) => (
  //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //     <View style={{position: "absolute", left: 2}}>
  //       <Icon 
  //         name='door-open'
  //         size={30}
  //         color={Colors.black}
  //         onPress={onPress}
  //       />
  //     </View>
  //     <Icon 
  //       name='arrow-right'
  //       size={20}
  //       color={Colors.white}
  //       onPress={onPress}
  //     />
  //   </View>
  // ),



  Plus: ({color = Colors.white, size = 30, style=null}) => (
    <Icon 
      name='plus'
      size={size}
      color={color}
      style={style}
    />
  ),

  Check: ({color = Colors.black, size = 30, style=null}) => (
    <Icon
    name="check"
    size={size}
    color={color} 
    style={style}
    />
  ),

  Facebook: ({onPress}) => (
    <Icon 
      name='facebook'
      size={32}
      color={Colors.facebook}
      onPress={onPress}
    />
  ),

  Phone: () => (
    <Icon
    name="phone"
    size={18}
    color={Colors.white} 
    />
  ),

  Place: () => (
    <Icon
    name="home"
    size={18}
    color={Colors.white} 
    />
  ),






}