import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions from '../Stores/Auth/Actions'
import { authService } from '../Services/AuthService'
import NavigationService from '../Services/NavigationService'

export function* createUser(payload) {
  console.log('Sending new user data to server');
  const {newUser} = payload;
  console.log(newUser)
  const response = yield call(authService.createUser, newUser)
  console.log(response);
  console.log(JSON.stringify(response));
  if (response.status === 200) {
    console.log(JSON.stringify(response));
    yield put(AuthActions.createUserSuccess(response.data))
  } else {
    yield put(AuthActions.createUserFailure('S** happened'))
  }
  
}

// uid, username, fcmToken