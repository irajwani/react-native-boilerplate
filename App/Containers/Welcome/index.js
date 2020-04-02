import React, { Component } from 'react'
import { Text, Image, View, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, CheckBox } from 'react-native'

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import Container from '../../Components/Container'
import TutorialList from '../../Components/List/TutorialList';

import firebase from 'react-native-firebase';
import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

import AuthButton from '../../Components/Button/AuthButton';
import NavigationService from '../../Services/NavigationService';

import shadowStyles from '../../StyleSheets/shadowStyles';
import styles from './styles';
// import Tutorial from '../Tutorial';
import { Colors, Fonts, Images, Strings, Helpers, Metrics } from '../../Theme';
import AuthInput from '../../Components/Input/AuthInput';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Loading from '../../Components/ActivityIndicator/Loading';



let {Check, Facebook} = Images;

 // '[DEFAULT]'

 let Tutorial = [
     {
         image: Images.gift, 
         text: {header: "Earn Rewards", text: "Cash in your rewards at select outlets to win freebies"}
    },
     {
         image: Images.stamp, 
         text: {header: "Collect Stamps", text: "Collect stamps every time you visit an outlet with your loyalty card. Earn enough and get access to exclusive rewards"}
    },
     {
         image: Images.loyaltyProgram, 
         text: {header: "Add Cards", text: "Pick from a variety of loyalty cards. Add to your wallet to avail exclusive discounts and rewards upon visit."}
    },
 ]

let forgotPasswordText = "Please enter the email you created an account with. Follow the instructions sent to your email to reset your password for Treet. Then log in with your new credentials.";

export class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newUser: true,
            isLoading: false,
            email: '',
            pass: '',

            saveUsernamePass: true,

            isAlertVisible: false,
            error: '',

            isFpVisible: false,
        }
        // console.log(props.navigation.state.params.newUser)
        // this.newUser = props.navigation.state.params.newUser;
    }

    async componentWillMount () {
       
        let newUser = await AsyncStorage.getItem('newUser');
        AsyncStorage.getItem('saveUsernamePass')
        .then( (data) => {
            // console.log(data);
            this.setState({saveUsernamePass: data == "true" ? true : false}, () => {
                if(this.state.saveUsernamePass) {
                    AsyncStorage.multiGet(['previousEmail', 'previousPassword'] ).then((data)=> {
                        this.setState({email: data[0][1] ? data[0][1] : '', pass: data[1][1] ? data[1][1] : '', }) 
                    })
                }
                
            })
        })
        .then( () => {
            if(newUser == 'false') {
                this.setState({newUser: false})
            }
            else {
                AsyncStorage.setItem('newUser', 'false', () => {
                    //since this person is a new user, show them tutorials screen,
                    //and also set newUser to false so they don't see tutorial in future
                    this.setState({newUser: true})
                });
            }
            
        })
        .catch( () => {
            console.log("Error Retrieving Data")
        })

        
        
    }

    attemptSignUp = (socialUser, googleUserBoolean, facebookUserBoolean) => {
        //check if user wishes to sign up through standard process (the former) or through google or through facebook so 3 cases
        //
        // console.log('attempting to sign up', socialUser);
        !socialUser ? 
            NavigationService.navigate('Register', {user: false, googleUserBoolean: false, facebookUserBoolean: false})
        :
            googleUserBoolean && !facebookUserBoolean ? 
                NavigationService.navigate('Register', {user: socialUser, googleUserBoolean: true, facebookUserBoolean: false, pictureuris: [socialUser.user.photo]})
            :
                NavigationService.navigate('Register', {user: socialUser, googleUserBoolean: false, facebookUserBoolean: true, pictureuris: [socialUser.user.picture.data.url]})
                //this.props.navigation.navigate('CreateProfile', {user, googleUserBoolean, pictureuris: [user.photoURL],})
    }

    signIn = () => {
        let {email, pass} = this.state;
        this.setState({isLoading: true})
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(()=>{
            this.setState({isLoading: false})
        })
        .then(() => {
            
            firebase.auth().onAuthStateChanged( (user) => {
                
                if(user) {
                    this.state.saveUsernamePass ? AsyncStorage.multiSet([ ['previousEmail', email], ['previousPassword', pass] ]) : null;
                    NavigationService.navigate('AppStack')
                }
            })
            
        })
        .catch(err => {
            console.log('failed because' + err);
            this.setState({isLoading: false, error: err, isAlertVisible: true});
        })
    }

    signInWithFacebook = () => {
        this.setState({isLoading: true});

        //Neat Trick: Define two functions (one for success, one for error), with a thenable based on the object returned from the Promise.
        LoginManager.logOut();
        LoginManager.logInWithPermissions(['email']).then(
            (result) => {
              
              if (result.isCancelled) {
                this.setState({isLoading: false});
              } 
              else {
                
                AccessToken.getCurrentAccessToken().then( (token) => {
                    // console.log(data)
                    const infoRequest = new GraphRequest(
                        '/me?fields=name,picture,email',
                        null,
                        async (error, result) => {
                            if(error) {
                                alert('Error fetching data: ' + error.toString());
                            }
                            else {
                                // console.log("GraphRequest was successful", result.picture.data.url);
                                let {data} = await isUserRegistered(result.email);
                                if(data.isRegistered) {
                                    this.setState({isLoading: false}, () => {this.props.navigation.navigate('AppStack')});
                                }
                                else {
                                    let socialInformation = {
                                        accessToken: token.accessToken,
                                        user: result
                                    }
                                    // alert('here')
                                    this.setState({isLoading: false}, () => {this.attemptSignUp(socialInformation, false, true)})
                                }
                            }
                        }
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();


                    // console.log("access token retrieved: " + data + data.accessToken);
                    //Credential below throws an error if the associated email address already has an account within firebase auth

                    // var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    // console.log("the credential is:" + credential)
                    // return firebase.auth().signInWithCredential(credential);

                    

                } )
                
                // .then( (currentUser) => {
                //     console.log("Firebase User Is:" + currentUser);
                //     this.successfulLoginCallback(currentUser, googleUserBoolean = false, facebookUserBoolean = true);
                // })
                // .catch( err => {
                //     alert("The login failed because: " + err);
                //     this.setState({loading: false});
                // })


                // .catch( (err) => alert('Login failed with error: ' + err))
                // alert('Login was successful with permissions: '
                //   + result.grantedPermissions.toString());
              }
            },
            (error) => {
              alert('Login failed because: ' + error);
            }
          );
    }

    toggleSaveUsernamePass = () => {
        this.setState({saveUsernamePass: !this.state.saveUsernamePass}, () => {
            AsyncStorage.setItem('saveUsernamePass', this.state.saveUsernamePass ? "true" : "false");
        });
    }

    


    toggleNewUser = () => {
        this.setState({newUser: !this.state.newUser})
    }

    toggleForgotPassword = () => this.setState({isFpVisible: !this.state.isFpVisible})

    toggleAlert = () => this.setState({isAlertVisible: !this.state.isAlertVisible})

    renderForgotPassword = () => ( 
        <Modal
          rounded={true}
          modalStyle={{...shadowStyles.blackShadow, margin: Metrics.baseMargin }}
          modalTitle={<ModalTitle hasTitleBar={true} title="Forgot Password?" titleTextStyle={{...Fonts.style.big}}/>}
          visible={this.state.isFpVisible}
          onTouchOutside={this.toggleForgotPassword}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={this.toggleForgotPassword}
          footer={
          <ModalFooter bordered={false}>
            <ModalButton
              text="Close"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.toggleForgotPassword}
            />
          </ModalFooter>
          }
        >
          <ModalContent>

            <Text style={styles.forgotPassword}>{forgotPasswordText}</Text>

            <AuthInput 
                placeholder={'Email'}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                keyboardType={'email-address'}
            />
        
            <AuthButton 
            onPress={()=> {
                firebase.auth().sendPasswordResetEmail(this.state.email)
                .then( async () => {
                    await this.toggleForgotPassword
                    alert('Password Reset Email successfully sent! Please check your inbox for instructions on how to reset your password');
                })
                .catch( () => {
                    alert('Please input a valid email address');
                })
            }}
            text={"Send"}
            extraStyles={{alignSelf: "center"}}
            />

            </ModalContent>
        </Modal>
            
    )
    

    renderAlert = () => {
        let {error} = this.state;
        
        return (
        <Modal
          rounded={false}
          modalStyle={{...shadowStyles.blackShadow, }}
        //   modalTitle={<ModalTitle hasTitleBar={false} title="Error!" titleTextStyle={{...Fonts.style.big, color: Colors.primary, fontWeight: "600"}}/>}
          visible={this.state.isAlertVisible}
          onTouchOutside={this.toggleAlert}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={this.toggleAlert}
          footer={
          <ModalFooter bordered={false}>
            <ModalButton
              text="Okay"
              textStyle={{...Fonts.style.medium,color: Colors.primary}}
              onPress={this.toggleAlert}
            />
          </ModalFooter>
          }
        >
          <ModalContent>
                <Text style={styles.modalTitle}>Error!</Text>
                <Text style={styles.modalText}>{error.message}</Text>
          </ModalContent>
        </Modal>
        )
    }

    renderRememberHelper = () => (
        
        <View style={styles.authActionsContainer}>
            <View style={styles.rememberMeContainer}>
                <TouchableOpacity onPress={this.toggleSaveUsernamePass} style={{height: 25, width: 25, borderWidth: 2, borderRadius: 10, borderColor: Colors.black, justifyContent: 'center', alignItems: 'center', marginRight: 5,}}>
                    {this.state.saveUsernamePass ?
                        <Check/>
                    :
                        null
                    }
                </TouchableOpacity>
                <Text onPress={this.toggleSaveUsernamePass} style={{...Fonts.style.small, color: Colors.black}}>Remember Me</Text>
            </View>
            
            <TouchableOpacity 
            onPress={this.toggleForgotPassword}
            style={styles.forgotPasswordContainer}>
                <Text style={{...Fonts.style.small, color: Colors.tertiary, fontWeight: "400"}}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>

        
    )

    renderWelcome = () => (
        <Container style={styles.container}>
            <ImageBackground source={Images.loginBg} style={styles.container}>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{Strings.companyName}</Text>
                </View>

                <View style={styles.bodyContainer}>

                    

                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={Images.logo}/>
                    </View>
                    
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

                    {this.renderRememberHelper()}
                    
                    

                    {this.state.isLoading ? 
                    <Loading />
                    :
                    <>
                    <View style={styles.buttonContainer}>
                        <AuthButton
                            text={"Login"}
                            onPress={this.signIn}  
                        />
                    </View>

                    <View style={{marginTop: 15}}>
                        <View style={{...Helpers.center, paddingVertical: 5,}}>
                            <Text style={{...Fonts.style.small, fontWeight: "bold", color: Colors.primary}}>Or login with</Text>
                        </View>
                        <View style={{...Helpers.center, flexDirection: 'row', padding: 0, }}>
                            <Facebook onPress={() => this.signInWithFacebook()}/>
                        </View>
                    </View>
                    </>
                    }
                    
                </View>

                <View style={styles.footerContainer}>
                    <Text onPress={()=>{this.attemptSignUp(user = false, googleUserBoolean = false, facebookUserBoolean = false)}} style={[styles.footer, {color: Colors.white}]}>Sign</Text>
                    <Text onPress={()=>{this.attemptSignUp(user = false, googleUserBoolean = false, facebookUserBoolean = false)}} style={[styles.footer, {color: Colors.primary}]}>Up</Text>
                </View>
                
            </ImageBackground>

            {this.renderAlert()}
            {this.renderForgotPassword()}
        </Container>
    )

    renderTutorialOrWelcome = () => {
        
        return (
            this.state.newUser ?
            <TutorialList data={Tutorial} handleSkip={this.toggleNewUser} />
            : 
            this.renderWelcome()
    )}

    render() {
        return (
            this.renderTutorialOrWelcome()
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    // logIn: () => dispatch(AuthActions.logIn()),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Welcome)

// {/* <Text style={{...Fonts.style.big, fontWeight: "500", textAlign: 'center'}}>Salaam</Text>
//                     <Text style={{...Fonts.style.small, textAlign: 'center', color: Colors.grey, marginBottom: 20}}>Please login to your account.</Text> */}