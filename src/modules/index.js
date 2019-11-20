import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './reducers/counter/index';

export default (history) => combineReducers({
    router: connectRouter(history),
    counter,
});