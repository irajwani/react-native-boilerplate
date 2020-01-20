import React from 'react'
import { Text, SafeAreaView, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import NavigationService from '../../Services/NavigationService'


import firebase from 'react-native-firebase';
// import StartupActions from 'App/Stores/Startup/Actions'
import { connect } from 'react-redux'

import styles from './styles'
import { Metrics } from '../../Theme';

let companyName = "Wafadaar"
const splashScreenDuration = 2000
// FIRST CONTAINER REACT COMPONENT THAT MOUNTS
class SplashScreen extends React.Component {

    componentDidMount = async () => {
      Metrics.platform == 'android' ? this.createChannel() : null;
      this.checkPermission();
      this.createNotificationListeners();
      setTimeout(() => {
        this.showAppOrAuth();
        
      }, splashScreenDuration);
        
    }

    createChannel() {
      const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
      firebase.notifications().android.createChannel(channel);
    }

    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log(fcmToken);
      if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            
              await AsyncStorage.setItem('fcmToken', fcmToken);
          }
        }
    }
    
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    
    async createNotificationListeners() {
        firebase.notifications().onNotification(notification => {
            //spruce up notification styles
            notification.android.setChannelId('insider').setSound('default')
            firebase.notifications().displayNotification(notification)
        });
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
              let newUser = await AsyncStorage.getItem('newUser');
              if(newUser == 'false') {
                NavigationService.navigate('AuthStack', {newUser: false});
              }
              else {
                AsyncStorage.setItem('newUser', 'false', () => {
                  //since this person is a new user, show them tutorials screen,
                  //and also set newUser to false so they don't see tutorial in future
                  NavigationService.navigate('AuthStack', {newUser: true});
                });
              }
              
              
              
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

    render() {
        return (
          <SafeAreaView style={styles.container}>
            {/* <Image source={Images.logo} style={{ height: 100, width: 300 }} /> */}
            <Text style={styles.companyName}>{companyName}</Text>
          </SafeAreaView>
        )
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


//OLDER (possibly faulty/possibly better than current) METHOD:

// async componentDidMount() {
  //   this.checkPermission();
  //   this.createNotificationChannel();
  //   this.createNotificationListeners();
  // }

  // createNotificationChannel = async () => {
  //   const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  //     .setDescription('My apps test channel');

  //     // Create the channel
  //   await firebase.notifications().android.createChannel(channel);
  // }

  // createNotificationListeners = async () => {

  //   this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
  //     // Process your notification as required
  //     //iOS Only
  //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  //     // this.setState({notification: "rNDL"})
  //     console.log('Notification: ', notification)
  //   });

  //   this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
  //     // this.setState({notification: "rNL"})
  //     // console.log("Standard Notification + Optional Data Notification");
  //     console.log('Notification: ', notification)
  //   });

  //   /*
  //   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //   * */
  //   this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //       const { title, body } = notificationOpen.notification;
  //       // this.setState({notification: "rNOL"})
  //       console.log(title, body);
  //       // this.showAlert(title, body);
  //   });

  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //       const { title, body } = notificationOpen.notification;
  //       // console.log("App was closed and user interacted with it through notif.");
  //       console.log(title, body);
  //       // this.showAlert(title, body);
  //   }

  //   this.messageListener = firebase.messaging().onMessage((message) => {
  //     //process data message
  //     console.log(JSON.stringify(message));
  //   });




  // }

  // async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //       this.getToken();
  //   } else {
  //       this.requestPermission();
  //   }
  // }

  //   //3
  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   console.log(fcmToken);
  //   if (!fcmToken) {
  //       fcmToken = await firebase.messaging().getToken();
  //       if (fcmToken) {
  //           // user has a device token
  //           await AsyncStorage.setItem('fcmToken', fcmToken);
  //       }
  //   }
  // }

  //   //2
  // async requestPermission() {
  //   try {
  //       await firebase.messaging().requestPermission();
  //       // User has authorised
  //       this.getToken();
  //   } catch (error) {
  //       // User has rejected permissions
  //       console.log('permission rejected');
  //   }
  // }

  // componentWillUnmount() {
  //   this.removeNotificationDisplayedListener();
  //   this.removeNotificationOpenedListener();
  //   this.removeNotificationListener();
  // }