import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Container from '../../Components/Container'
import HeaderNav from '../../Components/HeaderNav'
import ProgressiveImage from '../../Components/Image/ProgressiveImage'

import NavigationService from '../../Services/NavigationService';
import {connect} from 'react-redux';
import styles from './styles';
import { Images } from '../../Theme'
import Label from '../../Components/Text/Label'

let {BackArrow, Reward} = Images;

class Vendor extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = params.vendor;
        // console.tron.log(this.state);
    }

    renderVisitRewards = () => {
        let {name, loyaltyCard, visitRewards} = this.state;
        
        return (
        <View style={styles.visitRewards}>

            <Label text={"Loyalty card"}/>

            <View style={
                [styles.loyaltyCard, 
                // {backgroundColor: loyaltyCard.backgroundColor}
                ]
            }>
                {Object.keys(visitRewards).map((key, index) => (
                    <View style={styles.stampContainer} key={key}>
                        <TouchableOpacity style={styles.stamp}>
                            {visitRewards[key].text ? 
                                <Reward />
                            :
                                <Text style={styles.visitNumber}>{index+1}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
        
    )}

    renderStaticRewards = () => {
        //TODO: maybe scrollview here
        let {staticRewards} = this.state;
        return (
        <View style={styles.staticRewards}>
            <Label text={"Static deals"}/>
            {Object.keys(staticRewards).map((key, index) => (
                staticRewards[key].text ?
                <TouchableOpacity style={styles.dealContainer} key={key}>
                        <Text style={styles.deal}>{staticRewards[key].text}</Text>
                </TouchableOpacity>
                :
                null
            ))}
        </View>
    )}   

    renderAddress = (address) => (
        <View style={styles.addressContainer}>
            <Text style={{...styles.address, fontWeight: "600", color: 'black'}}>
            Address: <Text style={styles.address}>{address}</Text>
            </Text>
        </View>
    )

    render() {

        let {logo} = this.state;

        return (
            <ScrollView>

                <HeaderNav
                absolute 
                left={() => <BackArrow onPress={() => NavigationService.goBack()}/>}
                text={""}
                right={() => (<View></View>)}
                />

                <Container>
                    <View style={styles.bannerContainer}>
                        <ProgressiveImage thumbnailSource={Images.glass} source={Images.blur} style={styles.banner}/>
                    </View>

                    <View style={styles.bodyContainer}>

                        <View style={styles.logoContainer}>
                            <ProgressiveImage thumbnailSource={Images.smallProfile} source={{uri: logo}} style={styles.logo}/>
                        </View>

                        {this.renderVisitRewards()}
                        {this.renderStaticRewards()}
                        {this.renderAddress(this.state.branch)}
                    </View>


                </Container>



                

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
