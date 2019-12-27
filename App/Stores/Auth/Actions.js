import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  createUserRequest: ['newUser'],
  createUserSuccess: ['registerStatus'],
  createUserFailure: ['errorMessage'],

})

export const AuthTypes = Types
export default Creators
