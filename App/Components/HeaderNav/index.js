import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Fonts, Colors, Helpers } from '../../Theme'

const HeaderNav = ({left, text, right, absolute = false}) => {
    
    return (
        <View style={[styles.headerContainer, absolute ? styles.absolute : null]}>
            <View style={{flex: 0.2}}>
                {left()}
            </View>
            <View style={{flex: 0.6, ...Helpers.center}}>
                <Text style={{...Fonts.style.h4, fontWeight: "500", color: Colors.secondary}}>
                    {text}
                </Text>
            </View>
            
            <View style={{flex: 0.2}}>
                {right()}
            </View>
            
        </View>
    )
    
}

export default HeaderNav

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        flex: 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    absolute: {
        position: "absolute",zIndex: 1,
        // width: "100%",
        backgroundColor: 'transparent'
    }
})
