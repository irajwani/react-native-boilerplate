import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getDealsRequest: null,
  getDealsSuccess: ['videos'],
  getDealsFailure: ['errorMessage'],

})

export const DealsTypes = Types
export default Creators
