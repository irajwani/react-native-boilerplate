import { put, call } from 'redux-saga/effects'
// import { AsyncStorage } from 'react-native'
import DealsActions from '../Stores/Deals/Actions'
import { videoService } from '../Services/VideoService'
import NavigationService from '../Services/NavigationService'

export function* getDeals() {
  const videoResponse = yield call(videoService.getVideos)
  
  if (videoResponse.status === 200) {
    yield put(DealsActions.getDealsSuccess(videoResponse.data))
  } else {
    yield put(DealsActions.getDealsFailure('S** happened'))
  }
  
}

// export function* showDetails(video) {
//   NavigationService.navigate('VideoDetails', {video: video})
  
  
// }
