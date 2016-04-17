import { createStore, combineReducers } from 'redux';
import data from './reducers';

const store = createStore(combineReducers({data}), {}, window.devToolsExtension ? window.devToolsExtension() : undefined);

export default store;
