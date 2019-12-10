import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import {Metrics, Colors, Images, Fonts} from '../../Theme';
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService';

let {style} = Fonts;

export default class HeaderNavigation extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.actionIconContainer} onPress={() => NavigationService.goBack()}>
                    <Image source={this.props.sideNav ? require(`../../Assets/Images/menu-bars.png`) : require('../../Assets/Images/white-arrow-back.png')} style={this.props.sideNav ? styles.hamburgerMenu : styles.backArrow}/>
                </TouchableOpacity>

                <View style={styles.bodyContainer}>
                    <Text style={styles.headerText}>{this.props.text}</Text>
                </View>

                <TouchableOpacity style={styles.actionIconContainer} onPress={() => this.props.action()}>
                    <Text style={styles.actionText}>Search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

HeaderNavigation.propTypes = {
    sideNav: PropTypes.bool,
    text: PropTypes.string,
    action: PropTypes.func
}

HeaderNavigation.defaultProps = {
    sideNav: true,
    text: 'Videos',
    action: () => {
        console.log('pressed')
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.background.primary,
        flex: 0.1,
        flexDirection: 'row',
        // height: 0.1*Metrics.screenHeight,
        // zIndex: 8888,
        justifyContent: 'center',
        shadowColor: "#ffff",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    actionIconContainer: {
        flex: 0.225,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bodyContainer: {
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center'
    },

    hamburgerMenu: {
        width: 20,
        height: 20,
    },

    backArrow: {
        width: 50,
        height: 25
    },

    headerText: {
        ...style.h3,
        color: Colors.white

    },

    actionText: {
        ...style.regular,
        color: Colors.white

    },
})
