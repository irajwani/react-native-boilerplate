import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Container from '../../Components/Container'
import AuthInput from '../../Components/Input/AuthInput'
import AuthButton from '../../Components/Button/AuthButton';

import firebase from 'react-native-firebase';

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'

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
        .then(() => {
            console.log('done');
            // let token = await AsyncStorage
            // this.props.createUser(email, name, token);
            
        })
        .catch(err => {
            console.log('failed because' + err);
        })
    }

    render() {
        return (
            <Container>
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

                <AuthButton
                    text={"Sign Up"}
                    onPress={this.createProfile}
                />



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
