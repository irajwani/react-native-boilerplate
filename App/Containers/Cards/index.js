import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LoyaltyCard from '../../Components/LoyaltyCard'
import Container from '../../Components/Container'

import { connect } from 'react-redux'

import VendorActions from '../../Stores/Vendor/Actions'
import AuthActions from '../../Stores/Auth/Actions'

import NavigationService from '../../Services/NavigationService';
import CardList from '../../Components/List/CardList'
import Loading from '../../Components/ActivityIndicator/Loading'
import HeaderRow from '../../Components/HeaderRow'
import { Colors, Helpers } from '../../Theme'
import styles from './styles'
import shadowStyles from '../../StyleSheets/shadowStyles'

class Cards extends Component {
    
    async componentDidMount() {
        await this.props.getVendors();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.addStatus != this.props.addStatus && this.props.addStatus == 'done') {
          this.props.getVendors();
          this.props.getProfile(this.props.uid);
        }
    }

    handleWalletChange = (vendorUid, cardKey) => {
        this.props.addCard(this.props.uid, vendorUid, cardKey)
    }
    
    render() {
        let {isLoading, vendors, myCards} = this.props;
        console.log(vendors, myCards);
        if(isLoading) {
            return (
                <Container center>
                    <Loading />
                </Container>
            )
        }
        return (
            <Container>

                <HeaderRow backgroundColor={Colors.primary} shadow>
                    <Text style={styles.headerText}>Browse Cards</Text>
                </HeaderRow>
                
                
                {this.props.isLoading ?
                    <View style={[styles.cardsContainer, {...Helpers.center}]}>
                        <Loading/>
                    </View>
                    :
                    <View style={styles.cardsContainer}>
                        <CardList
                            vendors={vendors}
                            myCards={myCards == undefined ? [{vendorUid: 'nothing here', cardKey: 'not an actual key'}] : myCards}
                            //vendor input argument will be provided within CardList
                            onPress={(vendor) => NavigationService.navigate('Vendor', {vendor})}
                            handleWalletChange={(vendorUid, cardKey) => this.handleWalletChange(vendorUid, cardKey)}
                        />
                    </View>
                }
                
                
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    
    vendors: state.vendor.vendors,
    addStatus: state.vendor.addStatus,
    isLoading: state.vendor.isLoading,
    
    myCards: state.auth.profile.cards,
    
})

const mapDispatchToProps = (dispatch) => ({
    getVendors: () => dispatch(VendorActions.getVendorsRequest()),
    addCard: (uid, vendorUid, cardKey) => dispatch(VendorActions.addCardRequest(uid, vendorUid, cardKey)),

    getProfile: (uid) => dispatch(AuthActions.getProfileRequest(uid)),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Cards)