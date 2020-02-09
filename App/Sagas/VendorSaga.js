import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import VendorActions from '../Stores/Vendor/Actions'
import { vendorService } from '../Services/VendorService'
import NavigationService from '../Services/NavigationService'

export function* getVendors() {
  //hits the vendor-cards collection in firestore
  const response = yield call(vendorService.getVendors)
  // console.tron.log(response.data);
  if (response.status === 200) {
    
    yield put(VendorActions.getVendorsSuccess(response.data))
  } else {
    yield put(VendorActions.getVendorsFailure('S** happened'))
  }
  
}

export function* addCard(payload) {
  // let {uid, vendorUid} = payload;
  // console.tron.log(payload)
  const response = yield call(vendorService.addCard, payload)
  // console.tron.log(response.data);
  if (response.status === 200) {
    yield put(VendorActions.addCardSuccess(response.data))
  } else {
    yield put(VendorActions.addCardFailure('S** happened'))
  }
  
}

// uid, username, fcmToken