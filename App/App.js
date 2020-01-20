import React, { Component } from "react";
import { Provider } from "react-redux";
import "./Config/ReactotronConfig";
import { PersistGate } from "redux-persist/lib/integration/react";
import createStore from "./Stores";
import RootScreen from "./Containers/Root";

const { store, persistor } = createStore();

export default class App extends Component {
  render() {
    console.disableYellowBox = true
    return (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootScreen/>
            </PersistGate>
          </Provider>
        );
  }
}

// export default class App extends Component {
//   render() {
//     return (
//       <View style={{backgroundColor: 'red', flex: 1}}>

//       </View>
//     )
//   }
// }

// npm install apisauce react-native-reanimated react-native-gesture-handler react-navigation react-navigation-stack react-navigation-drawer react-redux redux redux-persist redux-saga reduxsauce

// /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/Contents/MacOS/Simulator -CurrentDeviceUDID D9974757-E6A8-419C-A47B-08A83A16FFE4

// New project requirements:
// iOS bundle identifier
// strings.xml
// Config
// Google file for iOS and Android

