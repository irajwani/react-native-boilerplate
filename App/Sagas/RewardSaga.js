import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import RewardActions from '../Stores/Reward/Actions'
import { vendorService } from "../Services/RewardService"


export function* getRewards(payload) {
    const response = yield call(vendorService.getRewards, payload)
    
    if (response.status === 200) {
    console.log(response.data);
      yield put(RewardActions.getRewardsSuccess(response.data));
    } else {
      yield put(RewardActions.getRewardsFailure('S** happened'));
    }
  }