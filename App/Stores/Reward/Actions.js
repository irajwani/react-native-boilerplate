import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getRewardsRequest: ['uid'],
  getRewardsSuccess: ['message'],
  getRewardsFailure: ['errorMessage'],

  redeemRewardRequest: ['payload'],
  redeemRewardSuccess: ['message'],
  redeemRewardFailure: ['errorMessage'],

  redeemStaticRewardRequest: ['rewardRedeemed'],
  redeemStaticRewardSuccess: ['message'],
  redeemStaticRewardFailure: ['errorMessage'],

  isRewardRedeemableRequest: ['payload'],
  isRewardRedeemableSuccess: ['message'],
  isRewardRedeemableFailure: ['errorMessage'],

  getVisitDetailsRequest: ['payload'],
  getVisitDetailsSuccess: ['visitDetails'],
  getVisitDetailsFailure: ['errorMessage'],

})

export const RewardTypes = Types
export default Creators
