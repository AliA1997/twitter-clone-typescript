import * as redux from 'redux';
import * as authReducer from './authReducer';
import * as rantReducer from './rantReducer';
import * as responseReducer from './responseReducer';

const rootReducer = redux.combineReducers<any>({
    auth: authReducer,
    rant: rantReducer,
    response: responseReducer
});

export default rootReducer;