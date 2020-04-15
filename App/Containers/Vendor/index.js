import React, { Component } from 'react'
import { Animated, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import Container from '../../Components/Container'
import HeaderNav from '../../Components/HeaderNav'
import ProgressiveImage from '../../Components/Image/ProgressiveImage'

import NavigationService from '../../Services/NavigationService';

import {connect} from 'react-redux';
import RewardActions from '../../Stores/Reward/Actions'
import VendorActions from '../../Stores/Vendor/Actions'
import AuthActions from '../../Stores/Auth/Actions'

import styles from './styles';
import { Images, Fonts, Colors, Metrics } from '../../Theme'
import Label from '../../Components/Text/Label'

import shadowStyles from '../../StyleSheets/shadowStyles';
import Loading from '../../Components/ActivityIndicator/Loading';

let {AnimatedBackArrow, BackArrow, RightArrow, Phone, Place} = Images;

let stampSize = 25;
const inputRange = [0, 160, 280];

let numTriangles = Array(Number(40)).fill(1);

const WavyView = ({text, detail = false}) => (
    <View
    style={{
        marginBottom: 3,
    }}>
        <View style={{flexDirection: 'row', backgroundColor: Colors.secondary, padding: 5, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', position: 'absolute', zIndex: -222, bottom: -3}}>
                {numTriangles.map((num, index) => <View key={index} style={styles.semiCircle}/>)}
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
            presentDate: new Date,

            scrollY: new Animated.Value(0),

            //Confirmation modal
            staticReward: {},
            isVisible: false, 

            //Message modal
            isMessageVisible: false,
        };
        // console.tron.log(this.state);
    }

    async componentWillMount() {
        let payload = {
            uid: this.props.uid,
            vendorUid: this.state.uid,
        }
        await this.props.getVisitDetails(payload);
        await this.props.isRewardRedeemableFunction(payload);
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.addStatus != this.props.addStatus && this.props.addStatus == 'done') {
          this.props.getVendors();
          this.props.getProfile(this.props.uid);
          
        }
    }

    // componentDidUpdate = (prevProps) => {
    //     if(this.props.redeemStatus == 'done') {
    //         let payload = {
    //             uid: this.props.uid,
    //             vendorUid: this.state.uid,
    //         }   
    //         this.props.isRewardRedeemable(payload);
    //         // this.toggleMessageModal();
    //     }
    // }

    handleWalletChange = (vendorUid, cardKey) => {
        this.props.addCard(this.props.uid, vendorUid, cardKey)
    }

    renderVisitRewards = () => {
        let {name, loyaltyCard, visitRewards} = this.state;
        // console.log('stamps collected:', this.props.visitDetails.visitNumber);
        return (
        <View style={styles.visitRewards}>
            
            <WavyView text={"Stamps collected"} detail={`${this.props.visitDetails.visitNumber}/10`}/>


            <View style={
                [styles.loyaltyCard, 
                // {backgroundColor: loyaltyCard.backgroundColor}
                ]}
            >
                {Object.keys(visitRewards).map((key, index) => {
                    let isFilled = index + 1 <= this.props.visitDetails.visitNumber ? true : false;
                    return (
                    <View style={styles.stampContainer} key={key}>
                        <TouchableOpacity style={[styles.stamp, isFilled ? {backgroundColor: Colors.primary} : null]}>
                            {visitRewards[key].text ? 
                                isFilled ? 
                                    <Text style={[styles.visitNumber, {color: isFilled ? Colors.white : Colors.secondary}]}>{index+1}</Text>
                                :
                                    <Image source={Images.gift} style={{width: stampSize, height: stampSize}}/>
                            :
                                <Text style={[styles.visitNumber, {color: isFilled ? Colors.white : Colors.secondary}]}>{index+1}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    )}
                )}
            </View>

            <WavyView text={"Treets"} />

            {Object.keys(visitRewards).map((key, index) => 
                visitRewards[key].text ? (
                    <View key={index} style={styles.visitRewardContainer}>
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

    toggleConfirmationModal = () => this.setState({isVisible: !this.state.isVisible})

    toggleMessageModal = () => this.setState({isMessageVisible: !this.state.isMessageVisible})

    redeemStaticReward = () => {
        let {staticReward, uid} = this.state;

        let rewardRedeemed = {
            reward: staticReward,
            vendorUid: uid,
            uid: this.props.uid
        }
        // console.log("Redeeming:")
        // console.log(rewardRedeemed);
        this.props.redeemStaticReward(rewardRedeemed);
        this.toggleConfirmationModal();
    }

    isRedeemDisabled = () => {
        let {presentDate} = this.state;

    }

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
                        <TouchableOpacity 
                        disabled={!this.props.isRewardRedeemable}
                        style={[styles.dealButton, !this.props.isRewardRedeemable ? {borderColor: Colors.grey} : null]} 
                        onPress={() => {
                            this.setState({staticReward: staticRewards[key], isVisible: true})
                        }}>
                            <Text style={[styles.dealButtonText, !this.props.isRewardRedeemable ? {color: Colors.grey} : null]}>Treet!</Text>
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

    renderConfirmationModal = () => (
        <Modal
          rounded={false}
          modalStyle={{...shadowStyles.blackShadow, margin: Metrics.baseMargin, elevation: 2,}}
        //   modalTitle={<ModalTitle hasTitleBar={false} title="Redeem Gift" titleTextStyle={{...Fonts.style.medium, color: Colors.secondary, fontWeight: "600"}}/>}
          visible={this.state.isVisible}
          onTouchOutside={this.toggleConfirmationModal}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={this.toggleConfirmationModal}
          footer={
          <ModalFooter bordered={false}>
            <ModalButton
              text="YES"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.redeemStaticReward}
            />
            <ModalButton
              text="NO"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.toggleConfirmationModal}
            />
          </ModalFooter>
          }
        >
          <ModalContent>
                <Text style={styles.modalTitle}>Redeem Gift</Text>
                <Text style={styles.modalText}>Are you sure you wish to use this reward?</Text>
          </ModalContent>
        </Modal>
    )

    renderMessageModal = () => {
        let {staticReward} = this.state;
        let {name} = staticReward
        return ( 
        <Modal
          rounded={false}
          modalStyle={{...shadowStyles.blackShadow, margin: Metrics.baseMargin, elevation: 2,}}
          visible={this.state.isMessageVisible}
          onTouchOutside={this.toggleMessageModal}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={this.toggleMessageModal}
          footer={
          <ModalFooter bordered={false}>
            <ModalButton
              text="Okay"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.toggleMessageModal}
            />
          </ModalFooter>
          }
        >
          <ModalContent>
                <Text style={styles.modalTitle}>Success</Text>
                <Text style={styles.modalText}>You have availed the reward: {name}.</Text>
          </ModalContent>
        </Modal>
        )
    }

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
            outputRange: [Colors.primary, Colors.lightgrey, Colors.white],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
      }
    
      _getHeaderOpacity = () => {
          const {scrollY} = this.state;
    
          return scrollY.interpolate({
              inputRange,
              outputRange: [1, 0.3, 1],
              extrapolate: 'clamp',
              useNativeDriver: true
          });
    
      };

    render() {
        let {logo, name, branch, cardKey} = this.state;
        let {isLoading, isVendorLoading, myCards} = this.props;
        let cardNotAdded = !myCards.map((card) => card.cardKey).includes(cardKey);

        const headerOpacity = this._getHeaderOpacity();
        const headerColor = this._getHeaderColor();
        const arrowColor = this._getArrowColor();

        
        let address = branch.split(" ")[0], phone = branch.split(" ")[1]
        
        // console.log('Can Redeem?');
        // console.log(this.props.isRewardRedeemable);

        if(isLoading || isVendorLoading) {
            return (
                <Container center>
                    <Loading />
                </Container>
            )
        }

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
                    <TouchableOpacity 
                    style={[styles.button, {backgroundColor: cardNotAdded ? Colors.primary : Colors.grey}]} 
                    onPress={() => this.handleWalletChange(this.state.uid, cardKey)}>
                        <Text style={styles.buttonText}>{cardNotAdded ? "Add to Wallet" : "Added"}</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.bodyContainer}>

                    {this.renderVisitRewards()}
                    {this.renderStaticRewards()}
                    {this.renderAddress(address, phone)}
                </View>


            </Animated.ScrollView>
            {this.renderConfirmationModal()}
            {this.renderMessageModal()}
            </Container>

            
        )
    }
}


const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    redeemStatus: state.reward.redeemStatus,
    isLoading: state.reward.isLoading,
    isVendorLoading: state.vendor.isLoading,
    isRewardRedeemable: state.reward.isRewardRedeemable,
    visitDetails: state.reward.visitDetails,

    myCards: state.auth.profile.cards != undefined ? state.auth.profile.cards : [],
    // vendors: state.vendor.vendors,
})

const mapDispatchToProps = (dispatch) => ({
    addCard: (uid, vendorUid, cardKey) => dispatch(VendorActions.addCardRequest(uid, vendorUid, cardKey)),

    getVendors: () => dispatch(VendorActions.getVendorsRequest()),
    getProfile: (uid) => dispatch(AuthActions.getProfileRequest(uid)),

    redeemStaticReward: (rewardRedeemed) => dispatch(RewardActions.redeemStaticRewardRequest(rewardRedeemed)),
    isRewardRedeemableFunction: (payload) => dispatch(RewardActions.isRewardRedeemableRequest(payload)),
    getVisitDetails: (payload) => dispatch(RewardActions.getVisitDetailsRequest(payload)),
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
