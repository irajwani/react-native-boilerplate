import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, Helpers } from '../../Theme';

export class LoyaltyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <Text style={{...Fonts.style.normal, fontWeight: "700"}}>LOGO</Text>
                </View>

                {/* dynamic stamp circles */}
            </View>
        )
    }
}

export default LoyaltyCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        margin: 20,
        borderRadius: 10,

    },

    headerContainer: {
        flex: 0.2,
        ...Helpers.center,
    },


})