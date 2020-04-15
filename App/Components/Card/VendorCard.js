import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import ProgressiveImage from '../Image/ProgressiveImage';

import shadowStyles from '../../StyleSheets/shadowStyles'
import borderStyles from '../../StyleSheets/borderStyles'
import { Images, Fonts, Helpers, Colors, Metrics } from '../../Theme';

let {Plus} = Images;


export default ({vendor, myCards, onPress, handleWalletChange}) => {
    let cardNotAdded = !myCards.map((card) => card.cardKey).includes(vendor.cardKey);
    console.log(cardNotAdded ? 'Can add card' : 'cannot add card');
    return (
    
    <TouchableOpacity 
    style={styles.card} onPress={onPress}
    // underlayColor={'transparent'}
    >
        <View style={[styles.imageContainer, {backgroundColor: vendor.loyaltyCard.backgroundColor}]}>
            <ProgressiveImage source={{uri: vendor.logo}} thumbnailSource={Images.blankAvatar} style={styles.image}/>
        </View> 

        <View style={styles.bodyContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{vendor.name}</Text>
                <TouchableOpacity 
                style={[styles.button, {backgroundColor: cardNotAdded ? Colors.primary : Colors.grey}]} 
                onPress={handleWalletChange}>
                    <Text style={styles.buttonText}>{cardNotAdded ? "Add to Wallet" : "Added"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.branchContainer}>
                <Text style={styles.branch}>{vendor.branch}</Text>
            </View>
            

            
            
        </View>
        
    </TouchableOpacity>
    
)}

const styles = StyleSheet.create({
    card: {
        // width: "100%",
        // height: Metrics.screenHeight/4.7,
        flex: 0.45,
        
        margin: Metrics.baseMargin,
        ...shadowStyles.whiteCard,
        backgroundColor: Colors.white,
        elevation: 2,
        
    },

    imageContainer: {
        flex: 0.65,
        // ...Helpers.center,
        // ...borderStyles.mediumBottomBorder
    },
        image: {
            width: "100%",
            height: 105,
        },

    bodyContainer: {
        flex: 0.35,
        marginTop: 15,
        marginHorizontal: 5,

    },
        nameContainer: {
            flexDirection: 'row',
            flex: 0.8,
            // alignItems: 'flex-start',
            justifyContent: 'space-between'
        },

            name: {
                ...Fonts.style.h4,
                fontWeight: "500"
            },

        branchContainer: {
            flex: 0.2,
            justifyContent: 'flex-end',
            marginTop: Metrics.baseMargin/2,
        },

            branch: {
                ...Fonts.style.small,
                color: Colors.text
            },

        button: {
            width: 90,
            ...Helpers.center,
            ...shadowStyles.whiteCard,
            elevation: 2,
            borderRadius: 20,
            padding: 5

        },

                buttonText: {
                    ...Fonts.style.small,
                    color: Colors.white,
                    fontWeight: "600"
                }


})
