import React from 'react'
import { Text, SafeAreaView, Image, AsyncStorage } from 'react-native'

// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import NavigationService from '../../Services/NavigationService'


import firebase from 'react-native-firebase';
// import StartupActions from 'App/Stores/Startup/Actions'
import { connect } from 'react-redux'

import styles from './styles'


const splashScreenDuration = 1500

class SplashScreen extends React.Component {

    componentDidMount = () => {
      setTimeout(() => {
        // this.showAppOrAuth();
        NavigationService.navigate('AppStack');
      }, splashScreenDuration);
        
    }

    showAppOrAuth = () => {

        // firebase.auth().get
        // var unsubscribe = 
        firebase.auth().onAuthStateChanged( async ( user ) => {
            // unsubscribe();
            // If you want to get back to basic, re-enable this:
            // this.props.navigation.navigate(user ? 'AppStack' : 'AuthStack');
            
            //If you want to re-enable presence checker in future
            if(user) {
              console.log("USER IS: " + user);
              
              // await this.updateAppUse();
              NavigationService.navigate('AppStack');
            }
            else {
              console.log("USER DISCONNECTED")
              
              NavigationService.navigate('AuthStack');
            }
    
            
        })
      }

//   componentWillMount() {

//     AsyncStorage.removeItem('token')
//     setTimeout(async () => {
//       let token = await AsyncStorage.getItem('token')
//       if (token) {
//         // console.tron.log(`User may skip auth process ${token}`)
//         NavigationService.navigate('DrawerNavigator')
//       } else {
//         NavigationService.navigateAndReset('AuthStack')
//       }
//     }, splashScreenDuration)
//   }

    renderSplashScreen = () => (
        <SafeAreaView style={styles.container}>
          {/* <Image source={Images.logo} style={{ height: 100, width: 300 }} /> */}
          <Text style={{ marginTop: 100, fontSize: 20, color: '#fff' }}>
            Some consumerist quote
          </Text>
        </SafeAreaView>
    )

    render() {
        return this.renderSplashScreen()
    }


  
}

export default SplashScreen

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup()),
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SplashScreen)
