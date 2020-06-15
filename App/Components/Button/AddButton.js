import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Value, eq, cond } from 'react-native-reanimated'
import CircularProgress from '../ActivityIndicator/CircularProgress'
import { Colors, Images } from '../../Theme'
import { withTransition, onGestureEvent, mix, bInterpolatePath } from 'react-native-redash'

let {Plus, Check} = Images;



let SIZE = 40;
let STROKE_WIDTH = 2;
let ICON_SIZE = 20;

const AddButton = ({cardNotAdded, onPress}) => {
    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({state});
    const isActive = eq(state, State.BEGAN);
    const duration = cond(isActive, 2000, 500);
    const progress = withTransition(isActive, {duration});
    const height = mix(progress, 0, ICON_SIZE);
    const scale = mix(progress, 1, 1.2)

    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View style={[styles.container, {transform: [{scale}]}]}>
                <View >
                    <CircularProgress radius={SIZE/2} bg={Colors.white} fg={Colors.primary} {...{progress}}/>
                </View>
                <View style={styles.iconContainer}>
                    {cardNotAdded ? 
                        <>
                        <Plus color={Colors.lightgrey} size={ICON_SIZE} style={styles.iconStyle}/>
                        <Animated.View style={[styles.activeIconStyle, {height, opacity: cardNotAdded ? 1 : 0}]}>
                            <Plus color={Colors.primary} size={ICON_SIZE} style={styles.iconStyle}/>
                        </Animated.View>
                        </>
                    :   
                        <Check color={Colors.primary} size={ICON_SIZE} style={styles.iconStyle}/>
                    }
                </View>
            </Animated.View>
        </TapGestureHandler>
    )
}

export default AddButton

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'red'
    },
    button: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE/2
    },

    iconContainer: {
        position: "absolute",
        top: STROKE_WIDTH,
        left: STROKE_WIDTH,
        right: STROKE_WIDTH,
        bottom: STROKE_WIDTH,
        backgroundColor: Colors.white,
        zIndex: 100,
        borderRadius: (SIZE - 2*STROKE_WIDTH)/2,

    },

        iconStyle: {
            top: (SIZE - 2*STROKE_WIDTH - ICON_SIZE)/2,
            left: (SIZE - 2*STROKE_WIDTH - ICON_SIZE)/2,
            
        },

        activeIconStyle: {
            position: "absolute",
            top: (SIZE - 2*STROKE_WIDTH - ICON_SIZE)/2,
            left: (SIZE - 2*STROKE_WIDTH - ICON_SIZE)/2,
            
        },
})
