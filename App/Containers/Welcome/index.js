import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import Container from '../../Components/Container'

import firebase from 'react-native-firebase';
import AuthButton from '../../Components/Button/AuthButton';
import NavigationService from '../../Services/NavigationService';

 // '[DEFAULT]'


export class Welcome extends Component {

    render() {
        // alert((firebase.auth().sign));
        return (
            <Container>
                
                

                <AuthButton
                text={"Login"}
                onPress={()=>NavigationService.navigate('Login')}  
                />

                <AuthButton
                text={"Sign Up"}
                onPress={()=>NavigationService.navigate('Register')}  
                />

            </Container>
        )
    }
}

export default Welcome
