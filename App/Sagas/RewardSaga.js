import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import RewardActions from '../Stores/Reward/Actions'
import { rewardService } from "../Services/RewardService"


export function* getRewards(payload) {
    const response = yield call(rewardService.getRewards, payload)
    
    if (response.status === 200) {
      console.log(response.data);
      yield put(RewardActions.getRewardsSuccess(response.data));
    } else {
      yield put(RewardActions.getRewardsFailure('S** happened'));
    }
  }

export function* redeemReward(payload) {
  const response = yield call(rewardService.redeemReward, payload)
  
  if (response.status === 200) {
    console.log(response.data);
    yield put(RewardActions.redeemRewardSuccess(response.data));
  } else {
    yield put(RewardActions.redeemRewardFailure('S** happened'));
  }
}