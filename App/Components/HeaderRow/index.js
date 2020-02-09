import React from 'react';
import { StyleSheet, View } from "react-native";

export default ({children, flex = 0.1, backgroundColor = "transparent"}) => (
    <View style={[styles.headerContainer, {flex, backgroundColor}]}>
        {children}
    </View>
)


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
})