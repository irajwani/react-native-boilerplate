import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'

import Container from '../../Components/Container'
import AuthInput from '../../Components/Input/AuthInput'
import AuthButton from '../../Components/Button/AuthButton';

import firebase from 'react-native-firebase';

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import SelectPictures from '../../Components/SelectPictures';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            name: '',
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
        return (
            <Container style={{marginHorizontal: 10}}>

            <View style={styles.headerContainer}>
                
            </View>

            <View style={styles.pictureContainer}>
                <SelectPictures navToComponent={'CreateProfile'} pictureuris={pictureuris} />
            </View>

            <ScrollView style={styles.fieldsContainer} contentContainerStyle={styles.fieldsContentContainer}>

                <AuthInput
                    placeholder={'Username'}
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                    
                />

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
