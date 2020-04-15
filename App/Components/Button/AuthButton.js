import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles'

const AuthButton = ({text, onPress, disabled, extraStyles, textStyles}) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, extraStyles]}>
        <Text style={[styles.text, textStyles]}>{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center', alignItems: 'center', 
        backgroundColor: Colors.secondary, 
        width: Metrics.screenWidth/1.5,
        paddingVertical: 8, 
        borderRadius: 30,
        ...shadowStyles.greyShadow,
        elevation: 2
    },

    text: {
        ...Fonts.style.normal,
        fontWeight: "600",
        color: Colors.white
    }
})

export default AuthButton
