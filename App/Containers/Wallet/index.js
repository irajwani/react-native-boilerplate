import React, { Component } from 'react'
import { Text, View, Animated, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import Container from '../../Components/Container';

import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import NavigationService from '../../Services/NavigationService.js';
import styles from './styles';
import { Fonts, Images, Colors } from '../../Theme';
import HeaderRow from '../../Components/HeaderRow'
import VendorCard from '../../Components/Card/VendorCard';
import ProgressiveImage from '../../Components/Image/ProgressiveImage';
import CardList from '../../Components/List/CardList';

import VendorActions from '../../Stores/Vendor/Actions'
import AuthActions from '../../Stores/Auth/Actions'
import shadowStyles from '../../StyleSheets/shadowStyles';

let {LogOut, Gear} = Images;

let stats = [
    {title: 'Number Of Stamps', number: 12},
    {title: 'Number of Rewards', number: 10},
    {title: 'Number of Cards Used', number: 3},
]

class Wallet extends Component {
    constructor(props) {
        super(props);
        // let {photoURL, displayName} = firebase.auth().currentUser;
        this.state = {
            // displayName,
            // photoURL,

            isDrawerActive: false,
            drawerHeight: new Animated.Value(0),

            isExitVisible: false,
        }
    }

    async componentDidMount() {
        console.log(JSON.stringify(this.props.auth))
        // if(this.props.uid) {
        //     await this.props.getProfile(this.props.uid);
        // }
        
        // this.props.getVendors();
    }

    toggleDrawer = () => {
      
        this.setState({isDrawerActive: !this.state.isDrawerActive}, () => {
          // Animated.
          Animated.spring(
            this.state.drawerHeight,
            {
              duration: 300,
              toValue: this.state.isDrawerActive ? 300 : 0,
              friction: 10
            }
          )
          .start();
        })
        
    }



    logOut = () => {
        firebase.auth().signOut();
        // .then(() => {
        //     NavigationService.navigate()
        // })
    }

    toggleExitModal = () => this.setState({isExitVisible: !this.state.isExitVisible})

    renderExitModal = () => (
        
        
        <Modal
            rounded={false}
            modalStyle={{...shadowStyles.blackShadow, }}
            modalTitle={<ModalTitle hasTitleBar={false} title="Log Out" titleTextStyle={{...Fonts.style.medium, color: Colors.primary, fontWeight: "400"}}/>}
            visible={this.state.isExitVisible}
            onTouchOutside={this.toggleExitModal}
            modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
            })}
            swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
            swipeThreshold={200} // default 100
            onSwipeOut={this.toggleExitModal}
            footer={
            <ModalFooter bordered={false} >
            <ModalButton
                text="YES"
                textStyle={{...Fonts.style.medium,color: Colors.primary}}
                onPress={() => {
                    this.toggleExitModal();
                    this.logOut();
                }}
            />
            <ModalButton
                text="NO"
                textStyle={{...Fonts.style.medium,color: Colors.primary}}
                onPress={this.toggleExitModal}
            />
            </ModalFooter>
            }
        >
            <ModalContent>
                <Text>Are you sure you want to log out?</Text>
            </ModalContent>
        </Modal>
              

    )

    render() {
        
        // console.tron.log(this.props.uid)
        return (
            <Container>
                <View style={styles.gradientBanner}>
                    <HeaderRow flex={0.25} justifyContent={'flex-end'} style={{paddingVertical: 5,}}>
                        <View style={{marginHorizontal: 5}}>
                            <Gear onPress={()=>NavigationService.navigate('Settings')}/>
                        </View>
                        {/* <Text style={{...Fonts.style.big}}>Profile</Text> */}
                        <LogOut onPress={this.toggleExitModal}/>
                        
                    </HeaderRow>
                </View>

                <View style={styles.bodyContainer}>

                    <View style={styles.profilePictureContainer}>
                        <ProgressiveImage thumbnailSource={Images.blankAvatar} source={{uri: this.props.photoURL }} style={styles.profilePicture}/>
                    </View>

                    <View style={styles.profileTextContainer}>
                        <Text style={styles.profileText}>{this.props.displayName}</Text>
                        <Text style={styles.profileText}>USER ID: {this.props.customerId}</Text>
                    </View>
                    
                    <View style={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <View key={index} style={styles.statContainer}>

                                <View style={styles.valueContainer}>
                                    <Text style={styles.number}>{stat.number}</Text>
                                </View>

                                <View style={[styles.valueContainer]}>
                                    <Text style={styles.title}>{stat.title}</Text>
                                </View>

                            </View>
                        ))}
                    </View>
                </View>

                <Animated.View style={styles.footerContainer}>
                    <TouchableOpacity onPress={this.toggleDrawer} style={styles.drawerHeader}>
                        <Text style={{...Fonts.style.h3, fontWeight: "300"}}>My Cards</Text>
                    </TouchableOpacity>

                    {this.props.myCards == undefined ?
                    <Animated.View style={{height: this.state.drawerHeight, backgroundColor: '#fff'}}/>
                    :
                    <CardList
                        //vendor input argument will be provided within CardList
                        vendors={this.props.vendors.filter(vendor => this.props.myCards.map((card) => card.vendorUid).includes(vendor.uid) )}
                        myCards={this.props.myCards}
                        onPress={(vendor) => NavigationService.navigate('Vendor', {vendor})}
                        style={{height: this.state.drawerHeight}}
                    />
                    }

                    {/* <Animated.FlatList 
                    style={[styles.drawerBody, {height: this.state.drawerHeight,}]} 
                    data={this.props.vendors}
                    showsVerticalScrollIndicator={true}
                    renderItem={(item, index) => <VendorCard vendor={item.item} onPress={}/>}
                    keyExtractor={(item, index) => index}
                    numColumns={1}

                    /> */}
                        
                    
                </Animated.View>

                {this.renderExitModal()}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    auth: state.auth,
    customerId: state.auth.profile.customerId,
    myCards: state.auth.profile.cards,
    photoURL: state.auth.profile.profile.photoURL,
    displayName: state.auth.profile.profile.displayName,
    vendors: state.vendor.vendors,
})

const mapDispatchToProps = (dispatch) => ({
    // getProfile: (uid) => dispatch(AuthActions.getProfileRequest(uid)),
    // getVendors: () => dispatch(VendorActions.getVendorsRequest()),


})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Wallet)
