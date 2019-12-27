import { takeLatest, all } from 'redux-saga/effects'

import { AuthTypes } from '../Stores/Auth/Actions'
import { DealsTypes } from '../Stores/Deals/Actions'
// import { VideoTypes } from '../Stores/Video/Actions'

// import { startup } from './StartupSaga'
import { createUser } from './AuthSaga'
import { getDeals } from './DealsSaga'



export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(AuthTypes.CREATE_USER_REQUEST, createUser),

    takeLatest(DealsTypes.GET_DEALS_REQUEST, getDeals),

    // takeLatest(VideoTypes.GET_VIDEOS_REQUEST, getVideos),

    // takeLatest(VideoTypes.SHOW_DETAILS_REQUEST, showDetails),
  

    
  ])
}
