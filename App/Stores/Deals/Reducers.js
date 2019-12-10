import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { DealsTypes } from './Actions'

export const getDealsRequest = (state) => ({
  ...state,
})

export const getDealsSuccess = (state, { deals }) => {
  return {
    ...state,
    deals: [{title: 'Top Rated', deals}],
  }
}

export const getDealsFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})




export const reducer = createReducer(INITIAL_STATE, {
  [DealsTypes.GET_DEALS_REQUEST]: getDealsRequest,
  [DealsTypes.GET_DEALS_SUCCESS]: getDealsSuccess,
  [DealsTypes.GET_DEALS_FAILURE]: getDealsFailure,

  

})
