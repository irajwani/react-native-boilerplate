import React, { Component } from 'react'
import { TextInput, View, Text } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Theme'

const AuthInput = ({placeholder, onChangeText, value, secureTextEntry, keyboardType}) => (
    <View style={{width: Metrics.screenWidth, height: 40, borderRadius: 30, backgroundColor: '#fff', }}>
        {/* <View style={{position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={{...Fonts.style.h3}}>{placeholder}</Text>
        </View> */}
        <TextInput
        secureTextEntry={secureTextEntry ? true : false}
        style={{height: 50, width: 280, fontFamily: 'Avenir Next', fontSize: 20, fontWeight: "500"}}
        placeholder={placeholder}
        placeholderTextColor={Colors.grey}
        onChangeText={onChangeText}
        value={value}
        multiline={false}
        
        autoCorrect={false}
        
        clearButtonMode={'while-editing'}
        underlineColorAndroid={"transparent"}
        keyboardType={keyboardType == "email" ? 'email-address' : 'default'}
        
        />         
    </View>
)

export default AuthInput
