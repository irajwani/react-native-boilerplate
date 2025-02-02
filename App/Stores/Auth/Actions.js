import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  createUserRequest: ['newUser'],
  createUserSuccess: ['message', 'registerStatus'],
  createUserFailure: ['errorMessage'],

  getProfileRequest: ['uid'],
  getProfileSuccess: ['message'],
  getProfileFailure: ['errorMessage'],

  updateUserRequest: ['data'],
  updateUserSuccess: ['message'],
  updateUserFailure: ['errorMessage'],

  storeUid: ['uid'],

})

export const AuthTypes = Types
export default Creators
