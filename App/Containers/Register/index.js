import React, { Component } from 'react'
import { Image, View, ScrollView } from 'react-native'

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
import { Images, Helpers } from '../../Theme';

const {BackArrow, PasswordsMatch} = Images;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            pass2: '',

            firstName: '',
            lastName: '',
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.registerStatus) {
            NavigationService.navigate('AppStack')
        }
    }

    createProfile = async () => {
        let {email, pass, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(async () => {
            console.log('done');
            let token = await AsyncStorage.getItem('fcmToken');
            let newUser = {
                email,
                username: name, 
                token: "dJUd9hBupPI:APA91bHq7vv-mlMWvsplrlBFq8RI6mstf0ub8Ws6H-EYffd5M2zkP2Stg78Lk3WdzxkjmVfGUwoNm0DJmHivmgG84fqD7es3Fj8wuUisSQHLCe6yclsuITUDzRfnjuU1_j5HPdTdJ7yY",
            }
            this.props.createUser(newUser);
            
        })
        .catch(err => {
            console.log('failed because' + err);
        })
    }

    render() {
        let {navigation} = this.props;
        var pictureuris = navigation.getParam('pictureuris', "nothing here");
        var passwordConditionMet = (this.state.pass == this.state.pass2) && (this.state.pass.length > 0);

        console.log(pictureuris);
        return (
            <Container style={{marginHorizontal: 10}}>

            <View style={styles.headerContainer}>
                <BackArrow onPress={() => NavigationService.goBack()}/>
            </View>

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
                    onPress={this.createProfile}
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
