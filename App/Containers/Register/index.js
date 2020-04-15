import React, { Component } from 'react'
import { Image, View, ScrollView, TouchableOpacity, Text, Modal, Linking, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
import Toast from '../../Components/Toast';
let toastDuration = 4000;

const { EulaTop, EulaBottom, TsAndCs, PrivacyPolicy, EulaLink } = Strings;

const {BackArrow, PasswordsMatch} = Images;

let avatarUri = "https://firebasestorage.googleapis.com/v0/b/spreezy-643e2.appspot.com/o/Placeholders%2Fblank.jpg?alt=media&token=bf2ab9de-bcf7-4138-9bba-0e4e47f1ff73";
let numbers = /^[0-9]+$/;


class Register extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state; 
        this.state = {
            uploadingPicture: false,

            email: '',
            pass: '',
            pass2: '',

            firstName: params.name ? params.name.split(" ")[0] : '',
            lastName:  params.name ? params.name.split(" ")[1] : '',

            phone: "",

            modalVisible: false,
            termsModalVisible: false,
            privacyModalVisible: false,

            showToast: false,
            toast: "",

            isEditMode: params.isEditMode ? true : false,
            uid: params.uid ? params.uid : '',
            previousUri: params.uri ? params.uri : false,
        }
    }


    // UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    //     if (nextProps.registerStatus === true) {
    //         console.tron.log('Reg complete, going to app')
    //         NavigationService.navigate('AppStack')
    //     }
    // }

    

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    updateFirebase = async (uid, uri) => {
        let {email, firstName, lastName} = this.state;
        let {createUser} = this.props;
        
        let url = await this.promiseToUploadPhoto(uid, uri);

        let newUser = {
            uid,
            email,
            picture: url,
            name: firstName + " " + lastName, 
            phone,
            token
        };
        
        createUser(newUser);
        this.setState({uploadingPicture: false, modalVisible: false});
    }

    //Invoked when you 'Accept' EULA as a Google User trying to sign up
    createProfileForGoogleOrFacebookUser = async (user, pictureuri, socialPlatform) => {

        // console.log('Initiate FB or Google Sign Up')
        let {email, pass} = this.state;
        if(socialPlatform == "google") {
            const {idToken, accessToken} = user;
            const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            const socialUser = await firebase.auth().signInWithCredential(credential);
            
            const linkWithEmailCredential = await firebase.auth.EmailAuthProvider.credential(email, pass);
            // console.log(credential);
            firebase.auth().currentUser.linkAndRetrieveDataWithCredential(linkWithEmailCredential).then( (usercred) => {
                this.updateFirebase(socialUser.uid, pictureuri);
                // console.log(usercred);
                // console.log("Account linking success", usercred.user);
            }, function(error) {
                console.log("Account linking error", error);
            });   
        }
        else {
            const {accessToken} = user;
            const credential = await firebase.auth.FacebookAuthProvider.credential(accessToken);
            const socialUser = await firebase.auth().signInWithCredential(credential);
            
            const linkWithEmailCredential = await firebase.auth.EmailAuthProvider.credential(email, pass);
            // console.log(credential);
            firebase.auth().currentUser.linkAndRetrieveDataWithCredential(linkWithEmailCredential).then( (usercred) => {
                // console.log(usercred);
                this.updateFirebase(socialUser.uid, pictureuri);
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
                // console.log('user has chosen picture manually through photo lib or camera, store it on cloud and generate a URL for it.')
                // let resizedImage = await ImageResizer.createResizedImage(uri,resizedWidth, resizedHeight,'JPEG',suppressionLevel);
                // const uploadUri = Platform.OS === 'ios' ? resizedImage.uri.replace('file://', '') : resizedImage.uri
                const uploadUri = Metrics.platform == "ios" ? uri.replace('file://', '') : uri
                // let uploadBlob = null
                // const imageRef = 
                firebase.storage().ref().child(`Users/${uid}/profile`)
                .putFile(uploadUri, {contentType: mime})
                .then(uploadTask => {
                    // console.log(uploadTask)
                    resolve(uploadTask.downloadURL);
                })
                .catch((error) => {
                    reject(error)
                })
                
                
                
                
            }
    
    })
    }

    updateProfile = async (uri) => {
        this.setState({uploadingPicture: true, showToast: true, toast: `Updating user...`}, 
        () => setTimeout(() => {
            this.setState({showToast: false})
        }, toastDuration))
        console.log('updating profile')
        let {uid, firstName, lastName, phone, previousUri} = this.state;
        let {updateUser} = this.props;
        let url;
        if(uri != previousUri) {
            url = await this.promiseToUploadPhoto(uid, uri);
        }
        else {
            url = previousUri;
        }
        let data = {
            uid,
            picture: url,
            name: firstName + " " + lastName, 
            phone,
        }
        updateUser(data);
        this.setState({uploadingPicture: false});
    }

    createProfile = (uri) => {
        let {email, pass, firstName, lastName, phone} = this.state;
        //Person could arrive here through vanilla sign up, or after using social authentication such that they don't require further account creation
        // console.log("Initaite profile creation");
        this.setState({uploadingPicture: true, showToast: true, toast: `Creating user: ${firstName + " " + lastName}. Please wait...`}, () => {
            setTimeout(() => {
                this.setState({showToast: false})
            }, toastDuration)}
        )
        let {createUser} = this.props;
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(async () => {
            // console.log('created new firebase certified user');
            let uid = firebase.auth().currentUser.uid;
            let url = await this.promiseToUploadPhoto(uid, uri);
            return {uid, url}
        })
        .then(async ({uid, url}) => {
            let token = await AsyncStorage.getItem('fcmToken');
            let newUser = {
                uid,
                email,
                picture: url,
                name: firstName + " " + lastName, 
                phone,
                token
                // token: "dJUd9hBupPI:APA91bHq7vv-mlMWvsplrlBFq8RI6mstf0ub8Ws6H-EYffd5M2zkP2Stg78Lk3WdzxkjmVfGUwoNm0DJmHivmgG84fqD7es3Fj8wuUisSQHLCe6yclsuITUDzRfnjuU1_j5HPdTdJ7yY",
            }
            console.log(newUser);
            createUser(newUser);
            this.setState({uploadingPicture: false, modalVisible: false});
        })
        .catch( error => {
            // console.log(error)
            this.setState({uploadingPicture: false});
            
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // if (errorCode == 'auth/weak-password') {
            //   alert('The password is too weak.');
            alert(errorMessage);
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

            {!this.state.isEditMode && this.renderAuthInputFields(passwordConditionMet)}

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
        let {uploadingPicture, isEditMode, showToast} = this.state;
        let {navigation, isLoading} = this.props;

        const {params} = navigation.state
        var googleUser = params.googleUserBoolean ? true : false;
        var facebookUser = params.facebookUserBoolean ? true : false;
        //may be reusing booleans here, but this check on isUserGoogleUser? alright logically so far
        var user = params.googleUserBoolean || params.facebookUserBoolean ? params.user : null;

        var pictureuris = navigation.getParam('pictureuris', "nothing here");
        (this.state.previousUri && pictureuris == "nothing here") ? pictureuris = this.state.previousUri : null;
        var passwordConditionMet = (this.state.pass == this.state.pass2) && (this.state.pass.length > 0);
        var isDone = this.state.firstName && this.state.lastName && this.state.email && passwordConditionMet;
        var isEditDone = this.state.firstName && this.state.lastName;
        if(isLoading || uploadingPicture) {
            return (
                <Container center>
                    <Loading/>
                    {showToast && <Toast text={this.state.toast}/>}
                </Container>
            )
        }

        
        return (
            <Container style={{marginHorizontal: 10}}>

                <HeaderNav
                    left={() => (
                        <BackArrow onPress={() => NavigationService.goBack()} color={Colors.secondary}/>
                    )}
                    text={isEditMode ? "Edit Profile" : "Sign Up"}
                    right={() =>(
                        <View/>
                    )}
                />


                <View style={styles.pictureContainer}>
                    <SelectPictures navToComponent={'CreateProfile'} pictureuris={pictureuris} />
                </View>

                <KeyboardAwareScrollView style={styles.fieldsContainer} contentContainerStyle={styles.fieldsContentContainer}>


                    {this.renderProfileInputFields(passwordConditionMet)}


                </KeyboardAwareScrollView>

                <View style={styles.buttonContainer}>
                    {isEditMode ? 
                        <AuthButton
                        text={"Update"}
                        disabled={isEditDone ? false : true}
                        extraStyles={{backgroundColor: isEditDone ? Colors.secondary : Colors.grey}}
                        onPress={() => this.updateProfile(pictureuris)}
                        
                        />
                    :    
                        <AuthButton
                        text={"Sign Up"}
                        disabled={isDone ? false : true}
                        extraStyles={{backgroundColor: isDone ? Colors.secondary : Colors.grey}}
                        onPress={() => this.setModalVisible(true)}
                        
                        />  
                    }
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
                                // this.createProfileForGoogleOrFacebookUser(user, pictureuris == "nothing here" ? "" : pictureuris[0], 'google') 
                                this.createProfileForGoogleOrFacebookUser(user, pictureuris, 'google') 
                                : 
                                    facebookUser ? 
                                        this.createProfileForGoogleOrFacebookUser(user, pictureuris, 'facebook') 
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
                {showToast && <Toast text={this.state.toast}/>}

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    registerStatus: state.auth.registerStatus,
    // authErrorMessage: state.auth.authErrorMessage,
    newUser: state.auth.newUser,
    errorMessage: state.auth.errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (newUser) => dispatch(AuthActions.createUserRequest(newUser)),
    updateUser: (data) => dispatch(AuthActions.updateUserRequest(data)),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Register)