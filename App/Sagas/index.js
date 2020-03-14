import { takeEvery, takeLatest, all } from 'redux-saga/effects'

import { AuthTypes } from '../Stores/Auth/Actions'
// import { DealsTypes } from '../Stores/Deals/Actions'
import { VendorTypes } from '../Stores/Vendor/Actions'
import { RewardTypes } from '../Stores/Reward/Actions'
// import { VideoTypes } from '../Stores/Video/Actions'

// import { startup } from './StartupSaga'
import { createUser, getProfile } from './AuthSaga'
// import { getDeals } from './DealsSaga'
import {getVendors, addCard} from './VendorSaga';
import {getRewards, redeemReward} from './RewardSaga';




export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(AuthTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(AuthTypes.GET_PROFILE_REQUEST, getProfile),

    takeLatest(VendorTypes.GET_VENDORS_REQUEST, getVendors),
    takeLatest(VendorTypes.ADD_CARD_REQUEST, addCard),

    takeLatest(RewardTypes.GET_REWARDS_REQUEST, getRewards),
    takeLatest(RewardTypes.REDEEM_REWARD_REQUEST, redeemReward),

    // takeLatest(DealsTypes.GET_DEALS_REQUEST, getDeals),

    // takeLatest(VideoTypes.GET_VIDEOS_REQUEST, getVideos),

    // takeLatest(VideoTypes.SHOW_DETAILS_REQUEST, showDetails),
  

    
  ])
}
