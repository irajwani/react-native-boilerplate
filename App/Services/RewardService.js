import { create } from 'apisauce'
import { Config } from '../Config'


/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */

const apiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10 * 1000,
})

let fulfilled = (response) => response

function getRewards(payload) {
  return apiClient.get(`/getRewards/?uid=${payload.uid}`).then(fulfilled)
}

function redeemReward(payload) {
  return apiClient.post('/redeemReward', payload).then(fulfilled)
}

function getVisitDetails(payload) {
  return apiClient.get(`/getVisitDetails`, payload).then(fulfilled)
}

function isRewardRedeemable(payload) {
  return apiClient.get(`/isRewardRedeemable`, payload).then(fulfilled)
}

function redeemStaticReward(payload) {
  return apiClient.post('/redeemStaticReward', payload).then(fulfilled)
}

export const rewardService = {
  getRewards,
  redeemReward,
  getVisitDetails,
  isRewardRedeemable,
  redeemStaticReward,

}
