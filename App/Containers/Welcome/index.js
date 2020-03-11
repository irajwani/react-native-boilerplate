import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, CheckBox } from 'react-native'

import Container from '../../Components/Container'
import TutorialList from '../../Components/List/TutorialList';
import firebase from 'react-native-firebase';
import AuthButton from '../../Components/Button/AuthButton';
import NavigationService from '../../Services/NavigationService';

import styles from './styles';
// import Tutorial from '../Tutorial';
import { Colors, Fonts, Images, Strings, Helpers, Metrics } from '../../Theme';
import AuthInput from '../../Components/Input/AuthInput';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';;

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


export class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newUser: true,

            email: '',
            pass: '',

            saveUsernamePass: true,
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

    signIn = () => {
        let {email, pass} = this.state;
        console.log(email)
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(() => {
            console.log('signed in')
            firebase.auth().onAuthStateChanged( (user) => {
                console.log(user);
                if(user) {
                    this.state.saveUsernamePass ? AsyncStorage.multiSet([ ['previousEmail', email], ['previousPassword', pass] ]) : null;
                    NavigationService.navigate('AppStack')
                }
            })
            
        })
        .catch(err => {
            console.log('failed because' + err);
        })
    }

    toggleSaveUsernamePass = () => {
        this.setState({saveUsernamePass: !this.state.saveUsernamePass}, () => {
            AsyncStorage.setItem('saveUsernamePass', this.state.saveUsernamePass ? "true" : "false");
        });
    }

    


    toggleNewUser = () => {
        this.setState({newUser: !this.state.newUser})
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
            onPress={this.toggleShowPasswordReset}
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

                    <Text style={{...Fonts.style.big, fontWeight: "500", textAlign: 'center'}}>Salaam</Text>
                    <Text style={{...Fonts.style.small, textAlign: 'center', color: Colors.grey, marginBottom: 20}}>Please login to your account.</Text>
                    
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
                            <Facebook />
                        </View>
                    </View>
                    
                </View>

                <View style={styles.footerContainer}>
                    <Text onPress={()=>NavigationService.navigate('Register')} style={[styles.footer, {color: Colors.primary}]}>Sign Up</Text>
                </View>
                
            </ImageBackground>
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
