import { combineReducers } from 'redux';
import {configureStore} from './createStore';
import rootSaga from '../Sagas';
import { reducer as dealsReducer } from './Deals/Reducers';
// import { reducer as videoReducer } from './Video/Reducers';


export default () => {
  const rootReducer = combineReducers({
    deals: dealsReducer,

  })

  return configureStore(rootReducer, rootSaga)
}