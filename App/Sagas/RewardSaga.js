import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import RewardActions from '../Stores/Reward/Actions'
import { rewardService } from "../Services/RewardService"


export function* getRewards(payload) {
    const response = yield call(rewardService.getRewards, payload)
    console.log('getting rewards');
    
    if (response.status === 200) {
      
      yield put(RewardActions.getRewardsSuccess(response.data));
    } else {
      yield put(RewardActions.getRewardsFailure('S** happened'));
    }
  }

export function* redeemReward(payload) {
  const response = yield call(rewardService.redeemReward, payload)
  
  if (response.status === 200) {
    
    yield call(RewardActions.getRewardsRequest)
    yield put(RewardActions.redeemRewardSuccess(response.data));
  } else {
    yield call(RewardActions.getRewardsRequest)
    yield put(RewardActions.redeemRewardFailure('S** happened'));
  }
}

export function* getVisitDetails(payload) {
  const response = yield call(rewardService.getVisitDetails, payload)
  
  if (response.status === 200) {
    yield put(RewardActions.getVisitDetailsSuccess(response.data));
  } else {
    yield put(RewardActions.getVisitDetailsFailure('S** happened'));
  }
}

export function* isRewardRedeemable(payload) {
  const response = yield call(rewardService.isRewardRedeemable, payload)
  
  if (response.status === 200) {
    // console.log(response.data);
    yield put(RewardActions.isRewardRedeemableSuccess(response.data));
  } else {
    yield put(RewardActions.isRewardRedeemableFailure('S** happened'));
  }
}

export function* redeemStaticReward(payload) {
  const response = yield call(rewardService.redeemStaticReward, payload)
  
  if (response.status === 200) {
    // console.log('redeemed static reward');
    // console.log(response.data);
    yield put(RewardActions.redeemStaticRewardSuccess(response.data));
  } else {
    yield put(RewardActions.redeemStaticRewardFailure('S** happened'));
  }
}