import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getRewardsRequest: ['uid'],
  getRewardsSuccess: ['message'],
  getRewardsFailure: ['errorMessage'],

  redeemRewardRequest: ['payload'],
  redeemRewardSuccess: ['message'],
  redeemRewardFailure: ['errorMessage'],

  redeemStaticRewardRequest: ['payload'],
  redeemStaticRewardSuccess: ['message'],
  redeemStaticRewardFailure: ['errorMessage'],


})

export const RewardTypes = Types
export default Creators
