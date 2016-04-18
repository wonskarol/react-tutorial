import { createStore, combineReducers } from 'redux';
import comments from './reducers';

const store = createStore(combineReducers({comments}), {}, window.devToolsExtension ? window.devToolsExtension() : undefined);

export default store;
