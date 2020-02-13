import React, { Component } from 'react'
import { Text, View, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native'

import VendorCard from "../Card/VendorCard"
import { Helpers, Fonts } from '../../Theme';


    
    
const CardList = ({vendors, myCards, onPress, handleWalletChange, style = null}) => (
        <Animated.FlatList 
            style={[styles.cardsContainer, style]}
            contentContainerStyle={styles.cardsContentContainer}
            data={vendors}
            showsVerticalScrollIndicator={true}
            renderItem={(item, index) => <VendorCard myCards={myCards} vendor={item.item} onPress={() => onPress(item.item)} handleWalletChange={() => handleWalletChange(item.item.uid)}/>}
            // renderItem={(item, index) => this.renderVendor(item.item, index)}
            keyExtractor={(item, index) => index}
            numColumns={1}
        />
    )

    
export default CardList


const styles = StyleSheet.create({
    cardsContainer: {
        flex: 0.9,
        backgroundColor: '#fff'
    },
    cardsContentContainer: {
        // flex: 1,
        flexGrow: 1,
        padding: 10,
        
    },

    

    vendorName: {
        ...Fonts.style.h2,
        
    }
})
