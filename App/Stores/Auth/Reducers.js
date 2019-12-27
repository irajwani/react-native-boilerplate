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
    // deals: [{title: 'Top Rated', deals}],
  }
}

export const createUserFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})




export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.CREATE_USER_REQUEST]: createUserRequest,
  [AuthTypes.CREATE_USER_SUCCESS]: createUserSuccess,
  [AuthTypes.CREATE_USER_FAILURE]: createUserFailure,

  

})
