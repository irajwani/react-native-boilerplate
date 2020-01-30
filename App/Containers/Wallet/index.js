import React, { Component } from 'react'
import { Text, View, Animated, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Container from '../../Components/Container';

import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

import styles from './styles';
import { Fonts, Images } from '../../Theme';
import VendorCard from '../../Components/Card/VendorCard';
import ProgressiveImage from '../../Components/Image/ProgressiveImage';

let stats = [
    {title: 'Number Of Stamps', number: 12},
    {title: 'Number of Rewards', number: 10},
    {title: 'Number of Cards Used', number: 3},
]

let cards = [{}]

class Wallet extends Component {
    constructor(props) {
        super(props);
        let {photoURL, displayName} = firebase.auth().currentUser;
        this.state = {
            displayName,
            photoURL,

            isDrawerActive: false,
            drawerHeight: new Animated.Value(0),
        }
    }

    async componentDidMount() {
        await this.props.getVendors();
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

    render() {
        return (
            <Container>
                <View style={styles.gradientBanner}>
                    <View style={styles.headerContainer}>
                        <Text style={{...Fonts.style.big}}>Profile</Text>
                        <Text onPress={this.logOut}>Log Out</Text>
                    </View>
                </View>

                <View style={styles.bodyContainer}>

                    <View style={styles.profilePictureContainer}>
                        <ProgressiveImage thumbnailSource={Images.blankAvatar} source={{uri: this.state.photoURL }} style={styles.profilePicture}/>
                    </View>

                    <View style={styles.profileTextContainer}>
                        <Text style={styles.profileText}>{this.state.displayName}</Text>
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
                        <Text style={{...Fonts.style.h4, fontWeight: "300"}}>My Cards</Text>
                    </TouchableOpacity>

                    <Animated.FlatList 
                    style={[styles.drawerBody, {height: this.state.drawerHeight,}]} 
                    data={this.props.vendors}
                    showsVerticalScrollIndicator={true}
                    renderItem={(item, index) => <VendorCard vendor={item.item}/>}
                    keyExtractor={(item, index) => index}
                    numColumns={1}

                    />
                        
                    
                </Animated.View>

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
)(Wallet)
