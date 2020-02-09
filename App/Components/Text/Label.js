import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Fonts } from '../../Theme';

export default ({text}) => (
    <View style={styles.labelContainer}>
        <Text style={styles.label}>{text}</Text>
    </View>
)

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
    },

        label: {
            ...Fonts.style.h4,
            fontWeight: "400",
            textTransform: "uppercase"
        }

})