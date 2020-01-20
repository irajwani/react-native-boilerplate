import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Container from '../../Components/Container'


import {connect} from 'react-redux';
import styles from './styles';


class Vendor extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = params.vendor;
        console.tron.log(this.state);
    }

    renderLoyaltyCard = () => {
        let {name, loyaltyCard, visitRewards} = this.state;
        
        return (
        <View style={[styles.loyaltyCard, {backgroundColor: loyaltyCard.backgroundColor}]}>

            <View style={styles.vendorNameContainer}>
                <Text>{name}</Text>
            </View>

            <View style={styles.stampsContainer}>
                {Object.keys(visitRewards).map((key) => (
                    <View style={styles.stampContainer} key={key}>
                        <TouchableOpacity style={styles.stamp}>
                            {visitRewards[key].name !== undefined && <Text style={{color: 'black'}}>visitRewards[key].name</Text>}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )}

    renderRedeemButton = () => (
        <TouchableOpacity style={styles.stampButtonContainer}>

        </TouchableOpacity>
    )

    renderStaticRewards = () => (
        <View style={styles.rewardsContainer}>

        </View>
    )

    render() {
        return (
            <ScrollView style={styles.container}>

                {this.renderLoyaltyCard()}
                {this.renderRedeemButton()}
                {this.renderStaticRewards()}

            </ScrollView>

            
        )
    }
}


const mapStateToProps = (state) => ({
    // vendors: state.vendor.vendors,
})

const mapDispatchToProps = (dispatch) => ({
    // markVisit: () => dispatch(VendorActions.getVendorsRequest()),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Vendor)
