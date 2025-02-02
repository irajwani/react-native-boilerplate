import { put, call, fork } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions from '../Stores/Auth/Actions'
import RewardActions from '../Stores/Reward/Actions'
import { authService } from '../Services/AuthService'
import NavigationService from '../Services/NavigationService'

export function* createUser(payload) {
  // console.log('Sending new user data to server');
  const {newUser} = payload;
  // console.log(newUser);
  const response = yield call(authService.createUser, newUser);
  console.log(response);
  if (response.status === 200) {
    // console.log("Server has created user with data:")
    // console.log(JSON.stringify(response.data));
    let {data} = response.data;
    yield call(AuthActions.storeUid, data.uid);
    yield put(AuthActions.getProfileSuccess(data));
    yield call(RewardActions.getRewardsRequest, data.uid);
    yield put(AuthActions.createUserSuccess());
    yield call(NavigationService.navigate, 'AppStack');
  } else {
    yield put(AuthActions.createUserFailure('S** happened'));
  }
  
}

export function* getProfile(payload) {
  // console.log(JSON.stringify(payload))
  // console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(authService.getProfile, payload)
  // console.log(response);
  if (response.status === 200) {
    // console.log(response.data);
    yield put(AuthActions.getProfileSuccess(response.data))
  } else {
    yield put(AuthActions.getProfileFailure('S** happened'))
  }
}

export function* updateUser(payload) {
  // console.log('updating user');
  const {data} = payload;
  // console.log(data);
  const response = yield call(authService.updateUser, data);
  // console.log(response);
  if (response.status === 200) {
    
    yield put(AuthActions.getProfileSuccess(response.data.data));
    yield put(AuthActions.updateUserSuccess());
    yield call(NavigationService.navigate, 'Wallet');
    
  } else {
    yield put(AuthActions.updateUserFailure('S** happened'));
  }
  
}

// uid, username, fcmToken