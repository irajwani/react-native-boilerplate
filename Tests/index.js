import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddButton from './AddButton'


export default class Test extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <AddButton cardNotAdded={false} onPress={() => console.log('pressed')}/>
            </View>
        )
    }
}
