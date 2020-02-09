import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { VendorTypes } from './Actions'

export const getVendorsRequest = (state) => ({
  ...state,
})

export const getVendorsSuccess = (state, {vendors}) => {
  return {
    ...state,
    vendors,
    
    // deals: [{title: 'Top Rated', deals}],
  }
}

export const getVendorsFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})

export const addCardRequest = (state, {uid, vendorUid}) => ({
  ...state,
  uid,
  vendorUid
})

export const addCardSuccess = (state, {message}) => {
  return {
    ...state,
    message,
  }
}

export const addCardFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})




export const reducer = createReducer(INITIAL_STATE, {
  [VendorTypes.GET_VENDORS_REQUEST]: getVendorsRequest,
  [VendorTypes.GET_VENDORS_SUCCESS]: getVendorsSuccess,
  [VendorTypes.GET_VENDORS_FAILURE]: getVendorsFailure,

  [VendorTypes.ADD_CARD_REQUEST]: addCardRequest,
  [VendorTypes.ADD_CARD_SUCCESS]: addCardSuccess,
  [VendorTypes.ADD_CARD_FAILURE]: addCardFailure,

  

})
