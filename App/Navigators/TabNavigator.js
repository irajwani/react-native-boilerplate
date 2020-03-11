
import React from 'react';

import {Image} from 'react-native';

import WalletStack from './StackNavigators/WalletStack'
import CardStack from './StackNavigators/CardStack';
import RewardStack from './StackNavigators/RewardStack';

import { createBottomTabNavigator } from 'react-navigation-tabs'; // Version can be specified in package.json
import { Colors, Images } from '../Theme';


let { Wallet, Cards, Gift } = Images;



let iconName;
let iconSize = 25;

WalletStack.navigationOptions = {
  tabBarLabel: "My Wallet",
  tabBarIcon: ({ focused, tintColor }) => {
    
    iconSize = focused ? 30 : 25;
    return <Image source={Images.wallet} style={{height: iconSize, width: iconSize}}/>;
  }
};

CardStack.navigationOptions = {
  tabBarLabel: "Browse Cards",
  tabBarIcon: ({ focused, tintColor }) => {
    
    iconSize = focused ? 30 : 25;
    return <Image source={Images.cards} style={{height: iconSize, width: iconSize}}/>;
  }
};

RewardStack.navigationOptions = {
  tabBarLabel: "My Rewards",
  tabBarIcon: ({ focused, tintColor }) => {
    
    iconSize = focused ? 30 : 25;
    return <Image source={Images.rewards} style={{height: iconSize, width: iconSize}}/>;
  }
};

// MarketToProductDetailsOrChatOrCommentsStack.navigationOptions = {
//   tabBarLabel: "Market",
//   tabBarIcon: ({ focused, tintColor }) => {
//     iconSize = focused ? 30 : 25;
//     return <MarketplaceIcon strokeWidth={"8"} focused={focused}/>
//   }
// };

// MultipleAddButtonToMultiplePictureCameraToCreateItemStack.navigationOptions = {
//   tabBarLabel: "Sell",
//   tabBarIcon: ({ focused, tintColor }) => {
//     iconName = focused ? 'plus-circle' : 'plus-circle-outline';
//     iconSize = focused ? 30 : 25;
//     return <BadgeIcon name={iconName} size={iconSize} color={tintColor} unreadCount={false} />;
//   }
// };

// ChatsToCustomChatStack.navigationOptions = {
//   tabBarLabel: "Chats",
//   tabBarIcon: ({ focused, tintColor }) => {
//     iconName = focused ? 'forum' : 'forum-outline';
//     iconSize = focused ? 30 : 25;
//     return <BadgeIcon name={iconName} size={iconSize} color={tintColor} unreadCount={true} />;
//   }
// };

const TabNavigator = createBottomTabNavigator(
            {

              
              WalletStack,
              CardStack,
              RewardStack,
              
              
            },
            {
              
              tabBarOptions: {
                activeTintColor: Colors.primary,
                inactiveTintColor: 'black',
                // showIcon: true,
                showLabel: true,
                

              },
              animationEnabled: true,
              // swipeEnabled: false,
            }
          ); 
        
    
export default TabNavigator;


