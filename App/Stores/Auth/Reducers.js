import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const createUserRequest = (state, {newUser}) => ({
  ...state,
  newUser,
})

export const createUserSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    registerStatus: true
    // deals: [{title: 'Top Rated', deals}],
  }
}

export const createUserFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})

export const storeUid = (state, {uid}) => ({
  ...state,
  uid,
})

export const getProfileRequest = (state, {uid}) => {
  console.log('IntiateGetProfileRequest');
  return {
    ...state,
    uid,
  }
}

export const getProfileSuccess = (state, {message}) => {
  return {
    ...state,
    profile: message,
  }
}

export const getProfileFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})




export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.CREATE_USER_REQUEST]: createUserRequest,
  [AuthTypes.CREATE_USER_SUCCESS]: createUserSuccess,
  [AuthTypes.CREATE_USER_FAILURE]: createUserFailure,

  [AuthTypes.GET_PROFILE_REQUEST]: getProfileRequest,
  [AuthTypes.GET_PROFILE_FAILURE]: getProfileFailure,
  [AuthTypes.GET_PROFILE_SUCCESS]: getProfileSuccess,

  [AuthTypes.STORE_UID]: storeUid,

  

})
