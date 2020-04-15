import React, { Component } from 'react'
import { Text, View, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native'

import { Helpers, Fonts, Images, Colors } from '../../Theme';
import ProgressiveImage from '../Image/ProgressiveImage';
import shadowStyles from '../../StyleSheets/shadowStyles';

const Reward = ({reward, onRewardPress}) => (
    <View style={styles.rewardContainer}>
        <View style={styles.logoContainer}>
            <ProgressiveImage thumbnailSource={Images.blur} source={{uri: reward.logo}} style={styles.logo}/>
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.rewardTitle}>{reward.text}</Text>
            <Text style={styles.rewardDetails}>Details....</Text>
        </View>

        <TouchableOpacity disabled={reward.hasUsed ? true : false} 
        style={[styles.redeemButton, {backgroundColor: reward.hasUsed ? Colors.grey : Colors.secondary}]} 
        onPress={onRewardPress}
        >
            <Text style={[styles.redeemText]}>{reward.hasUsed ? "REDEEMED" : "REDEEM"}</Text>
        </TouchableOpacity>
        
    </View>
)
    
    
const RewardList = ({rewards, onRewardPress, style = null}) => (
    <Animated.FlatList 
        style={[styles.cardsContainer, style]}
        contentContainerStyle={styles.cardsContentContainer}
        data={rewards}
        showsVerticalScrollIndicator={true}
        renderItem={(item, index) => 
            <Reward reward={item.item} 
            onRewardPress={()=>onRewardPress(item.item.vendorUid, item.item.visitNumber)} 
            />
        }
        keyExtractor={(item, index) => index}
        numColumns={1}
    />
)

    
export default RewardList


const styles = StyleSheet.create({
    cardsContainer: {
        flex: 0.9,
        backgroundColor: '#fff'
    },
    cardsContentContainer: {
        // flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        
    },

        rewardContainer: {
            flexDirection: 'row',
            flex: 0.2,
            
        },

            logoContainer: {
                flex: 0.3,
                ...Helpers.center,
            },

                logo: {
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    borderWidth: 0.4,
                    borderColor: 'black'
                },

            textContainer: {
                flex: 0.4,
                margin: 5,
            },

                rewardTitle: {
                    ...Fonts.style.medium,
                    fontWeight: "400"
                },

                rewardDetails: {
                    ...Fonts.style.small,
                    fontWeight: "400"
                },


            redeemButton: {
                flex: 0.3,
                margin: 10,
                ...Helpers.center,
                ...shadowStyles.lowerGreyShadow,
                elevation: 2,
            },

                redeemText: {
                    ...Fonts.style.small,
                    color: Colors.black,
                    fontWeight: "400",
                },
})
