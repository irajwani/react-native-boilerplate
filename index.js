/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App/App';
import Test from './Tests';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Test);
