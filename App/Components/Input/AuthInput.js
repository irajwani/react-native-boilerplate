import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Metrics, Fonts, Colors, Helpers } from '../../Theme'

const AuthInput = ({placeholder, onChangeText, value, secureTextEntry, keyboardType, style = false}) => (
    <View style={{width: Metrics.screenWidth - 20, height: 50,marginBottom: 18 }}>
        <View style={{flex: 0.25, justifyContent: 'flex-start', }}>
            <Text style={{...Fonts.style.small, fontWeight: "600"}}>{placeholder}</Text>
        </View>
        <TextInput
        secureTextEntry={secureTextEntry ? true : false}
        style={[{flex: 0.75, ...Fonts.style.normal, ...Helpers.thinBottomBorder}, style ? style : null]}
        placeholder={""}
        placeholderTextColor={Colors.grey}
        onChangeText={onChangeText}
        value={value}
        multiline={false}
        
        autoCorrect={false}
        autoCapitalize={'none'}
        clearButtonMode={'while-editing'}
        underlineColorAndroid={"transparent"}
        keyboardType={keyboardType ? keyboardType : 'default'}
        
        />         
    </View>
)

export default AuthInput
