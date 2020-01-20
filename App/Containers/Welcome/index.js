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

 // '[DEFAULT]'


export class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newUser: true,

            email: '',
            pass: '',
        }
        // console.log(props.navigation.state.params.newUser)
        // this.newUser = props.navigation.state.params.newUser;
    }

    toggleNewUser = () => this.setState({newUser: !this.state.newUser})

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
                        placeholder={'Pass'}
                        value={this.state.pass}
                        onChangeText={pass => this.setState({pass})}
                        keyboardType={'email'}
                        secureTextEntry
                    />
                    
                    <View style={styles.forgotPassContainer}>
                        <Text style={styles.forgotPass}>Forgot Password?</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <AuthButton
                            text={"Login"}
                            onPress={()=>NavigationService.navigate('Login')}  
                        />
                    </View>
                    
                </View>

                <View style={styles.footerContainer}>
                    <Text onPress={()=>NavigationService.navigate('Register')} style={[styles.footer, {color: Colors.white}]}>New User? <Text style={[styles.footerPurple, {color: Colors.secondary}]}>Sign Up</Text></Text>
                </View>
                {/* <AuthButton
                text={"Login"}
                onPress={()=>NavigationService.navigate('Login')}  
                />

                <AuthButton
                text={"Sign Up"}
                onPress={()=>NavigationService.navigate('Register')}  
                /> */}
            </ImageBackground>
            </Container>
    )}

    render() {
        // alert((firebase.auth().sign));
        return (
            this.renderTutorialOrWelcome()
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    logIn: () => dispatch(AuthActions.logIn()),
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
