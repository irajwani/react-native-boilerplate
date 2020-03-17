import React, { Component } from 'react'
import { Image, View, ScrollView, TouchableOpacity, Text, Keyboard, KeyboardAvoidingView, Modal, Linking, SafeAreaView } from 'react-native'

import RNFetchBlob from 'rn-fetch-blob';

import Container from '../../Components/Container'
import AuthInput from '../../Components/Input/AuthInput'
import AuthButton from '../../Components/Button/AuthButton';

import NavigationService from '../../Services/NavigationService';
import firebase from 'react-native-firebase';

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import SelectPictures from '../../Components/SelectPictures';
import { Colors, Images, Helpers, Metrics, Fonts, Strings } from '../../Theme';
import Loading from '../../Components/ActivityIndicator/Loading';
import HeaderNav from '../../Components/HeaderNav';

const { EulaTop, EulaBottom, TsAndCs, PrivacyPolicy, EulaLink } = Strings;

const {BackArrow, PasswordsMatch} = Images;

let avatarUri = "https://firebasestorage.googleapis.com/v0/b/spreezy-643e2.appspot.com/o/Placeholders%2Fblank.jpg?alt=media&token=bf2ab9de-bcf7-4138-9bba-0e4e47f1ff73";
let numbers = /^[0-9]+$/;

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            email: 'sameer@gmail.com',
            pass: 'password',
            pass2: 'password',

            firstName: 'Sameer',
            lastName: 'Dada',

            phone: "0321256732",

            modalVisible: false,
            termsModalVisible: false,
            privacyModalVisible: false,
        }
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow.bind(this),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide.bind(this),
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        // if (nextProps.registerStatus === true) {
        //     console.tron.log('Reg complete, going to app')
        //     NavigationService.navigate('AppStack')
        // }
    }

    keyboardDidShow() {
        this.setState({keyboardShown: true})
    }
    
    keyboardDidHide() {
        this.setState({keyboardShown: false})
    }
    
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    //Invoked when you 'Accept' EULA as a Google User trying to sign up
    createProfileForGoogleOrFacebookUser = async (user, pictureuri, socialPlatform) => {

        console.log('Initiate FB or Google Sign Up')
        this.setState({createProfileLoading: true});
        if(socialPlatform == "google") {
            const {idToken, accessToken} = user;
            const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            const socialUser = await firebase.auth().signInWithCredential(credential);
            const {email, pass} = this.state
            const linkWithEmailCredential = await firebase.auth.EmailAuthProvider.credential(email, pass);
            console.log(credential);
            firebase.auth().currentUser.linkAndRetrieveDataWithCredential(linkWithEmailCredential).then( (usercred) => {
                // console.log(usercred);
                this.updateFirebase(this.state, pictureuri, mime='image/jpg',socialUser.uid, );
                // console.log("Account linking success", usercred.user);
            }, function(error) {
                console.log("Account linking error", error);
            });   
        }
        else {
            const {accessToken} = user;
            const credential = await firebase.auth.FacebookAuthProvider.credential(accessToken);
            const socialUser = await firebase.auth().signInWithCredential(credential);
            const {email, pass} = this.state
            const linkWithEmailCredential = await firebase.auth.EmailAuthProvider.credential(email, pass);
            console.log(credential);
            firebase.auth().currentUser.linkAndRetrieveDataWithCredential(linkWithEmailCredential).then( (usercred) => {
                // console.log(usercred);
                this.updateFirebase(this.state, pictureuri, mime='image/jpg',socialUser.uid, );
                // console.log("Account linking success", usercred.user);
            }, function(error) {
                console.log("Account linking error", error);
            });
        }
    
    }

    promiseToUploadPhoto = (uid, uri) => {
        return new Promise(async (resolve, reject) => {
            let mime = "image/jpg";
            if(uri.includes('googleusercontent') || uri.includes('platform') || uri.includes('firebasestorage')) {
                // console.log(`We already have a url for this image: ${uri}, so need for interaction with cloud storage, just store URL in cloud db`);
                
                // const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
                resolve(uri);
            }

            else if(uri == "nothing here") {
                resolve(avatarUri)
            }

            else {
                console.log('user has chosen picture manually through photo lib or camera, store it on cloud and generate a URL for it.')
                // let resizedImage = await ImageResizer.createResizedImage(uri,resizedWidth, resizedHeight,'JPEG',suppressionLevel);
                // const uploadUri = Platform.OS === 'ios' ? resizedImage.uri.replace('file://', '') : resizedImage.uri
                const uploadUri = Metrics.platform == "ios" ? uri.replace('file://', '') : uri
                // let uploadBlob = null
                // const imageRef = 
                firebase.storage().ref().child(`Users/${uid}/profile`)
                .putFile(uploadUri, {contentType: mime})
                .then(uploadTask => {
                    console.log(uploadTask)
                    resolve(uploadTask.downloadURL);
                })
                .catch((error) => {
                    reject(error)
                })
                
                
                
                
            }
    
    })
    }

    createProfile = (uri) => {
        
        console.log("Initaite profile creation");
        // this.setState({isLoading: true})
        let {email, pass, firstName, lastName} = this.state;
        let {createUser} = this.props;
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(async () => {
            console.log('created new firebase certified user');
            let uid = firebase.auth().currentUser.uid;
            let url = await this.promiseToUploadPhoto(uid, uri);
            return {uid, url}
        })
        .then(({uid, url}) => {
            // let token = await AsyncStorage.getItem('fcmToken');
            let newUser = {
                uid,
                email,
                picture: url,
                name: firstName + " " + lastName, 
                token: "dJUd9hBupPI:APA91bHq7vv-mlMWvsplrlBFq8RI6mstf0ub8Ws6H-EYffd5M2zkP2Stg78Lk3WdzxkjmVfGUwoNm0DJmHivmgG84fqD7es3Fj8wuUisSQHLCe6yclsuITUDzRfnjuU1_j5HPdTdJ7yY",
            }
            createUser(newUser);
            // this.setState({isLoading: false});
        })
        .catch( error => {
            console.log(error)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            }
        })
    }

    renderProfileInputFields = (passwordConditionMet) => (
        <>
            <View style={{flexDirection: 'row', }}>
                <View style={{flex: 0.5}}>
                    <AuthInput 
                    placeholder={"First Name"} 
                    value={this.state.firstName} 
                    onChangeText={firstName => this.setState({ firstName })}
                    maxLength={13}
                    />
                </View>
                <View style={{flex: 0.5}}>
                    <AuthInput
                        placeholder={'Last Name'}
                        value={this.state.lastName}
                        onChangeText={lastName => this.setState({lastName})}
                        
                    />
                </View>
            </View>

            {this.renderAuthInputFields(passwordConditionMet)}

            <AuthInput
                placeholder={'Phone Number (Optional)'}
                value={this.state.phone}
                onChangeText={phone => {
                    if(phone.match(numbers) || phone == "") {
                        this.setState({phone})
                    }
                    else {
                        alert('Please input a valid phone number.')
                    }
                    
                }}
                keyboardType={Metrics.platform == "ios" ? 'number-pad' : 'phone-pad'}
            />
        </>
        
        

        
    )

    renderAuthInputFields = (passwordConditionMet) => (
        <>
            <AuthInput
                placeholder={'Email'}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                keyboardType={'email-address'}
            />

            <AuthInput
                placeholder={'Password'}
                value={this.state.pass}
                onChangeText={pass => this.setState({pass})}
                secureTextEntry
            />

            <View style={{
                flexDirection: 'row', 
            }}>
                <View style={{flex: passwordConditionMet ? 1 : 0.85}}>
                    <AuthInput 
                    placeholder={"Retype Password"} 
                    value={this.state.pass2} 
                    onChangeText={pass2 => this.setState({ pass2 })}
                    secureTextEntry
                    />
                </View>
                {passwordConditionMet && 
                <View style={{flex: 0.15, justifyContent: 'center', alignItems: 'center'}}>
                    <PasswordsMatch/>
                </View>
                }

            </View>

        </>
    )

    renderTermsModal = () => (
        //   {/* Modal to show Terms and Conditions */}
          <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.termsModalVisible}
          onRequestClose={() => {
              Alert.alert('Modal has been closed.');
          }}
          >
              <SafeAreaView style={styles.modal}>
                  <Text style={styles.modalHeader}>Terms & Conditions of Use</Text>
                  <ScrollView contentContainerStyle={styles.licenseContainer}>
                      <Text>{TsAndCs}</Text>
                  </ScrollView>
                  <Text onPress={() => { this.setState({modalVisible: true, termsModalVisible: false}) }} style={styles.gotIt}>
                      Got It!
                  </Text>
              </SafeAreaView>
          </Modal>
      )
    
    renderPrivacyModal = () => (
        // {/* Modal to show Privacy Policy */}
        <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.privacyModalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}
        >
            <SafeAreaView style={styles.modal}>
                <Text style={styles.modalHeader}>Privacy Policy of Treet - loyalty cards</Text>
                <ScrollView contentContainerStyle={styles.licenseContainer}>
                    <Text>{PrivacyPolicy}</Text>
                </ScrollView>
                <Text onPress={() => { this.setState({modalVisible: true, privacyModalVisible: false}) }} style={styles.gotIt}>
                    Got It!
                </Text>
            </SafeAreaView>
        </Modal>
    )

    

    render() {
        let {isLoading} = this.state;
        let {navigation} = this.props;

        const {params} = navigation.state
        var googleUser = params.googleUserBoolean ? true : false;
        var facebookUser = params.facebookUserBoolean ? true : false;
        //may be reusing booleans here, but this check on isUserGoogleUser? alright logically so far
        var user = params.googleUserBoolean || params.facebookUserBoolean ? params.user : null;

        var pictureuris = navigation.getParam('pictureuris', "nothing here");
        var passwordConditionMet = (this.state.pass == this.state.pass2) && (this.state.pass.length > 0);
        var isDone = this.state.firstName && this.state.lastName && this.state.email && passwordConditionMet;
        if(isLoading) {
            return (
                <Container center>
                    <Loading/>
                </Container>
            )
        }

        
        return (
            <Container style={{marginHorizontal: 10}}>

                <HeaderNav
                    left={() => (
                        <BackArrow onPress={() => NavigationService.goBack()} color={Colors.secondary}/>
                    )}
                    text={"Sign Up"}
                    right={() =>(
                        <View/>
                    )}
                />


                <View style={styles.pictureContainer}>
                    <SelectPictures navToComponent={'CreateProfile'} pictureuris={pictureuris} />
                </View>

                <ScrollView style={styles.fieldsContainer} contentContainerStyle={styles.fieldsContentContainer}>


                {Metrics.platform == 'ios' ?
                    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} enabled={this.state.keyboardShown ? true : false}>
                          

                        {this.renderProfileInputFields(passwordConditionMet)}

                    
                    </KeyboardAvoidingView>
                :
                    <View>
                        

                        {this.renderProfileInputFields(passwordConditionMet)}

                    </View>
                }

                </ScrollView>

                <View style={styles.buttonContainer}>
                    <AuthButton
                        text={"Sign Up"}
                        disabled={isDone ? false : true}
                        extraStyles={{backgroundColor: isDone ? Colors.secondary : Colors.grey}}
                        onPress={() => this.setModalVisible(true)}
                        // onPress={}
                    />
                </View>

                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
                >
                <SafeAreaView style={styles.modal}>
                    
                    <Text style={styles.modalHeader}>End-User License Agreement for Treet: loyalty cards</Text>
                    <ScrollView contentContainerStyle={styles.licenseContainer}>
                        <Text style={styles.document}>{EulaTop}</Text>
                        <Text style={{color: Colors.number}} onPress={() => Linking.openURL(EulaLink)}>{EulaLink}</Text>
                        <Text style={styles.document}>{EulaBottom}</Text>
                    </ScrollView>
                    <View style={styles.documentOpenerContainer}>
                        <Text style={styles.documentOpener} onPress={() => {this.setState({modalVisible: false, termsModalVisible: true})}}>
                            Terms & Conditions
                        </Text>
                        <Text style={styles.documentOpener} onPress={() => {this.setState({modalVisible: false, privacyModalVisible: true})}}>
                            See Privacy Policy
                        </Text>
                    </View>
                    <View style={styles.decisionButtons}>
                        <TouchableOpacity
                            style={[styles.decisionButton, {backgroundColor: Colors.white}]}
                            onPress={() => {this.setModalVisible(false); }} 
                        >
                            <Text style={{...Fonts.style.normal, color: Colors.black}}>Reject</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.decisionButton, {backgroundColor: Colors.secondary}]}
                            onPress={() => {
                                googleUser ? 
                                this.createProfileForGoogleOrFacebookUser(user, pictureuris == "nothing here" ? "" : pictureuris[0], 'google') 
                                : 
                                    facebookUser ? 
                                        this.createProfileForGoogleOrFacebookUser(user, pictureuris[0], 'facebook') 
                                        : 
                                        this.createProfile(pictureuris) ;
                            }} 
                        >
                            <Text style={{...Fonts.style.normal, color: Colors.white}}>Accept</Text>
                        </TouchableOpacity>
                    </View>
        
                </SafeAreaView>
                </Modal>
                
                {this.renderTermsModal()}
                {this.renderPrivacyModal()}


            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    registerStatus: state.auth.registerStatus,
    // authErrorMessage: state.auth.authErrorMessage,
    newUser: state.auth.newUser,
    errorMessage: state.auth.errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (newUser) => dispatch(AuthActions.createUserRequest(newUser)),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Register)
