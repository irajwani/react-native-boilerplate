import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions from '../Stores/Auth/Actions'
import { authService } from '../Services/AuthService'
import NavigationService from '../Services/NavigationService'

export function* createUser(...newUser) {
  const response = yield call(authService.createUser, ...newUser)
  if (response.status === 200) {
    yield put(AuthActions.createUserSuccess(response.data))
  } else {
    yield put(AuthActions.createUserFailure('S** happened'))
  }
  
}

// uid, username, fcmToken