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




export const reducer = createReducer(INITIAL_STATE, {
  [VendorTypes.GET_VENDORS_REQUEST]: getVendorsRequest,
  [VendorTypes.GET_VENDORS_SUCCESS]: getVendorsSuccess,
  [VendorTypes.GET_VENDORS_FAILURE]: getVendorsFailure,

  

})
