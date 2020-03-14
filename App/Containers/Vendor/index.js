import React, { Component } from 'react'
import { Animated, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Container from '../../Components/Container'
import HeaderNav from '../../Components/HeaderNav'
import ProgressiveImage from '../../Components/Image/ProgressiveImage'

import NavigationService from '../../Services/NavigationService';
import {connect} from 'react-redux';
import styles from './styles';
import { Images, Fonts, Colors, Metrics } from '../../Theme'
import Label from '../../Components/Text/Label'

let {AnimatedBackArrow, BackArrow, RightArrow, Phone, Place} = Images;

let stampSize = 25;
const inputRange = [0, 160, 280];

let numTriangles = Array(Number(40)).fill(1);

const WavyView = ({text, detail = false}) => (
    <View style={{
        marginBottom: 3,
    }}>
        <View style={{flexDirection: 'row', backgroundColor: Colors.secondary, padding: 5, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', position: 'absolute', zIndex: -222, bottom: -3}}>
                {numTriangles.map((num, index) => <View style={styles.semiCircle}/>)}
            </View>
            <Label text={text}/>
            {detail && <Label text={detail}/>}
        </View>
        
        
    </View>
)

class Vendor extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            ...params.vendor, 
            scrollY: new Animated.Value(0)
        };
        // console.tron.log(this.state);
    }

    renderVisitRewards = () => {
        let {name, loyaltyCard, visitRewards} = this.state;
        
        return (
        <View style={styles.visitRewards}>
            
            <WavyView text={"Stamps collected"} detail={`${0}/10`}/>


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
                                <Text style={[styles.visitNumber, {color: Colors.secondary}]}>{index+1}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <WavyView text={"Treets"} />

            {Object.keys(visitRewards).map((key, index) => 
                visitRewards[key].text ? (
                    <View style={styles.visitRewardContainer}>
                        <View style={styles.visitContainer}>
                            <Text style={{...Fonts.style.h3, fontWeight: "bold", color: Colors.white}}>{index+1}</Text>
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
            <WavyView text={"Exclusive deals"}/>
            {Object.keys(staticRewards).map((key, index) => (
                staticRewards[key].text ?
                <View style={[styles.dealContainer, index == 0 ? {marginTop: 5} : null, index == Object.keys(staticRewards).length - 1 ? {marginBottom: 5} : null]} key={key}>
                    <View style={styles.dealIconContainer}>
                        <View style={styles.circle}>
                            <RightArrow />
                        </View>
                    </View>
                    <View style={styles.dealTextContainer}>
                        <Text style={styles.deal}>{staticRewards[key].text}</Text>
                    </View>
                    
                    <View style={styles.dealButtonContainer}>
                        <TouchableOpacity style={styles.dealButton} onPress={()=>console.log('pressed')}>
                            <Text style={styles.dealButtonText}>Treet!</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                :
                null
            ))}
        </View>
    )}   

    renderContactDetail = (title, text) => (
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
            <View style={styles.purpleCircle}>
                {title == "Phone:" ? <Phone/> : <Place/>}
            </View>
            <Text style={styles.address}>{text}</Text>
        </View>
        
        
    )

    renderAddress = (address, phone) => (
        <>
        <WavyView text={"Contact"}/>
        <View style={styles.addressContainer}>
            
            {this.renderContactDetail("Address:", address)}
            {this.renderContactDetail("Phone:", phone)}
        </View>
        </>
    )

    _getHeaderColor = () => {
        const {scrollY} = this.state;
    
        return scrollY.interpolate({
            inputRange,
            outputRange: ['transparent', Colors.primary, Colors.primary],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
      }
    
      _getArrowColor = () => {
        const {scrollY} = this.state;
    
        return scrollY.interpolate({
            inputRange,
            outputRange: [Colors.secondary, Colors.lightgrey, Colors.white],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
      }
    
      _getHeaderOpacity = () => {
          const {scrollY} = this.state;
    
          return scrollY.interpolate({
              inputRange,
              outputRange: [0, 0.3, 1],
              extrapolate: 'clamp',
              useNativeDriver: true
          });
    
      };

    render() {
        const headerOpacity = this._getHeaderOpacity();
        const headerColor = this._getHeaderColor();
        const arrowColor = this._getArrowColor();

        let {logo, name} = this.state;

        return (
            <Container>
            <Animated.View style={[styles.headerContainer, {backgroundColor: headerColor, opacity: headerOpacity}]}>
                <AnimatedBackArrow
                color={arrowColor}
                onPress={() => NavigationService.goBack()}
                />

                <Animated.Text style={{...styles.header, color: arrowColor}}>{name}</Animated.Text>
                    
                
            </Animated.View>
            <Animated.ScrollView
             onScroll={Animated.event(
                [
                {
                    nativeEvent: {contentOffset: {y: this.state.scrollY}}
                }
                ]
            )}
            style={styles.scrollContainer} 
            contentContainerStyle={styles.contentContainer}
            >
                
                <View style={styles.bannerContainer}>
                    <ProgressiveImage thumbnailSource={Images.glass} source={Images.blur} style={styles.banner}/>
                    <View style={styles.logoContainer}>
                        <ProgressiveImage thumbnailSource={Images.smallProfile} source={{uri: logo}} style={styles.logo}/>
                    </View>
                    
                </View>

                <View style={styles.bodyContainer}>

                    {this.renderVisitRewards()}
                    {this.renderStaticRewards()}
                    {this.renderAddress(this.state.branch, this.state.branch)}
                </View>


            </Animated.ScrollView>
            </Container>

            
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

{/* <HeaderNav
                absolute 
                left={() => <BackArrow onPress={() => NavigationService.goBack()}/>}
                text={""}
                right={() => (<View></View>)}
                /> */}
