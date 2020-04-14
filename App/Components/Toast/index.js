import React, { Component, useState, useEffect } from 'react'
import { Animated, Text, View, StyleSheet, Easing } from 'react-native'
import { Metrics, Colors, Helpers, Fonts } from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles';


let duration = 4000;
const Toast = ({text})  => {
    let [fadeAnimation] = useState(new Animated.Value(0));

    useEffect(() => {

        Animated.sequence([
            Animated.timing(
                fadeAnimation,
                {
                  toValue: 1,
                  easing: Easing.ease,
                  duration: duration/4,
                }
            ),
            Animated.timing(
                fadeAnimation,
                {
                  toValue: 0,
                  easing: Easing.ease,
                  duration: 3*duration/4,
                }
            )
        ])
        .start()

      }, [])

    return (
        <Animated.View style={[styles.toast, {opacity: fadeAnimation}]}>
            <Text style={styles.text}>{text}</Text>
        </Animated.View>
    )
}

export default Toast;

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
        width: Metrics.screenWidth - 2*Metrics.baseMargin,
        backgroundColor: Colors.white,
        borderRadius: 15,
        ...shadowStyles.lowerThemeShadow,
        ...Helpers.center,
        padding: Metrics.baseMargin,
        
    },

        text: {
            ...Fonts.style.normal,
            fontWeight: "bold",
            color: Colors.primary
        }

})
