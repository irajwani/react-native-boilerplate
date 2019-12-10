import { takeLatest, all } from 'redux-saga/effects'

import { DealsTypes } from '../Stores/Deals/Actions'
// import { VideoTypes } from '../Stores/Video/Actions'

// import { startup } from './StartupSaga'
import { getDeals } from './DealsSaga'


export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(DealsTypes.GET_DEALS_REQUEST, getDeals),

    // takeLatest(VideoTypes.GET_VIDEOS_REQUEST, getVideos),

    // takeLatest(VideoTypes.SHOW_DETAILS_REQUEST, showDetails),
  

    
  ])
}
