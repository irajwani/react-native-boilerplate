import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getVendorsRequest: null,
  getVendorsSuccess: ['vendors'],
  getVendorsFailure: ['errorMessage'],

})

export const VendorTypes = Types
export default Creators
