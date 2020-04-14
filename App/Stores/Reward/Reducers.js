import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { RewardTypes } from './Actions'

export const getRewardsRequest = (state) => ({
  ...state,
  isLoading: true,
})

export const getRewardsSuccess = (state, {message}) => {
  
  return {
    ...state,
    rewards: message,
    isLoading: false,
  }
}

export const getRewardsFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  isLoading: false
})

export const redeemRewardRequest = (state, {rewardRedeemed}) => ({
  ...state,
  rewardRedeemed,
  redeemStatus: 'pending',
  isLoading: true
})

export const redeemRewardSuccess = (state, {message}) => {
  
  return {
    ...state,
    redeemStatus: 'done',
    isLoading: false
  }
}

export const redeemRewardFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  redeemStatus: 'done',
  isLoading: false
})

export const redeemStaticRewardRequest = (state, {rewardRedeemed}) => ({
  ...state,
  rewardRedeemed,
  redeemStatus: 'pending',
  isLoading: true
})

export const redeemStaticRewardSuccess = (state, {message}) => {
  
  return {
    ...state,
    redeemStatus: 'done',
    isLoading: false
  }
}

export const redeemStaticRewardFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  redeemStatus: 'done',
  isLoading: false
})

export const isRewardRedeemableRequest = (state) => ({
  ...state,
  // isLoading: true
})

export const isRewardRedeemableSuccess = (state, {message}) => {
  
  return {
    ...state,
    isRewardRedeemable: message.isRewardRedeemable,
    // isLoading: false
  }
}

export const isRewardRedeemableFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  // isLoading: false
})

export const getVisitDetailsRequest = (state) => ({
  ...state,
  // isLoading: true
})

export const getVisitDetailsSuccess = (state, {visitDetails}) => {
  
  return {
    ...state,
    visitDetails: visitDetails.visitDetails,
    // isLoading: false
  }
}

export const getVisitDetailsFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,  
  // isLoading: false
})

export const reducer = createReducer(INITIAL_STATE, {

  [RewardTypes.GET_REWARDS_REQUEST]: getRewardsRequest,
  [RewardTypes.GET_REWARDS_SUCCESS]: getRewardsSuccess,
  [RewardTypes.GET_REWARDS_FAILURE]: getRewardsFailure,

  [RewardTypes.REDEEM_REWARD_REQUEST]: redeemRewardRequest,
  [RewardTypes.REDEEM_REWARD_SUCCESS]: redeemRewardSuccess,
  [RewardTypes.REDEEM_REWARD_FAILURE]: redeemRewardFailure,

  [RewardTypes.REDEEM_STATIC_REWARD_REQUEST]: redeemStaticRewardRequest,
  [RewardTypes.REDEEM_STATIC_REWARD_SUCCESS]: redeemStaticRewardSuccess,
  [RewardTypes.REDEEM_STATIC_REWARD_FAILURE]: redeemStaticRewardFailure,

  [RewardTypes.IS_REWARD_REDEEMABLE_REQUEST]: isRewardRedeemableRequest,
  [RewardTypes.IS_REWARD_REDEEMABLE_SUCCESS]: isRewardRedeemableSuccess,
  [RewardTypes.IS_REWARD_REDEEMABLE_FAILURE]: isRewardRedeemableFailure,

  [RewardTypes.GET_VISIT_DETAILS_REQUEST]: getVisitDetailsRequest,
  [RewardTypes.GET_VISIT_DETAILS_SUCCESS]: getVisitDetailsSuccess,
  [RewardTypes.GET_VISIT_DETAILS_FAILURE]: getVisitDetailsFailure,
  
})
