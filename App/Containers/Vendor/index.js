import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Container from '../../Components/Container'
import HeaderNav from '../../Components/HeaderNav'
import ProgressiveImage from '../../Components/Image/ProgressiveImage'

import NavigationService from '../../Services/NavigationService';
import {connect} from 'react-redux';
import styles from './styles';
import { Images, Fonts, Colors } from '../../Theme'
import Label from '../../Components/Text/Label'

let {BackArrow} = Images;

let stampSize = 25;

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
                                <Image source={Images.gift} style={{width: stampSize, height: stampSize}}/>
                            :
                                <Text style={styles.visitNumber}>{index+1}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {Object.keys(visitRewards).map((key, index) => 
                visitRewards[key].text ? (
                    <View style={styles.visitRewardContainer}>
                        <View style={styles.visitContainer}>
                            <Text style={{...Fonts.style.normal, color: Colors.white}}>{index+1}</Text>
                            <Text style={{...Fonts.style.small, color: Colors.white}}>Stamps</Text>
                        </View>
                        <View style={styles.rewardContainer}>
                            <Text style={{...Fonts.style.normal, color: Colors.primary}}>{visitRewards[key].text}</Text>
                        </View>
                    </View>
                )
                :
                null
            )}
        </View>
        
    )}

    renderStaticRewards = () => {
        //TODO: maybe scrollview here
        let {staticRewards} = this.state;
        return (
        <View style={styles.staticRewards}>
            <Label text={"Deals Offered"}/>
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

    renderContactDetail = (title, text) => (
        <Text style={{...styles.address, fontWeight: "600", color: 'black'}}>
        {title} <Text style={styles.address}>{text}</Text>
        </Text>
    )

    renderAddress = (address, phone) => (
        <View style={styles.addressContainer}>
            <Label text={"Contact"}/>
            {this.renderContactDetail("Address:", address)}
            {this.renderContactDetail("Phone:", phone)}
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
                        {this.renderAddress(this.state.branch, this.state.branch)}
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
