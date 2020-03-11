import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LoyaltyCard from '../../Components/LoyaltyCard'
import Container from '../../Components/Container'

import { connect } from 'react-redux'

import VendorActions from '../../Stores/Vendor/Actions'

import NavigationService from '../../Services/NavigationService';
import CardList from '../../Components/List/CardList'
import Loading from '../../Components/ActivityIndicator/Loading'
import HeaderRow from '../../Components/HeaderRow'
import { Colors } from '../../Theme'
import styles from './styles'
import shadowStyles from '../../StyleSheets/shadowStyles'


class Cards extends Component {
    
    async componentDidMount() {
        await this.props.getVendors();
    }

    handleWalletChange = (vendorUid) => {
        this.props.addCard(this.props.uid, vendorUid)
    }
    
    render() {
        console.tron.log(this.props.uid);
        return (
            <Container style={{...shadowStyles.lowerBlackShadow}}>

                <HeaderRow backgroundColor={Colors.primary} shadow>
                    <Text style={styles.headerText}>Browse Cards</Text>
                </HeaderRow>
                
                
                {this.props.vendors ?
                    <CardList
                        vendors={this.props.vendors}
                        myCards={this.props.myCards == undefined ? [{vendorUid: 'nothing here'}] : this.props.myCards}
                        //vendor input argument will be provided within CardList
                        onPress={(vendor) => NavigationService.navigate('Vendor', {vendor})}
                        handleWalletChange={(vendorUid) => this.handleWalletChange(vendorUid)}
                    />
                :
                    <View style={styles.cardsContainer}>
                        <Loading/>
                    </View>
                }
                
                
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    vendors: state.vendor.vendors,
    myCards: state.auth.profile.cards,
})

const mapDispatchToProps = (dispatch) => ({
    getVendors: () => dispatch(VendorActions.getVendorsRequest()),
    addCard: (uid, vendorUid) => dispatch(VendorActions.addCardRequest(uid, vendorUid)),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Cards)