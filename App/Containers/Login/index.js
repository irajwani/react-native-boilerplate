import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Container from '../../Components/Container'
import AuthInput from '../../Components/Input/AuthInput'
import AuthButton from '../../Components/Button/AuthButton';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../Services/NavigationService';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            saveUsernamePass: true,
        }
    }

    async componentWillMount () {
       
        await AsyncStorage.getItem('saveUsernamePass')
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
                    onPress={this.signIn}
                />

                {this.renderRememberHelper()}

                


            </Container>
        )
    }
}

