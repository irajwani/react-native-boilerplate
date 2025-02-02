import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getVendorsRequest: null,
  getVendorsSuccess: ['vendors'],
  getVendorsFailure: ['errorMessage'],

  //argument namespace incongruency as I now have now shifted to pattern below
  getVendorRequest: ['body'],
  getVendorSuccess: ['message'],
  getVendorFailure: ['errorMessage'],

  addCardRequest: ['uid', 'vendorUid', 'cardKey'],
  addCardSuccess: ['message'],
  addCardFailure: ['errorMessage'],

})

export const VendorTypes = Types
export default Creators
