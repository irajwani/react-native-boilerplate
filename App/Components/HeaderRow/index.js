import React from 'react';
import { StyleSheet, View } from "react-native";
import shadowStyles from '../../StyleSheets/shadowStyles';

export default ({children, flex = 0.1, backgroundColor = "transparent", justifyContent = 'flex-start', style = null}) => (
    <View style={[styles.headerContainer, {flex, backgroundColor, justifyContent}, style ? style : null]}>
        {children}
    </View>
)


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 10,
        paddingHorizontal: 12
    },
})