import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default ({vendor}) => (
    <View style={styles.card}>
        <Text>{vendor.name}</Text>
    </View>
)

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 50,
        margin: 5,
        backgroundColor: 'pink'
    }
})
