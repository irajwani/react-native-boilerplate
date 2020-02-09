import React, { Component } from 'react'
import { Image, View, ScrollView, Text } from 'react-native'

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
import { Images, Helpers, Metrics } from '../../Theme';
import Loading from '../../Components/ActivityIndicator/Loading';
import HeaderNav from '../../Components/HeaderNav';

const {BackArrow, PasswordsMatch} = Images;

let avatarUri = "https://firebasestorage.googleapis.com/v0/b/spreezy-643e2.appspot.com/o/Placeholders%2Fblank.jpg?alt=media&token=bf2ab9de-bcf7-4138-9bba-0e4e47f1ff73";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            email: 'test@gmail.com',
            pass: 'password',
            pass2: 'password',

            firstName: 'Uzi',
            lastName: 'Lalani',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        // if (nextProps.registerStatus === true) {
        //     console.tron.log('Reg complete, going to app')
        //     NavigationService.navigate('AppStack')
        // }
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
        
        // console.tron.log("Initaite profile creation");
        // this.setState({isLoading: true})
        let {email, pass, firstName, lastName} = this.state;
        let {createUser} = this.props;
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(async () => {
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

    

    render() {
        let {isLoading} = this.state;
        let {navigation} = this.props;
        var pictureuris = navigation.getParam('pictureuris', "nothing here");
        var passwordConditionMet = (this.state.pass == this.state.pass2) && (this.state.pass.length > 0);
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
                        <BackArrow onPress={() => NavigationService.goBack()}/>
                    )}
                    text={"Sign Up"}
                    right={() =>(
                        <Text>right</Text>
                    )}
                />


                <View style={styles.pictureContainer}>
                    <SelectPictures navToComponent={'CreateProfile'} pictureuris={pictureuris} />
                </View>

                <ScrollView style={styles.fieldsContainer} contentContainerStyle={styles.fieldsContentContainer}>


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
                    
                    

                    <AuthInput
                        placeholder={'Email'}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        keyboardType={'email'}
                    />

                    <AuthInput
                        placeholder={'Password'}
                        value={this.state.pass}
                        onChangeText={pass => this.setState({pass})}
                        secureTextEntry
                    />

                    <View style={{
                        flexDirection: 'row', 
                        // borderWidth: this.state.pass && this.state.pass2 ? 0.5 : 0, borderColor: passwordConditionMet ? mantisGreen : flashOrange
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

                </ScrollView>

                <View style={styles.buttonContainer}>
                    <AuthButton
                        text={"Sign Up"}
                        onPress={() => this.createProfile(pictureuris)}
                    />
                </View>



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
