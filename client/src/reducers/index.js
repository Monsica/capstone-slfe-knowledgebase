import {combineReducers} from 'redux';
import enterpriseReducer from './enterpriseReducer';
import domainReducer from './domainReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  enterpriseData: enterpriseReducer,
  domainData: domainReducer,
  profile: profileReducer
});