import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LoyaltyCard from '../../Components/LoyaltyCard'
import Container from '../../Components/Container'

import { connect } from 'react-redux'

import VendorActions from '../../Stores/Vendor/Actions'

import NavigationService from '../../Services/NavigationService';
import VendorList from '../../Components/List/VendorList'
import Loading from '../../Components/ActivityIndicator/Loading'
import firebase from 'react-native-firebase'

class Home extends Component {
    async componentDidMount() {
        await this.props.getVendors();
        // console.tron.log(this.props.vendors);
    }

    logOut = () => {
        firebase.auth().signOut();
        // .then(() => {
        //     NavigationService.navigate()
        // })
    }

    render() {
        return (
            <Container>

                

                {this.props.vendors ?
                    <VendorList
                        vendors={this.props.vendors}
                        onPress={(vendor) => NavigationService.navigate('Vendor', {vendor})}
                    />
                :
                    <Loading/>
                }

                <Text onPress={this.logOut}>Log Out</Text>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    vendors: state.vendor.vendors,
})

const mapDispatchToProps = (dispatch) => ({
    getVendors: () => dispatch(VendorActions.getVendorsRequest()),

})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Home)