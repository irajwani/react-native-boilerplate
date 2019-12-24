import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../Theme'

const AuthButton = ({text, onPress, disabled, extraStyles}) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.grey, padding: 20}, extraStyles]}>
        <Text>{text}</Text>
    </TouchableOpacity>
)

export default AuthButton
