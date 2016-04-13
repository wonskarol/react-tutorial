import { createStore, combineReducers } from 'redux';
import data from './reducers';

const store = createStore(combineReducers({data}));

export default store;