import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const createUserRequest = (state, {newUser}) => ({
  ...state,
  isLoading: true,
  newUser,
})

export const createUserSuccess = (state) => {
  return {
    ...state,
    isLoading: false,
    registerStatus: true
  }
}

export const createUserFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage,
})

export const storeUid = (state, {uid}) => ({
  ...state,
  uid,
})

export const getProfileRequest = (state, {uid}) => {
  
  return {
    ...state,
    isLoading: true,
    uid,
  }
}

export const getProfileSuccess = (state, {message}) => {
  return {
    ...state,
    isLoading: false,
    profile: message,
  }
}

export const getProfileFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage,
})

export const updateUserRequest = (state, {data}) => ({
  ...state,
  isLoading: true,
  data,
})

export const updateUserSuccess = (state) => {
  return {
    ...state,
    isLoading: false,
  }
}

export const updateUserFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: true,
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
