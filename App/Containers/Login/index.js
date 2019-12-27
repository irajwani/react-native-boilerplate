import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from '../../Components/Container'
import AuthInput from '../../Components/Input/AuthInput'
import AuthButton from '../../Components/Button/AuthButton';
import firebase from 'react-native-firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }

    signIn = () => {
        let {email, pass} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(() => {
            firebase.auth().onAuthStateChanged( (user) => {
                if(user) {
                    console.log(user);
                }
            })
            
        })
        .catch(err => {
            console.log('failed because' + err);
        })
    }

    render() {
        return (
            <Container>

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
                    secureTextEntry
                />

                <AuthButton
                    text={"Login"}
                    onPress={this.createProfile}
                />

                


            </Container>
        )
    }
}

