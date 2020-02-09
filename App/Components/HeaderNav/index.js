import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Theme'

const HeaderNav = ({left, text, right, absolute = false}) => {
    
    return (
        <View style={[styles.headerContainer, absolute ? styles.absolute : null]}>
            {left()}
            <Text style={{...Fonts.style.h4, fontWeight: "500", color: Colors.secondary}}>
                {text}
            </Text>
            {right()}
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
        position: "absolute",zIndex: 1,width: "100%",
        backgroundColor: 'transparent'
    }
})
