import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { RewardTypes } from './Actions'

export const getRewardsRequest = (state) => ({
  ...state,
})

export const getRewardsSuccess = (state, {message}) => {
  console.log(message);
  return {
    ...state,
    rewards: message,
  }
}

export const getRewardsFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
})

export const redeemRewardRequest = (state, {rewardRedeemed}) => ({
  ...state,
  rewardRedeemed,
  redeemStatus: 'pending'
})

export const redeemRewardSuccess = (state, {message}) => {
  console.log(message);
  return {
    ...state,
    redeemStatus: 'done'
  }
}

export const redeemRewardFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  redeemStatus: 'done'
})

export const reducer = createReducer(INITIAL_STATE, {

  [RewardTypes.GET_REWARDS_REQUEST]: getRewardsRequest,
  [RewardTypes.GET_REWARDS_SUCCESS]: getRewardsSuccess,
  [RewardTypes.GET_REWARDS_FAILURE]: getRewardsFailure,

  [RewardTypes.REDEEM_REWARD_REQUEST]: redeemRewardRequest,
  [RewardTypes.REDEEM_REWARD_SUCCESS]: redeemRewardSuccess,
  [RewardTypes.REDEEM_REWARD_FAILURE]: redeemRewardFailure,
  
})
