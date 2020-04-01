import { put, call, fork } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions from '../Stores/Auth/Actions'
import { authService } from '../Services/AuthService'
import NavigationService from '../Services/NavigationService'

export function* createUser(payload) {
  console.log('Sending new user data to server');
  const {newUser} = payload;
  console.log(newUser);
  const response = yield call(authService.createUser, newUser);
  if (response.status === 200) {
    console.log("Server has created user with data:")
    console.log(JSON.stringify(response.data));
    let {data} = response.data;
    yield call(AuthActions.storeUid, data.uid);
    yield put(AuthActions.getProfileSuccess(data));
    yield put(AuthActions.createUserSuccess());
    yield call(NavigationService.navigate, 'AppStack');
  } else {
    yield put(AuthActions.createUserFailure('S** happened'));
  }
  
}

export function* getProfile(payload) {
  // console.log(JSON.stringify(payload))
  console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(authService.getProfile, payload)
  console.log(JSON.stringify(response));
  if (response.status === 200) {
    yield put(AuthActions.getProfileSuccess(response.data))
  } else {
    yield put(AuthActions.getProfileFailure('S** happened'))
  }
}

// uid, username, fcmToken