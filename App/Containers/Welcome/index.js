import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import Container from '../../Components/Container'

import firebase from 'react-native-firebase';
import AuthButton from '../../Components/Button/AuthButton';
import NavigationService from '../../Services/NavigationService';

import styles from './styles';
import Tutorial from '../Tutorial';
import { Colors, Fonts, Images, Strings, Helpers, Metrics } from '../../Theme';
import AuthInput from '../../Components/Input/AuthInput';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

 // '[DEFAULT]'


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
        firebase.auth().signInWithEmailAndPassword(email, pass)
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
        })
    }

    toggleSaveUsernamePass = () => {
        this.setState({saveUsernamePass: !this.state.saveUsernamePass}, () => {
            AsyncStorage.setItem('saveUsernamePass', this.state.saveUsernamePass ? "true" : "false");
        });
    }

    


    toggleNewUser = () => this.setState({newUser: !this.state.newUser})

    renderRememberHelper = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 15, marginHorizontal: 15}}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 5}}>
                <TouchableOpacity 
                onPress={this.toggleSaveUsernamePass} 
                style={{backgroundColor: this.state.saveUsernamePass ? 'red' : 'transparent',height: 25, width: 25, borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center'}}
                >

                </TouchableOpacity>
                    
                
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}}>
                <Text onPress={this.toggleSaveUsernamePass}>Remember Username & Password</Text>
            </View>
        </View>
    )

    renderTutorialOrWelcome = () => {
        
        return (
        this.state.newUser ?
            <Container style={{backgroundColor: Colors.primary}}>
                <View style={tutorialStyles.headerContainer}>
                    <Text style={tutorialStyles.headerText}>Tutorial</Text>
                </View>

                <View style={tutorialStyles.carouselContainer}>
                    <Text>carousel here</Text>
                </View>

                <View style={tutorialStyles.footerContainer}>
                    <TouchableOpacity style={tutorialStyles.skipButton} onPress={this.toggleNewUser}>
                        <Text style={{...Fonts.style.h2}}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        :
            <Container style={styles.container}>
            <ImageBackground source={Images.loginBg} style={styles.container}>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{Strings.companyName}</Text>
                </View>

                <View style={styles.bodyContainer}>

                    
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

                    {this.renderRememberHelper()}
                    
                    <View style={styles.forgotPassContainer}>
                        <Text style={styles.forgotPass}>Forgot Password?</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <AuthButton
                            text={"Login"}
                            onPress={this.signIn}  
                        />
                    </View>
                    
                </View>

                <View style={styles.footerContainer}>
                    <Text onPress={()=>NavigationService.navigate('Register')} style={[styles.footer, {color: Colors.white}]}>New User? <Text style={[styles.footerPurple, {color: Colors.secondary}]}>Sign Up</Text></Text>
                </View>
                
            </ImageBackground>
            </Container>
    )}

    render() {
        console.log(this.props.uid)
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

const tutorialStyles = StyleSheet.create({
    
    // TUTORIAL
    headerContainer: {
        flex: 0.15,
        ...Helpers.center
    },
        headerText: {
            ...Fonts.style.h1,
            color: Colors.secondary,
            letterSpacing: 1.7,
        },

    carouselContainer: {
        flex: 0.6,
        ...Helpers.center,
    },

    footerContainer: {
        flex: 0.25,
        ...Helpers.center,
    },

        skipButton: {
            paddingVertical: 3,
            width: Metrics.screenWidth/2.4,
            ...Helpers.center,
            ...Helpers.thinBorder,
            backgroundColor: '#fff'
        },
    
})
