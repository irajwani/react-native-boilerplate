import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getRewardsRequest: ['uid'],
  getRewardsSuccess: ['message'],
  getRewardsFailure: ['errorMessage'],


})

export const RewardTypes = Types
export default Creators
