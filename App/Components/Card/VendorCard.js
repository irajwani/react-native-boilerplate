import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import ProgressiveImage from '../Image/ProgressiveImage';

import shadowStyles from '../../StyleSheets/shadowStyles'
import borderStyles from '../../StyleSheets/borderStyles'
import { Images, Fonts, Helpers, Colors, Metrics } from '../../Theme';

let {Plus} = Images;


export default ({vendor, myCards, onPress, handleWalletChange}) => {
    let cardNotAdded = !myCards.map((card) => card.vendorUid).includes(vendor.uid);
    return (
    
    <TouchableOpacity 
    style={styles.card} onPress={onPress}
    // underlayColor={'transparent'}
    >
        <View style={[styles.imageContainer, {backgroundColor: vendor.loyaltyCard.backgroundColor}]}>
            <ProgressiveImage source={{uri: vendor.logo}} thumbnailSource={Images.blankAvatar} style={styles.image}/>
        </View>

        <View style={styles.textContainer}>

            <TouchableOpacity style={styles.button} onPress={handleWalletChange}>
                
                <View style={styles.buttonIconContainer}>
                    {cardNotAdded && <Plus/>}
                </View>
                <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonText}>{cardNotAdded ? "Add to Wallet" : "Added"}</Text>
                </View>
                
            </TouchableOpacity>

            <Text style={styles.name}>{vendor.name}</Text>
            <Text style={styles.branch}>{vendor.branch}</Text>
        </View>
        
    </TouchableOpacity>
    
)}

const styles = StyleSheet.create({
    card: {
        // width: "100%",
        height: Metrics.screenHeight/4.7,
        // flex: 0.33,
        margin: 5,
        ...shadowStyles.whiteCard,
        ...borderStyles.mediumBorder,
        backgroundColor: 'white'
        
    },

    imageContainer: {
        flex: 0.65,
        ...Helpers.center,
        ...borderStyles.mediumBottomBorder
    },
        image: {
            width: 90,
            height: 90
        },

    textContainer: {
        flex: 0.35,
        justifyContent: 'space-between',
        marginVertical: 2,
        marginHorizontal: 5,
        // ...shadowStyles.whiteCard

    },

        name: {
            ...Fonts.style.h4,
            fontWeight: "500"
        },

        branch: {
            ...Fonts.style.small,
        },

        button: {
            height: 40,
            flexDirection: 'row',
            width: "48%",
            top: -20,
            right: -5, //to account for margin imposed by Parent
            position: 'absolute',
            zIndex: 1,
            
            ...shadowStyles.lowerBlackShadow,
            alignSelf: 'flex-end',
            backgroundColor: '#fff',

        },

            buttonIconContainer: {
                backgroundColor: Colors.primary,
                ...Helpers.center,
                flex: 0.3,
                
                

            },

            buttonTextContainer: {
                ...Helpers.center,
                flex: 0.7,
                ...borderStyles.mediumBorder,
                borderLeftWidth: 0,
                borderRightWidth: 0,
            },
                buttonText: {
                    ...Fonts.style.small
                }


})
