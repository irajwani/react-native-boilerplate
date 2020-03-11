import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Metrics, Fonts, Colors, Images, Helpers } from '../../Theme'

let {Eye} = Images;

const AuthInput = ({placeholder, onChangeText, value, secureTextEntry, keyboardType, style = false}) => {

    const [isVisible, toggleEye] = useState(false);



    return (
    <View style={{height: 50,marginBottom: 18 }}>
        <View style={{flex: 0.25, }}>
            <Text style={{...Fonts.style.small, fontWeight: "600", color: Colors.tertiary}}>{placeholder}</Text>
        </View>
        <TextInput
        secureTextEntry={secureTextEntry ? isVisible ? false : true : false}
        style={[{flex: 0.75, ...Fonts.style.normal, ...Helpers.thinBottomBorder, fontWeight: "600"}, style ? style : null]}
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
        {secureTextEntry && 
        <TouchableOpacity onPress={() => toggleEye(!isVisible)} style={{position: 'absolute',zIndex: 1, bottom: 10, right: 10}}>
            {isVisible ? <Eye/> : <Eye off/>}
        </TouchableOpacity>
        }        
    </View>
)
}
export default AuthInput

// width: Metrics.screenWidth - 20