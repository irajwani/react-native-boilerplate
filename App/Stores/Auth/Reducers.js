import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const createUserRequest = (state, {newUser}) => ({
  ...state,
  newUser,
})

export const createUserSuccess = (state) => {
  return {
    ...state,
    registerStatus: true
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

export const updateUserRequest = (state, {data}) => ({
  ...state,
  data,
})

export const updateUserSuccess = (state) => {
  return {
    ...state,
  }
}

export const updateUserFailure = (state, { errorMessage }) => ({
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

  [AuthTypes.UPDATE_USER_REQUEST]: updateUserRequest,
  [AuthTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [AuthTypes.UPDATE_USER_FAILURE]: updateUserFailure,

  

})
