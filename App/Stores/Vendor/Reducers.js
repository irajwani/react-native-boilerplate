import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { VendorTypes } from './Actions'

export const getVendorsRequest = (state) => {
  console.log('fetching vendors');
  return {
    ...state,
    isLoading: true,
  }
}

export const getVendorsSuccess = (state, {vendors}) => {
  console.log(vendors);
  return {
    ...state,
    vendors,
    isLoading: false,
    
    // deals: [{title: 'Top Rated', deals}],
  }
}

export const getVendorsFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage,
})

export const addCardRequest = (state, {uid, vendorUid, cardKey}) => ({
  ...state,
  uid,
  vendorUid,
  cardKey,
  addStatus: 'pending',
  isLoading: true,
})

export const addCardSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    addStatus: 'done',
    isLoading: false,
  }
}

export const addCardFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  addStatus: 'done',
  isLoading: false,
})




export const reducer = createReducer(INITIAL_STATE, {
  [VendorTypes.GET_VENDORS_REQUEST]: getVendorsRequest,
  [VendorTypes.GET_VENDORS_SUCCESS]: getVendorsSuccess,
  [VendorTypes.GET_VENDORS_FAILURE]: getVendorsFailure,

  [VendorTypes.ADD_CARD_REQUEST]: addCardRequest,
  [VendorTypes.ADD_CARD_SUCCESS]: addCardSuccess,
  [VendorTypes.ADD_CARD_FAILURE]: addCardFailure,

  

})
