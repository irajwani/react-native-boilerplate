import { all, put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import VendorActions from '../Stores/Vendor/Actions'
import { vendorService } from '../Services/VendorService'
import NavigationService from '../Services/NavigationService'

export function* getVendors() {
  console.log('fetching cards from vendors');
  //hits the vendor-cards collection in firestore
  const response = yield call(vendorService.getVendors)
  // console.tron.log(response.data);
  console.log(response)
  if (response.status === 200) {
    console.log(response.data);
    yield put(VendorActions.getVendorsSuccess(response.data)) 
  } else {
    yield put(VendorActions.getVendorsFailure('S** happened'))
  }
  
}

export function* addCard(payload) {
  // let {uid, vendorUid} = payload;
  // console.tron.log(payload)
  const response = yield call(vendorService.addCard, payload)
  if (response.status === 200) {
    // console.log('added card');
    
    yield put(VendorActions.addCardSuccess(response.data));
  } else {
    // yield call(VendorActions.getVendorsRequest)
    yield put(VendorActions.addCardFailure('S** happened'))
  }
  // console.log('fetched cards from vendors');
  // const [addCardResponse, getVendorsResponse] = yield all([
  //   call(vendorService.addCard, payload),
  //   call(vendorService.getVendors)
  // ])
  // if (addCardResponse.status === 200) {
  //   console.log('added card');
    
  //   yield put(VendorActions.addCardSuccess(addCardResponse.data))
  // } else {
  //   // yield call(VendorActions.getVendorsRequest)
  //   yield put(VendorActions.addCardFailure('S** happened'))
  // }
  // // console.tron.log(response.data);
  // if (getVendorsResponse.status === 200) {
  //   console.log('fetched cards from vendors');
    
  //   yield put(VendorActions.getVendorsSuccess(getVendorsResponse.data))
  // } else {
  //   // yield call(VendorActions.getVendorsRequest)
  //   yield put(VendorActions.getVendorsFailure('S** happened'))
  // }
  
}

// uid, username, fcmToken