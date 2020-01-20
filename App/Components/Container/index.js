import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Colors } from '../../Theme'

const Container = ({children, style = null} ) => (
    <View style={[styles.container, style ? style : null]}>
        {children}
    </View>
)

export default Container

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    }
})
