import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getVendorsRequest: null,
  getVendorsSuccess: ['vendors'],
  getVendorsFailure: ['errorMessage'],

  addCardRequest: ['uid', 'vendorUid', 'cardKey'],
  addCardSuccess: ['message'],
  addCardFailure: ['errorMessage'],

})

export const VendorTypes = Types
export default Creators
